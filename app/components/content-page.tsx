"use client";

import { useState } from "react";

const pages: Record<string, { title: string; arabic: string; intro: string; items: { title: string; text: string }[] }> = {
  coran: {
    title: "Le Saint Coran", arabic: "القرآن الكريم",
    intro: "Un espace pour lire, comprendre et étudier le Livre d’Allah avec respect, méthode et références.",
    items: [
      { title: "Lire les sourates", text: "Parcours des 114 sourates et de leurs versets, avec repères de lecture." },
      { title: "Traductions et explications", text: "Présenter les traductions comme des interprétations du sens, en indiquant les traducteurs et les ouvrages de tafsir." },
      { title: "Écoute et mémorisation", text: "Ressources audio, répétition des versets et conseils pour organiser la mémorisation." }
    ]
  },
  hadiths: {
    title: "Hadiths authentiques", arabic: "الأحاديث النبوية",
    intro: "Étudier la Sunnah en distinguant le texte du hadith, sa source, sa numérotation et son degré d’authenticité.",
    items: [
      { title: "Les recueils", text: "Repères sur Sahih al-Bukhari, Sahih Muslim et les autres recueils reconnus." },
      { title: "Références vérifiables", text: "Chaque publication doit préciser le recueil, le livre ou chapitre, le numéro d’édition et, si disponible, le jugement critique." },
      { title: "Comprendre le hadith", text: "Contexte, vocabulaire et explications provenant de commentaires identifiés." }
    ]
  },
  sira: {
    title: "La vie du Prophète ﷺ", arabic: "السيرة النبوية",
    intro: "Un parcours chronologique consacré à la vie du Messager d’Allah ﷺ et au contexte de son époque.",
    items: [
      { title: "La période mecquoise", text: "L’Arabie avant la révélation, les débuts de la mission et les premières communautés musulmanes." },
      { title: "L’Hégire et Médine", text: "La migration, la construction de la communauté et les événements de la période médinoise." },
      { title: "Sources de la Sîra", text: "Présenter les récits avec leurs ouvrages de référence et signaler les divergences historiques." }
    ]
  },
  "sciences-islamiques": {
    title: "Sciences islamiques", arabic: "العلوم الإسلامية",
    intro: "Des ressources pédagogiques pour aborder les disciplines islamiques et leurs méthodes d’étude.",
    items: [
      { title: "Tafsir et sciences du Coran", text: "Principes d’exégèse, vocabulaire coranique et sciences liées à la révélation." },
      { title: "Fiqh et croyance", text: "Notions fondamentales, écoles juridiques et présentation respectueuse des divergences." },
      { title: "Langue arabe et tajwid", text: "Grammaire, morphologie, lecture et règles de récitation." }
    ]
  },
  "lieux-merveilles": {
    title: "Lieux et merveilles de l’Islam", arabic: "أماكن وعجائب في العالم الإسلامي",
    intro: "Voyage documentaire à travers les lieux sacrés, les mosquées historiques, les manuscrits et le patrimoine des civilisations musulmanes.",
    items: [
      { title: "La Mecque — المسجد الحرام", text: "La Kaaba et la Mosquée sacrée, au cœur des rites du Hajj et de la Umrah." },
      { title: "Médine — المسجد النبوي", text: "La Mosquée du Prophète ﷺ et les lieux majeurs de la période médinoise." },
      { title: "Jérusalem — المسجد الأقصى", text: "La mosquée Al-Aqsa et le patrimoine historique de la vieille ville de Jérusalem." },
      { title: "Djenné — Mali", text: "La Grande Mosquée de Djenné, remarquable exemple d’architecture en terre du Sahel." },
      { title: "Al-Andalus", text: "Cordoue, Grenade et les traces architecturales et intellectuelles de l’histoire musulmane." },
      { title: "Bibliothèques et manuscrits", text: "Les centres de savoir, les bibliothèques historiques et la transmission des sciences." }
    ]
  },
  "a-propos": {
    title: "À propos et contact", arabic: "من نحن والتواصل",
    intro: "L’Islam à l’Origine est un projet éducatif consacré à la transmission de connaissances islamiques, historiques et culturelles.",
    items: [
      { title: "Notre mission", text: "Rendre les ressources plus accessibles, encourager l’apprentissage et transmettre avec sérieux." },
      { title: "Notre méthode", text: "Identifier les sources, vérifier les références et distinguer les textes religieux des récits historiques." },
      { title: "Nous contacter", text: "Niamey, Niger · Téléphone : +227 88 37 61 33 · Chaîne WhatsApp accessible depuis le bouton ci-dessous." }
    ]
  }
};

