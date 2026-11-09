"use client";

import { useState } from "react";

const cards = [
  { href: "/coran", icon: "۞", fr: "Le Saint Coran", ar: "القرآن الكريم", desc: "Découvrir les sourates, les versets, les traductions et les ressources d’étude." },
  { href: "/hadiths", icon: "❖", fr: "Hadiths authentiques", ar: "الأحاديث النبوية", desc: "Étudier les paroles et actes prophétiques avec leurs références." },
  { href: "/sira", icon: "☾", fr: "La vie du Prophète ﷺ", ar: "السيرة النبوية", desc: "Parcourir les grandes étapes de la Sîra et son contexte historique." },
  { href: "/sciences-islamiques", icon: "✧", fr: "Sciences islamiques", ar: "العلوم الإسلامية", desc: "Explorer le tafsir, le fiqh, la croyance, la langue arabe et le tajwid." },
  { href: "/lieux-merveilles", icon: "⌖", fr: "Lieux et merveilles", ar: "الأماكن والعجائب", desc: "Découvrir les lieux sacrés, les mosquées historiques et le patrimoine islamique." },
  { href: "/a-propos", icon: "✦", fr: "À propos", ar: "من نحن", desc: "Comprendre la mission du projet et contacter son équipe." }
];

export default function HomePage() {
  const [arabic, setArabic] = useState(false);
  const title = arabic ? "الإسلام في الأصل" : "L’Islam à l’Origine";
  const intro = arabic ? "العودة إلى المصادر، فهم الإسلام، ونقل العلم بأمانة." : "Revenir aux sources, comprendre l’Islam, transmettre avec connaissance.";
  return (
    <main>
      <section className="hero">
        <div className="hero-image" role="img" aria-label="La Kaaba dans la Mosquée sacrée de La Mecque" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="eyebrow">{arabic ? "منصة معرفية إسلامية" : "Plateforme de connaissance islamique"}</p>
          <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h1>{title}</h1>
          <p className="hero-lead">{intro}</p>
          <div className="hero-actions">
            <a className="button button-gold" href="/coran">{arabic ? "ابدأ الاستكشاف" : "Commencer à explorer"}</a>
            <a className="button button-ghost" href="/lieux-merveilles">{arabic ? "اكتشف الأماكن" : "Découvrir les lieux"}</a>
          </div>
          <button className="hero-language" onClick={() => setArabic(!arabic)}>{arabic ? "Afficher en français" : "العربية"}</button>
        </div>
        <div className="hero-caption">La Kaaba — Masjid al-Haram, Makkah · Photo : Wikimedia Commons / Shahin Olakara (CC BY 2.0)</div>
      </section>

      <section className="section" id="explorer">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">{arabic ? "مسارات المعرفة" : "Parcours de connaissance"}</p>
            <h2>{arabic ? "اكتشف وتعلّم" : "Explorer et apprendre"}</h2>
            <p>{arabic ? "أبواب منظمة للتعلم والبحث والتأمل." : "Des espaces organisés pour apprendre, rechercher et approfondir."}</p>
          </div>
          <div className="feature-grid">
            {cards.map(card => <a className="feature-card" href={card.href} key={card.href}>
              <span className="feature-icon">{card.icon}</span>
              <h3>{arabic ? card.ar : card.fr}</h3>
              <p>{card.desc}</p>
              <span className="card-link">{arabic ? "اكتشف المزيد ←" : "Découvrir la page →"}</span>
            </a>)}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="container quote-inner">
          <p className="eyebrow">{arabic ? "منهجنا" : "Notre engagement"}</p>
          <h2>{arabic ? "العلم أمانة" : "La connaissance est une responsabilité."}</h2>
          <p>{arabic ? "نحرص على ذكر المراجع والتمييز بين النص الشرعي والمعلومة التاريخية." : "Nous nous engageons à citer les références et à distinguer les textes religieux des informations historiques."}</p>
        </div>
      </section>
      <section className="section community-section">
        <div className="container community-inner">
          <div><p className="eyebrow">{arabic ? "مجتمعنا" : "Notre communauté"}</p><h2>{arabic ? "انضم إلى مجتمعنا" : "Rejoignez notre communauté"}</h2><p>{arabic ? "تابع المنشورات والتذكيرات والمواد التعليمية." : "Suivez les publications, rappels et ressources éducatives."}</p></div>
          <a className="button button-gold" href="https://whatsapp.com/channel/0029Vb896yMEQIatlW8t6G0o" target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </div>
      </section>
    </main>
  );
}