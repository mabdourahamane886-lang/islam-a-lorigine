import Link from "next/link";

const modules = [
  { n: "01", title: "Alphabet arabe — الحروف الهجائية", desc: "Apprendre les lettres une par une, écouter leur prononciation, reconnaître leurs formes et s’exercer.", href: "/apprentissage/huruf", status: "Parcours débutant" },
  { n: "02", title: "Lecture arabe — القراءة", desc: "Voyelles, syllabes, lettres attachées, mots puis phrases, avec une progression guidée.", href: "/apprentissage/huruf", status: "Après les lettres" },
  { n: "03", title: "Coran — القرآن الكريم", desc: "Les 114 sourates, texte arabe, traduction française et récitations audio par sourate.", href: "/coran", status: "Lecture et écoute" },
  { n: "04", title: "Hadith — الحديث", desc: "Étudier les recueils et les textes avec leurs références et leur degré d’authenticité lorsqu’il est établi.", href: "/hadiths", status: "Étude documentée" },
  { n: "05", title: "Fiqh — الفقه", desc: "Étudier les règles de pratique religieuse avec indication des sources et des divergences reconnues.", href: "/fiqh", status: "Parcours d’étude" },
  { n: "06", title: "Grammaire arabe / Nahwu — النحو", desc: "Comprendre la structure de la langue arabe, les mots, les phrases et les règles grammaticales.", href: "/nahwu", status: "Parcours progressif" },
  { n: "07", title: "Tafsir — التفسير", desc: "Approcher l’explication des versets en indiquant les ouvrages et les références consultés.", href: "/sciences-islamiques", status: "Étude du Coran" },
  { n: "08", title: "Encyclopédie des savants — العلماء", desc: "Rechercher les notices biographiques avec références bibliographiques vérifiables.", href: "/encyclopedie-savants", status: "Références" }
];

export const metadata = {
  title: "Espace d’apprentissage",
  description: "Académie islamique : alphabet arabe, lecture, Coran, hadith, fiqh, nahwu et tafsir."
};

export default function LearningPage() {
  return <main>
    <section className="learning-hero"><div className="container">
      <p className="eyebrow">L’ISLAM À L’ORIGINE · ACADÉMIE</p>
      <p className="learning-arabic" lang="ar" dir="rtl">طَلَبُ الْعِلْمِ</p>
      <h1>Espace d’apprentissage</h1>
      <p className="learning-lead">Un parcours pour apprendre progressivement : commencer par les lettres arabes, apprendre à lire, puis étudier le Coran, les hadiths et les sciences islamiques.</p>
      <a className="button button-gold" href="#parcours">Découvrir les parcours</a>
    </div></section>
    <section className="section" id="parcours"><div className="container">
      <div className="section-heading"><p className="eyebrow">PARCOURS PÉDAGOGIQUES</p><h2>Apprendre étape par étape</h2><p>Chaque discipline possède son espace. Les contenus seront enrichis progressivement et les textes religieux resteront accompagnés de leurs références.</p></div>
      <div className="learning-grid">{modules.map(m => <article className="learning-card" key={m.n}>
        <span className="learning-number">{m.n}</span><p className="learning-status">{m.status}</p><h2>{m.title}</h2><p>{m.desc}</p><Link href={m.href} className="card-link">Accéder au module →</Link>
      </article>)}</div>
      <p className="learning-note">Les modules sont organisés par niveaux. La progression et les évaluations interactives seront activées au fur et à mesure de la publication des leçons vérifiées.</p>
    </div></section>
  </main>;
}
