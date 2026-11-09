"use client";

import { useState } from "react";
import IslamicLibrary from "./islamic-library";

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
      { title: "Agadez — Niger", text: "La Grande Mosquée d’Agadez et son minaret en banco, emblème du patrimoine architectural sahélien." },
      { title: "Al-Andalus — Espagne", text: "L’Alhambra de Grenade, Cordoue et les héritages artistiques, scientifiques et architecturaux de l’histoire musulmane en Andalousie." },
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

const arabicPages: Record<string, { intro: string; titles: string[]; texts: string[] }> = {"coran":{"intro":"مساحة لقراءة كتاب الله وفهمه ودراسته باحترام ومنهجية ومراجع موثوقة.","titles":["قراءة السور","الترجمات والتفاسير","الاستماع والحفظ"],"texts":["التعرّف على السور ومتابعة آياتها مع أرقامها.","عرض ترجمات معاني القرآن مع ذكر المترجمين ومراجع التفسير.","موارد صوتية وتكرار الآيات ونصائح لتنظيم الحفظ والمراجعة."]},"hadiths":{"intro":"دراسة السنة النبوية مع التمييز بين نص الحديث ومصدره ورقمه ودرجة صحته.","titles":["كتب الحديث","مراجع قابلة للتحقق","فهم الحديث"],"texts":["التعريف بصحيح البخاري وصحيح مسلم وغيرها من كتب الحديث المعتمدة.","ذكر الكتاب والباب ورقم الحديث والطبعة والحكم الحديثي عند توفره.","السياق والمفردات والشروح المنقولة عن مراجع محددة."]},"sira":{"intro":"رحلة زمنية في حياة رسول الله ﷺ وفي الظروف التاريخية لعصره.","titles":["العهد المكي","الهجرة والمدينة","مصادر السيرة"],"texts":["أحوال الجزيرة العربية قبل الوحي وبداية الدعوة وأوائل المسلمين.","الهجرة وبناء المجتمع الإسلامي وأحداث العهد المدني.","عرض الروايات مع ذكر مصادرها والتنبيه إلى الاختلافات التاريخية."]},"sciences-islamiques":{"intro":"موارد تعليمية للتعرّف على العلوم الإسلامية ومناهج دراستها.","titles":["التفسير وعلوم القرآن","الفقه والعقيدة","اللغة العربية والتجويد"],"texts":["أصول التفسير والمفردات القرآنية والعلوم المتعلقة بالوحي.","المبادئ الأساسية والمذاهب الفقهية وعرض الاختلاف بأدب واحترام.","النحو والصرف والقراءة وأحكام تلاوة القرآن."]},"lieux-merveilles":{"intro":"رحلة وثائقية عبر الأماكن المقدسة والمساجد التاريخية والمخطوطات وتراث الحضارة الإسلامية.","titles":["مكة المكرمة","المدينة المنورة","القدس والمسجد الأقصى","أغاديس — النيجر","الأندلس — إسبانيا","المكتبات والمخطوطات"],"texts":["الكعبة والمسجد الحرام ومكانتهما في مناسك الحج والعمرة.","المسجد النبوي والمعالم الرئيسية للعهد المدني.","المسجد الأقصى والتراث التاريخي للبلدة القديمة في القدس.","الجامع الكبير في أغاديس ومئذنته الطينية، من أبرز معالم العمارة في منطقة الساحل.","قصر الحمراء في غرناطة وقرطبة والآثار الفنية والعلمية والمعمارية للحضارة الإسلامية في الأندلس.","مراكز العلم والمكتبات التاريخية وانتقال المعارف والعلوم."]},"a-propos":{"intro":"الإسلام في الأصل مشروع تعليمي يهدف إلى نشر المعارف الإسلامية والتاريخية والثقافية.","titles":["رسالتنا","منهجنا","اتصل بنا"],"texts":["تيسير الوصول إلى المصادر وتشجيع التعلم ونقل المعرفة بمسؤولية.","تحديد المصادر والتحقق من المراجع والتمييز بين النصوص الشرعية والروايات التاريخية.","نيامي، النيجر · الهاتف: +227 88 37 61 33 · يمكن الانضمام إلى قناة واتساب عبر الزر أدناه."]}};

