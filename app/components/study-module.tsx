"use client";

import { useMemo, useState } from "react";

export type StudyLesson = { title: string; objective: string; content: string[]; reference: string };
export type StudyQuestion = { question: string; choices: string[]; answer: number; explanation: string };

export default function StudyModule({ title, arabicTitle, intro, level, lessons, questions, disclaimer }: {
  title: string; arabicTitle: string; intro: string; level: string;
  lessons: StudyLesson[]; questions: StudyQuestion[]; disclaimer: string;
}) {
  const [selected, setSelected] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const lesson = lessons[selected];
  const score = questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
  const progress = Math.round(completed.length / Math.max(lessons.length, 1) * 100);
  const answered = Object.keys(answers).length;
  const orderedLessons = useMemo(() => lessons.map((l, i) => ({ ...l, index: i })), [lessons]);

  function markComplete() {
    setCompleted(prev => prev.includes(selected) ? prev : [...prev, selected]);
    if (selected < lessons.length - 1) setSelected(selected + 1);
  }

  return <main>
    <section className="page-hero"><div className="container page-hero-inner">
      <p className="eyebrow">ACADÉMIE · {level}</p>
      <p lang="ar" dir="rtl" style={{fontFamily:"Amiri,serif",fontSize:32,color:"#8f6a25",margin:"0 0 8px"}}>{arabicTitle}</p>
      <h1>{title}</h1><p>{intro}</p>
    </div></section>
    <section className="section"><div className="container">
      <div className="library-panel" style={{background:"#f8f5ed",color:"#252a33",borderColor:"rgba(181,139,59,.25)"}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:16,flexWrap:"wrap",alignItems:"center"}}>
          <div><p className="eyebrow" style={{color:"#8f6a25"}}>VOTRE PROGRESSION</p><strong>{completed.length} / {lessons.length} leçons terminées</strong></div>
          <strong style={{fontSize:24,color:"#8f6a25"}}>{progress}%</strong>
        </div>
        <div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} style={{height:9,background:"#e8dfcc",borderRadius:20,overflow:"hidden",marginTop:12}}>
          <div style={{height:"100%",width:progress+"%",background:"#b58b3b",transition:"width .2s"}}/>
        </div>
      </div>
      <div className="study-layout">
        <aside className="learning-card" style={{minHeight:0}}>
          <h2 style={{marginTop:0}}>Plan du cours</h2>
          {orderedLessons.map(l => <button key={l.index} type="button" onClick={()=>setSelected(l.index)} aria-current={selected===l.index?"step":undefined}
            style={{display:"block",width:"100%",textAlign:"left",padding:"12px 10px",margin:"6px 0",border:"1px solid "+(selected===l.index?"#b58b3b":"#e9e0ce"),borderRadius:10,background:selected===l.index?"#f8f1e3":"#fffefa",color:"#252a33",cursor:"pointer"}}>
            <span style={{color:"#8f6a25",fontWeight:800,marginRight:8}}>{String(l.index+1).padStart(2,"0")}</span>{l.title}
            {completed.includes(l.index) && <span aria-label="Terminée" style={{float:"right",color:"#39724b"}}>✓</span>}
          </button>)}
        </aside>
        <article className="learning-card" style={{minHeight:0}}>
          <p className="learning-number">LEÇON {String(selected+1).padStart(2,"0")} / {lessons.length}</p>
          <h2 style={{fontSize:26}}>{lesson.title}</h2>
          <p><strong>Objectif :</strong> {lesson.objective}</p>
          {lesson.content.map((paragraph,i)=><p key={i} style={{lineHeight:1.85}}>{paragraph}</p>)}
          <div className="editorial-note"><strong>Référence / lecture complémentaire :</strong> {lesson.reference}</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:22}}>
            <button className="button button-gold" type="button" onClick={markComplete}>{completed.includes(selected)?"Leçon terminée ✓":"Marquer comme terminée"}</button>
            <button className="button button-ghost" style={{color:"#75551d",borderColor:"#b58b3b"}} type="button" disabled={selected===0} onClick={()=>setSelected(selected-1)}>Précédente</button>
            <button className="button button-ghost" style={{color:"#75551d",borderColor:"#b58b3b"}} type="button" disabled={selected===lessons.length-1} onClick={()=>setSelected(selected+1)}>Suivante</button>
          </div>
        </article>
      </div>
      <section className="learning-card" style={{marginTop:24,minHeight:0}}>
        <p className="eyebrow">AUTOÉVALUATION</p><h2>Vérifier ses connaissances</h2>
        <p>Réponds aux questions, puis affiche la correction. Le résultat est indicatif et ne remplace pas l'étude auprès d'un enseignant.</p>
        {questions.map((q,i)=><fieldset key={i} style={{border:"1px solid #e8dfcc",borderRadius:13,padding:16,margin:"16px 0"}}>
          <legend style={{fontWeight:800,padding:"0 6px"}}>{i+1}. {q.question}</legend>
          {q.choices.map((choice,j)=><label key={j} style={{display:"flex",gap:9,alignItems:"start",padding:"7px 0",cursor:"pointer"}}>
            <input type="radio" name={"question-"+i} checked={answers[i]===j} onChange={()=>{setAnswers(p=>({...p,[i]:j}));setChecked(false);}}/>
            <span>{choice}</span>
          </label>)}
          {checked && <p style={{color:answers[i]===q.answer?"#287344":"#9a4a32",marginBottom:0}}>{answers[i]===q.answer?"Bonne réponse.":"Réponse attendue : "+q.choices[q.answer]+". "} {q.explanation}</p>}
        </fieldset>)}
        <button className="button button-gold" type="button" disabled={answered!==questions.length} onClick={()=>setChecked(true)}>Corriger mes réponses</button>
        {checked && <p role="status" style={{fontWeight:800}}>Résultat : {score} / {questions.length}</p>}
      </section>
      <p className="learning-note">{disclaimer}</p>
    </div></section>
  </main>;
}
