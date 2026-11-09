"use client";

import { useEffect, useState } from "react";

const links = [
  ["/", "Accueil", "الرئيسية"],
  ["/coran", "Coran", "القرآن"],
  ["/hadiths", "Hadiths", "الحديث"],
  ["/sira", "Sîra", "السيرة"],
  ["/sciences-islamiques", "Sciences", "العلوم الإسلامية"],
  ["/lieux-merveilles", "Lieux & merveilles", "الأماكن والعجائب"],
  ["/a-propos", "À propos", "من نحن"]
];

export default function SiteHeader() {
  const [arabic, setArabic] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const sync = (event: Event) => setArabic((event as CustomEvent<{ arabic: boolean }>).detail.arabic); window.addEventListener("site-language-change", sync); return () => window.removeEventListener("site-language-change", sync); }, []);

  function toggleLanguage() {
    const next = !arabic;
    setArabic(next);
    document.documentElement.lang = next ? "ar" : "fr";
    document.documentElement.dir = next ? "rtl" : "ltr";
    document.body.classList.toggle("arabic-mode", next);
    window.dispatchEvent(new CustomEvent("site-language-change", { detail: { arabic: next } }));
  }

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a className="brand" href="/" aria-label="L’Islam à l’Origine - Accueil">
          <span className="brand-mark">۞</span>
          <span>L’Islam à l’Origine</span>
        </a>
        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Navigation principale">
          {links.map(([href, fr, ar]) => <a key={href} href={href} onClick={() => setOpen(false)}>{arabic ? ar : fr}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="language-button" onClick={toggleLanguage} aria-label="Changer la langue">{arabic ? "FR" : "عربي"}</button>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu" aria-expanded={open}>{open ? "Fermer" : "Menu"}</button>
        </div>
      </div>
    </header>
  );
}