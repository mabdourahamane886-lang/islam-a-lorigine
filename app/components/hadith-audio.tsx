"use client";

import { useEffect, useRef, useState } from "react";

type Props = { arabicText: string; frenchText: string; arabic: boolean };
type SpeechLang = "ar-SA" | "fr-FR";

function splitForSpeech(text: string, max = 180): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const words = clean.split(" ");
  const chunks: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? current + " " + word : word;
    if (next.length > max && current) {
      chunks.push(current);
      current = word;
    } else current = next;
  }
  if (current) chunks.push(current);
  return chunks;
}

export default function HadithAudio({ arabicText, frenchText, arabic }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState(0.9);
  const [status, setStatus] = useState("");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const runId = useRef(0);
  const currentIndex = useRef(0);
  const chunksRef = useRef<string[]>([]);
  const langRef = useRef<SpeechLang>("fr-FR");

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const loadVoices = () => setAvailableVoices(synth.getVoices());
    loadVoices();
    synth.addEventListener?.("voiceschanged", loadVoices);
    return () => {
      synth.removeEventListener?.("voiceschanged", loadVoices);
      runId.current++;
      synth.cancel();
    };
  }, []);

  function stop() {
    runId.current++;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
    setStatus("");
  }

  function playNext(id: number) {
    if (id !== runId.current) return;
    if (currentIndex.current >= chunksRef.current.length) {
      setSpeaking(false);
      setPaused(false);
      setStatus(arabic ? "انتهت القراءة." : "Lecture terminée.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(chunksRef.current[currentIndex.current]);
    const lang = langRef.current;
    utterance.lang = lang;
    utterance.rate = rate;
    const prefix = lang.slice(0, 2).toLowerCase();
    const voices = window.speechSynthesis.getVoices().length ? window.speechSynthesis.getVoices() : availableVoices;
    const candidates = voices.filter(v => v.lang.toLowerCase().startsWith(prefix));
    const preferred = candidates.find(v => v.lang.toLowerCase() === lang.toLowerCase()) || candidates[0];
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => {
      if (id !== runId.current) return;
      setSpeaking(true);
      setPaused(false);
      setStatus(arabic ? "جارٍ تشغيل الصوت…" : "Lecture audio en cours…");
    };
    utterance.onend = () => {
      if (id !== runId.current) return;
      currentIndex.current++;
      playNext(id);
    };
    utterance.onerror = event => {
      if (id !== runId.current || event.error === "canceled" || event.error === "interrupted") return;
      setSpeaking(false);
      setPaused(false);
      setStatus(arabic
        ? "تعذّر تشغيل الصوت. تحقق من إعدادات الصوت واللغة في جهازك."
        : "La voix n’a pas démarré. Vérifiez que la synthèse vocale et la voix de cette langue sont activées sur votre appareil.");
    };
    window.speechSynthesis.speak(utterance);
  }

  function speak(text: string, lang: SpeechLang) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setStatus(arabic ? "المتصفح لا يدعم القراءة الصوتية." : "Ce navigateur ne prend pas en charge la lecture vocale.");
      return;
    }
    const chunks = splitForSpeech(text);
    if (!chunks.length) {
      setStatus(arabic ? "لا يوجد نص لقراءته." : "Aucun texte à lire.");
      return;
    }
    const synth = window.speechSynthesis;
    runId.current++;
    const id = runId.current;
    synth.cancel();
    chunksRef.current = chunks;
    currentIndex.current = 0;
    langRef.current = lang;
    setStatus(arabic ? "جارٍ تحضير الصوت…" : "Préparation de la voix…");
    // Mobile browsers may need a short pause after cancel() before accepting new speech.
    window.setTimeout(() => {
      if (id === runId.current) playNext(id);
    }, 80);
  }

  function togglePause() {
    const synth = window.speechSynthesis;
    if (synth.paused) {
      synth.resume();
      setPaused(false);
    } else if (synth.speaking) {
      synth.pause();
      setPaused(true);
    }
  }

  const buttonStyle: React.CSSProperties = {
    border: "1px solid var(--line, #d8c9a8)", borderRadius: 999, padding: "10px 15px",
    background: "#fffefa", color: "#75551d", fontWeight: 700,
    fontSize: 13, cursor: "pointer", minHeight: 42
  };

  const hasArabicVoice = availableVoices.some(v => v.lang.toLowerCase().startsWith("ar"));
  const hasFrenchVoice = availableVoices.some(v => v.lang.toLowerCase().startsWith("fr"));

  return (
    <div className="hadith-audio" aria-label={arabic ? "القراءة الصوتية للحديث" : "Lecture audio du hadith"}
      style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 9, marginTop: 16 }}>
      <button type="button" style={buttonStyle} onClick={() => speak(arabicText, "ar-SA")}>
        {arabic ? "استمع بالعربية" : "Écouter en arabe"}
      </button>
      <button type="button" style={buttonStyle} onClick={() => speak(frenchText, "fr-FR")}>
        {arabic ? "استمع بالفرنسية" : "Écouter en français"}
      </button>
      {speaking && <button type="button" style={buttonStyle} onClick={togglePause}>
        {paused ? (arabic ? "متابعة" : "Reprendre") : (arabic ? "إيقاف مؤقت" : "Pause")}
      </button>}
      {(speaking || paused) && <button type="button" style={buttonStyle} onClick={stop}>
        {arabic ? "إيقاف" : "Arrêter"}
      </button>}
      <label style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: "#59616c" }}>
        <span>{arabic ? "السرعة" : "Vitesse"}</span>
        <select aria-label={arabic ? "سرعة القراءة" : "Vitesse de lecture"} value={rate}
          onChange={e => setRate(Number(e.target.value))}
          style={{ border: "1px solid #d8c9a8", borderRadius: 8, padding: "8px", background: "#fffefa", color: "#252a33" }}>
          <option value={0.75}>0,75×</option><option value={0.9}>0,9×</option><option value={1}>1×</option><option value={1.15}>1,15×</option>
        </select>
      </label>
      {status && <span role="status" aria-live="polite" style={{ width: "100%", fontSize: 12, color: "#59616c" }}>{status}</span>}
      <span style={{ width: "100%", fontSize: 11, color: "#737b85" }}>
        {arabic
          ? "الصوت اصطناعي ويعتمد على الأصوات المثبتة في جهازك؛ وليس تسجيلاً لقارئ."
          : "Voix de synthèse du téléphone ou navigateur, pas un enregistrement de récitant. La disponibilité de l’arabe dépend des voix installées."}
        {!hasArabicVoice && !hasFrenchVoice && availableVoices.length > 0 && (arabic ? " لا تظهر أصوات عربية أو فرنسية مثبتة حالياً." : " Aucune voix arabe ou française détectée actuellement.")}
      </span>
    </div>
  );
}
