"use client";

import { useEffect, useMemo, useState } from "react";

type Surah = { number: number; name: string; englishName: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string };
type Ayah = { numberInSurah: number; text: string; audio?: string; translation?: { text: string } };
type Hadith = { id: string; arabic: string; french: string; source: string; reference: string; theme: string };

const hadiths: Hadith[] = [
  { id: "b1", arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", french: "Les actes ne valent que par les intentions, et chacun sera rétribué selon son intention.", source: "Sahih al-Bukhari", reference: "Hadith 1 — Livre du début de la révélation", theme: "Intention" },
  { id: "b13", arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", french: "Aucun de vous ne croit véritablement tant qu’il n’aime pas pour son frère ce qu’il aime pour lui-même.", source: "Sahih al-Bukhari", reference: "Hadith 13 — Livre de la foi", theme: "Fraternité" },
  { id: "b10", arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ", french: "Le musulman est celui dont les musulmans sont à l’abri de sa langue et de sa main.", source: "Sahih al-Bukhari", reference: "Hadith 10 — Livre de la foi", theme: "Comportement" },
  { id: "m2699", arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ", french: "Celui qui emprunte un chemin à la recherche d’un savoir, Allah lui facilite par cela un chemin vers le Paradis.", source: "Sahih Muslim", reference: "Hadith 2699a — Livre du rappel, de l’invocation, du repentir et de la demande de pardon", theme: "Science" },
  { id: "m45", arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", french: "Aucun de vous ne croit pleinement tant qu’il n’aime pas pour son frère ce qu’il aime pour lui-même.", source: "Sahih Muslim", reference: "Hadith 45 — Livre de la foi", theme: "Fraternité" },
  { id: "b6116", arabic: "لَا تَغْضَبْ", french: "Ne te mets pas en colère.", source: "Sahih al-Bukhari", reference: "Hadith 6116 — Livre du comportement", theme: "Maîtrise de soi" }
];

const frenchHadithIntro = "Sélection de hadiths rapportés dans les deux recueils authentiques. Les références suivent la numérotation courante, qui peut varier selon les éditions.";
const arabicHadithIntro = "مجموعة مختارة من الأحاديث الواردة في الصحيحين. وقد يختلف ترقيم الأحاديث باختلاف الطبعات.";

export default function IslamicLibrary({ mode }: { mode: "quran" | "hadith" | "search" }) {
  const [arabic, setArabic] = useState(false);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [surahNumber, setSurahNumber] = useState(1);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (mode !== "quran" && mode !== "search") return;
    fetch("https://api.alquran.cloud/v1/surah")
      .then(r => { if (!r.ok) throw new Error("Service indisponible"); return r.json(); })
      .then(j => setSurahs(j.data || []))
      .catch(() => setError(arabic ? "تعذر تحميل قائمة السور." : "Impossible de charger la liste des sourates. Réessayez dans un instant."));
  }, [mode, arabic]);

  useEffect(() => {
    if (mode !== "quran" || !surahs.length) return;
    let active = true;
    setLoading(true); setError(""); setPlaying(false);
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/fr.hamidullah`).then(r => r.json())
    ]).then(([ar, fr]) => {
      if (!active) return;
      const translations = fr.data?.ayahs || [];
      setAyahs((ar.data?.ayahs || []).map((a: any, i: number) => ({ ...a, translation: { text: translations[i]?.text || "" } })));
    }).catch(() => active && setError(arabic ? "تعذر تحميل السورة." : "La sourate n’a pas pu être chargée. Vérifiez votre connexion puis réessayez."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [mode, surahNumber, surahs.length, arabic]);

  const filteredHadiths = useMemo(() => hadiths.filter(h => (h.arabic + " " + h.french + " " + h.source + " " + h.theme).toLowerCase().includes(query.toLowerCase())), [query]);
  const currentSurah = surahs.find(s => s.number === surahNumber);

  async function searchAll() {
    if (!query.trim()) return;
    setSearching(true); setError("");
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query.trim())}/all/fr.hamidullah`);
      const json = await response.json();
      setSearchResults(json.data?.matches || []);
    } catch { setError(arabic ? "حدث خطأ أثناء البحث." : "La recherche coranique est momentanément indisponible."); }
    finally { setSearching(false); }
  }

  return (
    <section className="library-panel">
      <div className="library-topline">
        <div><p className="eyebrow">{arabic ? "مكتبة علمية موثقة" : "Bibliothèque documentée"}</p><h2>{mode === "quran" ? (arabic ? "القرآن الكريم" : "Le Coran, sourate par sourate") : mode === "hadith" ? (arabic ? "الأحاديث الصحيحة" : "Hadiths authentiques") : (arabic ? "البحث في المصادر" : "Recherche documentaire")}</h2></div>
        <button className="language-button" onClick={() => setArabic(v => !v)}>{arabic ? "Français" : "العربية"}</button>
      </div>

      {mode === "quran" && <>
        <p className="library-intro">{arabic ? "اختر سورة لقراءة آياتها مع الترجمة الفرنسية والاستماع إلى التلاوة." : "Choisissez l’une des 114 sourates. Le texte arabe, la traduction du sens en français et la récitation sont chargés depuis AlQuran Cloud."}</p>
        <label className="field-label" htmlFor="surah-select">{arabic ? "اختر السورة" : "Choisir une sourate"}</label>
        <select id="surah-select" className="library-select" value={surahNumber} onChange={e => setSurahNumber(Number(e.target.value))}>
          {surahs.map(s => <option key={s.number} value={s.number}>{s.number}. {arabic ? s.name : s.englishName} — {s.numberOfAyahs} {arabic ? "آية" : "versets"}</option>)}
        </select>
        {currentSurah && <div className="surah-heading"><h3>{currentSurah.name}</h3><p>{currentSurah.englishName} · {currentSurah.englishNameTranslation} · {currentSurah.revelationType === "Meccan" ? (arabic ? "مكية" : "Mecquoise") : (arabic ? "مدنية" : "Médinoise")} · {currentSurah.numberOfAyahs} {arabic ? "آية" : "versets"}</p></div>}
        {loading && <p className="library-status">{arabic ? "جار تحميل الآيات..." : "Chargement des versets…"}</p>}
        {error && <p className="library-error" role="alert">{error}</p>}
        <div className="ayah-list" dir="rtl">{ayahs.map(a => <article className="ayah-card" key={a.numberInSurah}>
          <span className="ayah-number">{a.numberInSurah}</span><p className="ayah-arabic">{a.text}</p>
          <p className="ayah-translation" dir={arabic ? "rtl" : "ltr"}>{a.translation?.text}</p>
          {a.audio && <audio className="ayah-audio" controls preload="none" src={a.audio} aria-label={(arabic ? "استماع إلى الآية " : "Écouter le verset ") + a.numberInSurah}><track kind="captions" /></audio>}
        </article>)}</div>
        <p className="source-note">{arabic ? "المصدر: AlQuran Cloud · رواية حفص · الترجمة الفرنسية لمعاني القرآن لمحمد حميد الله." : "Source : AlQuran Cloud · lecture Hafs · traduction française du sens par Muhammad Hamidullah. Une traduction est une interprétation du sens, et non le texte arabe du Coran."} <a href="https://alquran.cloud/" target="_blank" rel="noreferrer">Documentation et source ↗</a></p>
      </>}

      {mode === "hadith" && <>
        <p className="library-intro">{arabic ? arabicHadithIntro : frenchHadithIntro}</p>
        <input className="library-input" value={query} onChange={e => setQuery(e.target.value)} placeholder={arabic ? "ابحث في الأحاديث..." : "Rechercher par thème, texte ou recueil…"} aria-label="Rechercher un hadith" />
        <div className="hadith-list">{filteredHadiths.map(h => <article className="hadith-card" key={h.id}>
          <p className="hadith-theme">{h.theme}</p><p className="hadith-arabic" dir="rtl">{h.arabic}</p><p className="hadith-french">{h.french}</p>
          <div className="hadith-reference"><strong>{h.source}</strong><span>{h.reference}</span></div>
        </article>)}</div>
        {!filteredHadiths.length && <p className="library-status">{arabic ? "لا توجد نتائج." : "Aucun hadith ne correspond à cette recherche."}</p>}
        <p className="source-note">{arabic ? "يُرجى مراجعة الطبعة المعتمدة عند الاقتباس العلمي." : "Pour une citation académique, vérifier le texte et la numérotation dans l’édition de référence utilisée. Cette sélection n’est pas un catalogue exhaustif."} <a href="https://sunnah.com/" target="_blank" rel="noreferrer">Consulter les recueils ↗</a></p>
      </>}

      {mode === "search" && <>
        <p className="library-intro">{arabic ? "ابحث في آيات القرآن والأحاديث المختارة والموارد التاريخية." : "Interrogez les versets du Coran, les hadiths de cette bibliothèque et les ressources historiques du site."}</p>
        <form className="search-form" onSubmit={e => { e.preventDefault(); searchAll(); }}>
          <input className="library-input" value={query} onChange={e => setQuery(e.target.value)} placeholder={arabic ? "اكتب كلمة أو عبارة..." : "Ex. : patience, prière, science, miséricorde…"} />
          <button className="button button-gold" disabled={searching || !query.trim()}>{searching ? "…" : (arabic ? "بحث" : "Rechercher")}</button>
        </form>
        {searchResults.map((m: any, i: number) => <article className="search-result" key={i}><strong>{m.surah?.englishName} — {arabic ? "آية" : "verset"} {m.numberInSurah}</strong><p dir="rtl" className="hadith-arabic">{m.text}</p><p>{m.translation || ""}</p></article>)}
        <h3 className="search-subtitle">{arabic ? "الأحاديث ذات الصلة" : "Hadiths correspondants"}</h3>
        {filteredHadiths.map(h => <article className="search-result" key={h.id}><strong>{h.source} · {h.reference}</strong><p dir="rtl" className="hadith-arabic">{h.arabic}</p><p>{h.french}</p></article>)}
        <h3 className="search-subtitle">{arabic ? "موارد تاريخية" : "Ressources historiques"}</h3>
        <div className="search-result"><strong>La Sîra et l’histoire islamique</strong><p>Chronologie de la révélation, Hégire, période mecquoise et médinoise. Les notices sont à lire avec leurs références bibliographiques.</p><a href="/sira">Ouvrir la rubrique Sîra ↗</a></div>
        <div className="search-result"><strong>Patrimoine et lieux</strong><p>La Mecque, Médine, Jérusalem, Agadez et Al-Andalus.</p><a href="/lieux-merveilles">Ouvrir les fiches de lieux ↗</a></div>
        {error && <p className="library-error">{error}</p>}
        <p className="source-note">Recherche coranique via <a href="https://alquran.cloud/" target="_blank" rel="noreferrer">AlQuran Cloud</a>. Les résultats de cette version couvrent les hadiths intégrés et les fiches publiées sur le site.</p>
      </>}
    </section>
  );
}
