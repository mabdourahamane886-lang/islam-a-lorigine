"use client";

import { useEffect, useMemo, useState } from "react";

type Surah = { number: number; name: string; englishName: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string };
type Ayah = { numberInSurah: number; text: string };
type Edition = { ayahs: Ayah[] };

const reciters = [
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy — مشاري العفاسي" },
  { id: "ar.husary", name: "Mahmoud Khalil Al-Husary — محمود خليل الحصري" },
  { id: "ar.minshawi", name: "Mohamed Siddiq al-Minshawi — محمد صديق المنشاوي" },
  { id: "ar.sudais", name: "Abdurrahman As-Sudais — عبدالرحمن السديس" },
  { id: "ar.shuraim", name: "Saud Al-Shuraim — سعود الشريم" },
  { id: "ar.abdulbasit", name: "Abdul Basit — عبد الباسط عبد الصمد" }
];

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selected, setSelected] = useState(1);
  const [reciter, setReciter] = useState("ar.alafasy");
  const [arabic, setArabic] = useState<Ayah[]>([]);
  const [french, setFrench] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const current = useMemo(() => surahs.find(s => s.number === selected), [surahs, selected]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then(r => { if (!r.ok) throw new Error("Impossible de charger la liste des sourates."); return r.json(); })
      .then(json => setSurahs(json.data ?? []))
      .catch(() => setError("La liste des sourates n’a pas pu être chargée. Réessaie dans quelques instants."));
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetch(`https://api.alquran.cloud/v1/surah/${selected}/editions/quran-uthmani,fr.hamidullah`)
      .then(r => { if (!r.ok) throw new Error("Erreur de chargement"); return r.json(); })
      .then(json => {
        if (!active) return;
        const editions = json.data as Edition[];
        setArabic(editions?.[0]?.ayahs ?? []);
        setFrench(editions?.[1]?.ayahs ?? []);
        setLoading(false);
      })
      .catch(() => { if (active) { setError("Le texte de cette sourate est momentanément indisponible."); setLoading(false); } });
    return () => { active = false; };
  }, [selected]);

  const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${reciter}/${selected}.mp3`;

  return <main>
    <section className="page-hero"><div className="container page-hero-inner">
      <p className="eyebrow">الْقُرْآنُ الْكَرِيم · LE LIVRE</p>
      <h1>Le Saint Coran</h1>
      <p>Consulter les 114 sourates, lire le texte arabe, suivre la traduction française et écouter une récitation complète de la sourate choisie.</p>
    </div></section>
    <section className="section"><div className="container">
      <div className="library-panel">
        <div className="quran-controls">
          <label className="quran-field">Sourate
            <select className="library-select" value={selected} onChange={e => setSelected(Number(e.target.value))}>
              {surahs.map(s => <option key={s.number} value={s.number}>{s.number}. {s.englishName} — {s.name}</option>)}
            </select>
          </label>
          <label className="quran-field">Récitant
            <select className="library-select" value={reciter} onChange={e => setReciter(e.target.value)}>
              {reciters.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </label>
        </div>
        {current && <div className="surah-heading"><p>SOURATE {current.number} · {current.revelationType === "Meccan" ? "MECQUOISE" : "MÉDINOISE"} · {current.numberOfAyahs} VERSETS</p><h3 lang="ar" dir="rtl">{current.name}</h3><p>{current.englishName} — {current.englishNameTranslation}</p></div>}
        <div className="quran-audio-box"><strong>Écouter la sourate complète</strong><audio key={audioUrl} controls preload="none" src={audioUrl}>Votre navigateur ne prend pas en charge le lecteur audio.</audio><small>Récitation audio diffusée depuis le CDN Al Quran Cloud. Le chargement nécessite une connexion Internet.</small></div>
        {error && <p className="library-error" role="alert">{error}</p>}
        {loading ? <p className="library-status">Chargement du texte…</p> : <div className="quran-verses">
          {arabic.map((ayah, index) => <article className="quran-verse" key={ayah.numberInSurah}>
            <span className="ayah-number">{ayah.numberInSurah}</span>
            <p className="quran-verse-ar" lang="ar" dir="rtl">{ayah.text}</p>
            <p className="quran-verse-fr">{french[index]?.text ?? "Traduction française indisponible."}</p>
          </article>)}
        </div>}
        <p className="source-note">Texte et métadonnées : Al Quran Cloud API. Traduction française : édition fr.hamidullah. Vérifier les textes et traductions avec les éditions de référence. <a href="https://alquran.cloud/api" target="_blank" rel="noreferrer">Documentation de l’API</a>.</p>
      </div>
    </div></section>
  </main>;
}
