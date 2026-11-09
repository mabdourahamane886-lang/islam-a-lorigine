import Link from "next/link";

const modules = [
 {n:"01",title:"Alphabet arabe — الحروف الهجائية",desc:"Les 28 lettres, leurs noms, leurs formes et leur prononciation.",href:"/apprentissage/huruf",status:"Débutant"},
 {n:"02",title:"Lecture arabe — القراءة",desc:"Voyelles, sukûn, shadda, syllabes et lecture de mots.",href:"/apprentissage/lecture",status:"Débutant · Niveau 2"},
 {n:"03",title:"Coran — القرآن الكريم",desc:"114 sourates, texte arabe, traduction du sens et récitations audio.",href:"/coran",status:"Lecture et écoute"},
 {n:"04",title:"Tajwid — التجويد",desc:"Points d'articulation, nûn sākinah, tanwîn et prolongations.",href:"/tajwid",status:"Récitation"},
 {n:"05",title:"Hadith — الحديث",desc:"Textes, recueils et références à vérifier dans les éditions utilisées.",href:"/hadiths",status:"Étude documentée"},
 {n:"06",title:"Fiqh — الفقه",desc:"Purification, prière, jeûne et principes de jurisprudence.",href:"/fiqh",status:"Introduction"},
 {n:"07",title:"Nahwu — النحو",desc:"Catégories de mots, phrases nominales et verbales, iʿrâb.",href:"/nahwu",status:"Grammaire"},
 {n:"08",title:"Sarf — الصرف",desc:"Racines, schèmes, formes verbales et morphologie.",href:"/apprentissage/sarf",status:"Morphologie"},
 {n:"09",title:"Tafsir — التفسير",desc:"Méthode d'exégèse, sources et références des explications.",href:"/tafsir",status:"Sciences du Coran"},
 {n:"10",title:"Sîra — السيرة النبوية",desc:"Étudier la vie du Prophète ﷺ et sa chronologie.",href:"/sira",status:"Histoire"},
 {n:"11",title:"Encyclopédie des savants — العلماء",desc:"Notices biographiques avec références précises aux ouvrages.",href:"/encyclopedie-savants",status:"Recherche"}
];
export const metadata={title:"Espace d’apprentissage",description:"Académie islamique : alphabet, lecture arabe, Coran, tajwid, hadith, fiqh, nahwu, sarf et tafsir."};
export default function LearningPage(){return <main>
<section className="learning-hero"><div className="container">
<p className="eyebrow">L’ISLAM À L’ORIGINE · ACADÉMIE</p><p className="learning-arabic" lang="ar" dir="rtl">طَلَبُ الْعِلْمِ</p>
<h1>Espace d’apprentissage</h1>
<p className="learning-lead">Un parcours structuré, du premier apprentissage des lettres arabes aux sciences islamiques. Chaque module propose des leçons, des objectifs et des exercices d'autoévaluation.</p>
<a className="button button-gold" href="#parcours">Découvrir les parcours</a>
</div></section>
<section className="section" id="parcours"><div className="container">
<div className="section-heading"><p className="eyebrow">PARCOURS PÉDAGOGIQUES</p><h2>Apprendre étape par étape</h2><p>Choisis une discipline et avance à ton rythme. Les cours religieux sont présentés avec prudence, références et distinction des divergences.</p></div>
<div className="learning-grid">{modules.map(m=><article className="learning-card" key={m.n}>
<span className="learning-number">{m.n}</span><p className="learning-status">{m.status}</p><h2>{m.title}</h2><p>{m.desc}</p><Link href={m.href} className="card-link">Accéder au module →</Link>
</article>)}</div>
<p className="learning-note">La progression et les réponses aux quiz sont actuellement conservées pendant la session de navigation. La synchronisation entre appareils nécessitera un espace étudiant et une base de données connectée.</p>
</div></section></main>;}
