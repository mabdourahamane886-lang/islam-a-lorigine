"use client";

import { useState } from "react";

const letters = [
  ["ا","Alif","أَلِف"],["ب","Bâ","بَاء"],["ت","Tâ","تَاء"],["ث","Thâ","ثَاء"],["ج","Jîm","جِيم"],["ح","Hâ","حَاء"],["خ","Khâ","خَاء"],
  ["د","Dâl","دَال"],["ذ","Dhâl","ذَال"],["ر","Râ","رَاء"],["ز","Zây","زَاي"],["س","Sîn","سِين"],["ش","Shîn","شِين"],["ص","Sâd","صَاد"],
  ["ض","Dâd","ضَاد"],["ط","Tâ","طَاء"],["ظ","Zâ","ظَاء"],["ع","Ayn","عَيْن"],["غ","Ghayn","غَيْن"],["ف","Fâ","فَاء"],["ق","Qâf","قَاف"],
  ["ك","Kâf","كَاف"],["ل","Lâm","لَام"],["م","Mîm","مِيم"],["ن","Nûn","نُون"],["ه","Hâ","هَاء"],["و","Wâw","وَاو"],["ي","Yâ","يَاء"]
] as const;

export default function HurufPage() {
  const [selected,setSelected] = useState(0);
  const [notice,setNotice] = useState("");
  function speak(index:number) {
    if (!("speechSynthesis" in window)) { setNotice("La synthèse vocale n’est pas disponible sur ce navigateur."); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(letters[index][0]);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.lang.toLowerCase().startsWith("ar")) ?? null;
    utterance.lang = "ar";
    utterance.rate = 0.72;
    utterance.onstart = () => setNotice("Écoute de la lettre " + letters[index][1]);
    utterance.onerror = () => setNotice("La voix arabe n’est pas disponible sur cet appareil. Installe une voix arabe dans les paramètres de synthèse vocale.");
    utterance.onend = () => setNotice("");
    window.speechSynthesis.speak(utterance);
  }
  return <main>
    <section className="page-hero"><div className="container page-hero-inner">
      <p className="eyebrow">ACADÉMIE · NIVEAU 1</p><h1>Les lettres arabes</h1>
      <p>Découvrir les 28 lettres, écouter leur nom et s’entraîner à les reconnaître. Sélectionne une lettre pour l’agrandir et l’écouter.</p>
    </div></section>
    <section className="section"><div className="container">
      <div className="huruf-selected"><span lang="ar" dir="rtl">{letters[selected][0]}</span><div><strong>{letters[selected][1]}</strong><p lang="ar" dir="rtl">{letters[selected][2]}</p><button className="button button-gold" onClick={()=>speak(selected)}>Écouter la lettre</button></div></div>
      <div className="huruf-grid">{letters.map((l,i)=><button key={l[0]} className={selected===i?"huruf-card active":"huruf-card"} onClick={()=>{setSelected(i);speak(i);}} aria-label={"Sélectionner la lettre "+l[1]}><span lang="ar" dir="rtl">{l[0]}</span><strong>{l[1]}</strong></button>)}</div>
      <p className="learning-note" aria-live="polite">{notice || "Conseil : écoute chaque lettre, répète-la à voix haute, puis essaie de la reconnaître sans regarder son nom."}</p>
      <div className="learning-card" style={{marginTop:24}}><span className="learning-number">EXERCICE 1</span><h2>Reconnaître les lettres</h2><p>Choisis une lettre dans la grille, écoute sa prononciation, puis répète-la. Les leçons suivantes présenteront les formes initiales, médianes et finales, puis les voyelles courtes et les syllabes.</p></div>
      <p className="source-note">La lecture vocale de cette première version utilise la synthèse vocale arabe disponible sur l’appareil. Elle sert à découvrir les lettres et ne remplace pas l’écoute d’un enseignant qualifié pour corriger les points d’articulation.</p>
    </div></section>
  </main>;
}