const photos = [
  { title: "La Mosquée sacrée — La Mecque", place: "Makkah, Arabie saoudite", src: "https://upload.wikimedia.org/wikipedia/commons/4/42/Kaaba%2C_Masjid_Al_Haram%2C_Mecca.jpg", credit: "Shahin Olakara — CC BY 2.0", href: "https://commons.wikimedia.org/wiki/File:Kaaba,_Masjid_Al_Haram,_Mecca.jpg" },
  { title: "La Mosquée du Prophète ﷺ", place: "Médine, Arabie saoudite", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/MasjidNabawi.jpg/1280px-MasjidNabawi.jpg", credit: "Wurzelgnohm — CC0", href: "https://commons.wikimedia.org/wiki/File:MasjidNabawi.jpg" },
  { title: "La Mosquée Al-Aqsa", place: "Jérusalem", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Jerusalem-2013%282%29-Temple_Mount-Al-Aqsa_Mosque_%28east_exposure%29.jpg/1280px-Jerusalem-2013%282%29-Temple_Mount-Al-Aqsa_Mosque_%28east_exposure%29.jpg", credit: "Andrew Shiva / Godot13 — CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Jerusalem-2013(2)-Temple_Mount-Al-Aqsa_Mosque_(east_exposure).jpg" },
  { title: "La Grande Mosquée d’Agadez", place: "Agadez, Niger", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Grand_Mosque_Agadez.jpg?width=1280", credit: "Aminucrus — CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Grand_Mosque_Agadez.jpg" },
  { title: "L’Alhambra — Al-Andalus", place: "Grenade, Andalousie, Espagne", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Alhambra_courtyard.jpg?width=1280", credit: "Jan Kranendonk — CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Alhambra_courtyard.jpg" }
];

export default function ContentPage({ slug }: { slug: string }) {
  const [arabic, setArabic] = useState(false);
  const page = pages[slug];
  if (!page) return null;
  const isPlaces = slug === "lieux-merveilles";
  function toggleArabic() { const next = !arabic; setArabic(next); document.documentElement.lang = next ? "ar" : "fr"; document.documentElement.dir = next ? "rtl" : "ltr"; document.body.classList.toggle("arabic-mode", next); }
  return (
    <main className="content-main">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <p className="eyebrow">L’Islam à l’Origine · {arabic ? "المعرفة والأمانة" : "Connaissance et transmission"}</p>
          <h1>{arabic ? page.arabic : page.title}</h1>
          <p>{arabic ? arabicPages[slug]?.intro : page.intro}</p>
          <button className="language-button page-language" onClick={toggleArabic}>{arabic ? "Français" : "العربية"}</button>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {slug === "coran" && <IslamicLibrary mode="quran" />}
          {slug === "hadiths" && <IslamicLibrary mode="hadith" />}
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
              <h2>{arabic ? (arabicPages[slug]?.titles[index] || item.title) : item.title}</h2><p>{arabic ? (arabicPages[slug]?.texts[index] || item.text) : item.text}</p>
            </article>)}
          </div>
          {slug === "sira" && <section className="history-panel">
            <p className="eyebrow">{arabic ? "خط زمني" : "Repères chronologiques"}</p>
            <h2>{arabic ? "محطات من السيرة النبوية" : "Les grandes étapes de la Sîra"}</h2>
            <div className="timeline-grid">
              {(arabic ? [
                ["نحو 570 م","المولد في مكة","تاريخ تقليدي يُربط بعام الفيل."],
                ["610 م","بداية الوحي","نزول أوائل الوحي في غار حراء."],
                ["622 م","الهجرة إلى المدينة","بداية المرحلة المدنية والتقويم الهجري."],
                ["630 م","فتح مكة","دخول مكة في السنة الثامنة للهجرة."],
                ["632 م","الوفاة في المدينة","وفاة النبي ﷺ في السنة الحادية عشرة للهجرة."]
              ] : [
                ["Vers 570","Naissance à La Mecque","Date traditionnelle associée à l’Année de l’Éléphant."],
                ["610","Début de la révélation","Premières révélations reçues dans la grotte de Hira."],
                ["622","L’Hégire","Migration vers Yathrib, future Médine ; début de l’ère hégirienne."],
                ["630","Retour à La Mecque","Entrée à La Mecque durant la huitième année de l’Hégire."],
                ["632","Décès à Médine","Décès du Prophète ﷺ durant la onzième année de l’Hégire."]
              ]).map((entry, i) => <article className="timeline-card" key={i}><strong>{entry[0]}</strong><h3>{entry[1]}</h3><p>{entry[2]}</p></article>)}
            </div>
            <p className="source-note">{arabic ? "التواريخ تقريبية وبعضها تقليدي؛ ينبغي الرجوع إلى المصادر المتخصصة عند التوسع." : "Les dates anciennes sont parfois approximatives et certaines relèvent de la chronologie traditionnelle. Pour approfondir :"} <a href="https://www.britannica.com/biography/Muhammad" target="_blank" rel="noreferrer">Encyclopaedia Britannica — Muhammad ↗</a></p>
          </section>}
          {slug === "lieux-merveilles" && <section className="history-panel">
            <p className="eyebrow">{arabic ? "التراث والتاريخ" : "Patrimoine et histoire"}</p>
            <h2>{arabic ? "مراجع للتعمق في المواقع" : "Repères historiques et patrimoniaux"}</h2>
            <div className="timeline-grid">
              <article className="timeline-card"><strong>Agadez · Niger</strong><h3>{arabic ? "مدينة تاريخية صحراوية" : "Carrefour saharien"}</h3><p>{arabic ? "تُعد المدينة القديمة في أغاديس شاهداً على التجارة العابرة للصحراء والعمارة الطينية في منطقة الساحل." : "La vieille ville témoigne des échanges transsahariens et de l’architecture en terre du Sahel."}<br/><a href="https://whc.unesco.org/en/list/1268/" target="_blank" rel="noreferrer">UNESCO — Centre historique d’Agadez ↗</a></p></article>
              <article className="timeline-card"><strong>Al-Andalus · Espagne</strong><h3>{arabic ? "قصر الحمراء في غرناطة" : "L’Alhambra de Grenade"}</h3><p>{arabic ? "مجمع قصري وحصني بارز من تاريخ بني نصر، وهو جزء من موقع التراث العالمي." : "Ensemble palatial et fortifié majeur de l’époque nasride, inscrit au patrimoine mondial avec l’Albaicín."}<br/><a href="https://whc.unesco.org/en/list/314/" target="_blank" rel="noreferrer">UNESCO — Alhambra, Generalife et Albaicín ↗</a></p></article>
              <article className="timeline-card"><strong>Jérusalem · Palestine</strong><h3>{arabic ? "البلدة القديمة" : "La vieille ville"}</h3><p>{arabic ? "Lieu de patrimoine religieux et historique majeur, dont le statut et l’histoire nécessitent une présentation documentée." : "Un patrimoine religieux et historique majeur, dont le statut et les différentes périodes doivent être présentés avec des sources solides."}<br/><a href="https://whc.unesco.org/en/list/148/" target="_blank" rel="noreferrer">UNESCO — Vieille ville de Jérusalem ↗</a></p></article>
            </div>
            <p className="source-note">{arabic ? "المصادر المؤسسية تساعد على التحقق من المعلومات التاريخية والتراثية." : "Les liens UNESCO servent de points de départ documentaires ; les notices seront enrichies au fil des références vérifiées."}</p>
          </section>}
          {slug === "a-propos" && <a className="button button-gold contact-button" href="https://whatsapp.com/channel/0029Vb896yMEQIatlW8t6G0o" target="_blank" rel="noreferrer">Rejoindre la chaîne WhatsApp ↗</a>}
          <p className="editorial-note">{arabic ? "تنبيه تحريري: يجب إرفاق النصوص الدينية والمعلومات التاريخية بمراجع يمكن التحقق منها. وقد ذُكرت مصادر الصور وتراخيصها بشكل منفصل." : "Note éditoriale : les textes religieux et les données historiques publiés sur ce site doivent être accompagnés de références vérifiables. Les photographies sont créditées individuellement."}</p>
        </div>
      </section>
    </main>
  );
}