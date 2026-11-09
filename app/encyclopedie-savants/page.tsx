"use client";

import { useMemo, useState } from "react";

type Source = { title: string; author: string; description: string; url: string; role: string };

const sources: Source[] = [
  {
    title: "سير أعلام النبلاء — Siyar Aʿlām an-Nubalāʾ",
    author: "Imam adh-Dhahabi (الذهبي)",
    description: "Ouvrage biographique majeur. Les notices devront être reliées à leur volume et à leur page dans l’édition retenue.",
    url: "https://waqfeya.net/books/سير-أعلام-النبلاء--السيرة-النبوية--سيرة-الخلفاء-الراشدين--الجزء-المفقود-ت-الأرناؤوط-345331fb5caa4981b08a5c41bd30aea7",
    role: "Source biographique principale"
  },
  {
    title: "تقريب التهذيب — Taqrib at-Tahdhib",
    author: "Ibn Hajar al-Asqalani (ابن حجر العسقلاني)",
    description: "Dictionnaire critique des transmetteurs de hadith. Il sera utilisé pour les notices de rijal, sans le présenter comme un dictionnaire exhaustif de tous les savants.",
    url: "https://ar.wikisource.org/wiki/ملف:كتاب_تقريب_التهذيب.pdf",
    role: "Source complémentaire — transmetteurs"
  }
];

const categories = [
  { value: "all", fr: "Toutes les catégories", ar: "جميع التصنيفات" },
  { value: "companions", fr: "Compagnons", ar: "الصحابة" },
  { value: "tabiun", fr: "Tabiʿîn", ar: "التابعون" },
  { value: "scholars", fr: "Savants", ar: "العلماء" },
  { value: "narrators", fr: "Transmetteurs", ar: "رواة الحديث" }
];

export default function ScholarsPage() {
  const [arabic, setArabic] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [period, setPeriod] = useState("all");
  const results = useMemo(() => {
    // No biography is published until its text and exact source reference are verified.
    return [] as Array<{ name: string; nameAr: string; category: string; death: string; reference: string }>;
  }, [query, category, period]);

  const t = (fr: string, ar: string) => arabic ? ar : fr;

  return (
    <main className="scholars-page">
      <section className="scholars-hero">
        <div className="container">
          <p className="eyebrow">{t("Bibliothèque documentaire", "مكتبة علمية موثقة")}</p>
          <h1>{t("Encyclopédie des savants", "موسوعة العلماء")}</h1>
          <p className="scholars-lead">{t(
            "Retrouver les biographies, les générations, les maîtres, les élèves et les références des sources classiques.",
            "اكتشف تراجم العلماء وطبقاتهم وشيوخهم وتلاميذهم ومراجع المصادر التراثية."
          )}</p>
          <div className="scholars-search">
            <label className="sr-only" htmlFor="scholar-search">{t("Rechercher un savant", "ابحث عن عالم")}</label>
            <input id="scholar-search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t("Nom en français ou en arabe…", "ابحث بالاسم العربي أو الفرنسي…")} />
            <span aria-hidden="true">⌕</span>
          </div>
          <div className="scholars-filters">
            <label>
              <span>{t("Génération / catégorie", "الطبقة / التصنيف")}</span>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(item => <option key={item.value} value={item.value}>{t(item.fr, item.ar)}</option>)}
              </select>
            </label>
            <label>
              <span>{t("Période", "الفترة")}</span>
              <select value={period} onChange={e => setPeriod(e.target.value)}>
                <option value="all">{t("Toutes les périodes", "جميع الفترات")}</option>
                <option value="hijri">{t("Dates hégiriennes", "التواريخ الهجرية")}</option>
                <option value="verified">{t("Notices entièrement vérifiées", "التراجم المحققة")}</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="section scholars-content">
        <div className="container">
          <div className="scholars-section-heading">
            <div>
              <p className="eyebrow">{t("Recherche biographique", "البحث في التراجم")}</p>
              <h2>{t("Répertoire des notices", "فهرس التراجم")}</h2>
            </div>
            <span className="scholars-count">{results.length} {t("notice vérifiée", "ترجمة موثقة")}</span>
          </div>
          <div className="scholars-empty" role="status">
            <span className="scholars-empty-mark">۞</span>
            <h3>{t("La base biographique est en cours de constitution", "يجري إعداد قاعدة التراجم")}</h3>
            <p>{t(
              "Aucune notice n’est publiée pour le moment. Les textes des ouvrages doivent d’abord être extraits, contrôlés et associés à une référence exacte (édition, volume et page).",
              "لم تُنشر أي ترجمة بعد. يجب أولاً استخراج نصوص الكتب ومراجعتها وربط كل ترجمة بمرجع دقيق يشمل الطبعة والجزء والصفحة."
            )}</p>
          </div>

          <div className="scholars-section-heading sources-heading">
            <div>
              <p className="eyebrow">{t("Corpus de référence", "المصادر المعتمدة")}</p>
              <h2>{t("Ouvrages fondateurs", "أمهات كتب التراجم")}</h2>
            </div>
          </div>
          <div className="scholars-source-grid">
            {sources.map(source => <article className="scholars-source-card" key={source.title}>
              <span className="source-role">{source.role}</span>
              <h3 dir="auto">{source.title}</h3>
              <p className="source-author">{source.author}</p>
              <p>{source.description}</p>
              <a href={source.url} target="_blank" rel="noreferrer">{t("Consulter la source ↗", "مطالعة المصدر ↗")}</a>
            </article>)}
          </div>

          <div className="scholars-method">
            <h2>{t("Règles de vérification", "منهج التوثيق والتحقيق")}</h2>
            <ul>
              <li>{t("Chaque notice doit citer l’édition, le volume et la page consultés.", "توثيق كل ترجمة بالطبعة والجزء والصفحة.")}</li>
              <li>{t("Distinguer les dates certaines, approximatives et divergentes.", "التمييز بين التواريخ المحققة والتقريبية والمختلف فيها.")}</li>
              <li>{t("Séparer les données biographiques des jugements critiques sur les transmetteurs.", "الفصل بين المعلومات التاريخية وأحكام الجرح والتعديل.")}</li>
              <li>{t("Ne jamais déduire une affiliation ou une caractérisation sans source explicite.", "عدم نسبة منهج أو وصف إلى عالم دون نص صريح موثق.")}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
