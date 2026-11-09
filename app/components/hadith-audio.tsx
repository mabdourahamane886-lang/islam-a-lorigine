"use client";

import { useEffect, useRef, useState } from "react";

type Props = { arabicText: string; frenchText: string; arabic: boolean };

export default function HadithAudio({ arabicText, frenchText, arabic }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState(0.9);
  const activeUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => () => {
    if (activeUtterance.current && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  function speak(text: string, lang: "ar-SA" | "fr-FR") {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert(arabic ? "ميزة القراءة الصوتية غير مدعومة في هذا المتصفح." : "La lecture vocale n’est pas prise en charge par ce navigateur.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const prefix = lang.slice(0, 2).toLowerCase();
    const voice = voices.find(v => v.lang.toLowerCase() === lang.toLowerCase())
      || voices.find(v => v.lang.toLowerCase().startsWith(prefix));
    if (voice) utterance.voice = voice;
    utterance.onstart = () => { setSpeaking(true); setPaused(false); };
    utterance.onend = () => { setSpeaking(false); setPaused(false); activeUtterance.current = null; };
    utterance.onerror = () => { setSpeaking(false); setPaused(false); activeUtterance.current = null; };
    activeUtterance.current = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function togglePause() {
    if (!("speechSynthesis" in window)) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  }

  function stop() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    activeUtterance.current = null;
    setSpeaking(false);
    setPaused(false);
  }

  const buttonStyle: React.CSSProperties = {
    border: "1px solid var(--border, #d8d4c8)", borderRadius: 999, padding: "9px 13px",
    background: "var(--card, #fff)", color: "var(--foreground, #24352d)", fontWeight: 600,
    fontSize: 13, cursor: "pointer"
  };

  return (
    <div className="hadith-audio" aria-label={arabic ? "القراءة الصوتية للحديث" : "Lecture audio du hadith"}
      style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginTop: 14 }}>
      <button type="button" style={buttonStyle} onClick={() => speak(arabicText, "ar-SA")}>🔊 {arabic ? "استمع بالعربية" : "Écouter en arabe"}</button>
      <button type="button" style={buttonStyle} onClick={() => speak(frenchText, "fr-FR")}>🔊 {arabic ? "استمع بالفرنسية" : "Écouter en français"}</button>
      {speaking && <button type="button" style={buttonStyle} onClick={togglePause}>{paused ? "▶ " : "Ⅱ "}{paused ? (arabic ? "متابعة" : "Reprendre") : (arabic ? "إيقاف مؤقت" : "Pause")}</button>}
      {speaking && <button type="button" style={buttonStyle} onClick={stop}>■ {arabic ? "إيقاف" : "Arrêter"}</button>}
      <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}>
        <span>{arabic ? "السرعة" : "Vitesse"}</span>
        <select aria-label={arabic ? "سرعة القراءة" : "Vitesse de lecture"} value={rate} onChange={e => setRate(Number(e.target.value))}
          style={{ border: "1px solid var(--border, #d8d4c8)", borderRadius: 8, padding: "7px 8px", background: "var(--card, #fff)", color: "inherit" }}>
          <option value={0.75}>0,75×</option><option value={0.9}>0,9×</option><option value={1}>1×</option><option value={1.15}>1,15×</option>
        </select>
      </label>
      <span style={{ width: "100%", fontSize: 11, opacity: 0.72 }}>
        {arabic ? "تعتمد جودة الصوت على الأصوات المثبتة في جهازك." : "La voix dépend des langues vocales installées sur votre appareil."}
      </span>
    </div>
  );
}