const photos = [
  { title: "La Mosquée sacrée — La Mecque", place: "Makkah, Arabie saoudite", src: "https://upload.wikimedia.org/wikipedia/commons/4/42/Kaaba%2C_Masjid_Al_Haram%2C_Mecca.jpg", credit: "Shahin Olakara — CC BY 2.0", href: "https://commons.wikimedia.org/wiki/File:Kaaba,_Masjid_Al_Haram,_Mecca.jpg" },
  { title: "La Mosquée du Prophète ﷺ", place: "Médine, Arabie saoudite", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/MasjidNabawi.jpg/1280px-MasjidNabawi.jpg", credit: "Wurzelgnohm — CC0", href: "https://commons.wikimedia.org/wiki/File:MasjidNabawi.jpg" },
  { title: "La Mosquée Al-Aqsa", place: "Jérusalem", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Jerusalem-2013%282%29-Temple_Mount-Al-Aqsa_Mosque_%28east_exposure%29.jpg/1280px-Jerusalem-2013%282%29-Temple_Mount-Al-Aqsa_Mosque_%28east_exposure%29.jpg", credit: "Andrew Shiva / Godot13 — CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Jerusalem-2013(2)-Temple_Mount-Al-Aqsa_Mosque_(east_exposure).jpg" },
  { title: "La Grande Mosquée de Djenné", place: "Djenné, Mali", src: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Great_Mosque_of_Djenne_2.jpg", credit: "JM — CC BY 2.0", href: "https://commons.wikimedia.org/wiki/File:Great_Mosque_of_Djenne_2.jpg" }
];

export default function ContentPage({ slug }: { slug: string }) {
  const [arabic, setArabic] = useState(false);
  const page = pages[slug];
  if (!page) return null;
  const isPlaces = slug === "lieux-merveilles";
  return (
    <main className="content-main">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <p className="eyebrow">L’Islam à l’Origine · {arabic ? "المعرفة والأمانة" : "Connaissance et transmission"}</p>
          <h1>{arabic ? page.arabic : page.title}</h1>
          <p>{arabic ? "مساحة للتعلم والبحث والتأمل." : page.intro}</p>
          <button className="language-button page-language" onClick={() => setArabic(!arabic)}>{arabic ? "Français" : "العربية"}</button>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {isPlaces && <div className="photo-grid">
            {photos.map(photo => <article className="photo-card" key={photo.title}>
              <a href={photo.href} target="_blank" rel="noreferrer" aria-label={"Voir la source de la photo " + photo.title}>
                <img src={photo.src} alt={photo.title} loading="lazy" />
              </a>
              <div className="photo-copy"><h3>{photo.title}</h3><p>{photo.place}</p><small>Photo : {photo.credit} · <a href={photo.href} target="_blank" rel="noreferrer">Source et licence</a></small></div>
            </article>)}
          </div>}
          <div className="content-grid">
            {page.items.map((item, index) => <article className="content-card" key={item.title}>
              <span className="content-number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{item.title}</h2><p>{item.text}</p>
            </article>)}
          </div>
          {slug === "a-propos" && <a className="button button-gold contact-button" href="https://whatsapp.com/channel/0029Vb896yMEQIatlW8t6G0o" target="_blank" rel="noreferrer">Rejoindre la chaîne WhatsApp ↗</a>}
          <p className="editorial-note">Note éditoriale : les textes religieux et les données historiques publiés sur ce site devront être accompagnés de références vérifiables. Les photographies sont créditées individuellement.</p>
        </div>
      </section>
    </main>
  );
}