"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type LoginMode = "email" | "phone";
type ViewMode = "login" | "signup" | "reset";

export default function ConnexionPage() {
  const [mode, setMode] = useState<LoginMode>("email");
  const [view, setView] = useState<ViewMode>("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(""); setMessage("");
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("La configuration Supabase est absente. Vérifiez les variables NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      setBusy(false); return;
    }
    try {
      if (view === "reset") {
        if (mode !== "email") throw new Error("La réinitialisation par lien est actuellement disponible par e-mail.");
        const { error } = await supabase.auth.resetPasswordForEmail(identifier.trim(), { redirectTo: window.location.origin + "/connexion/" });
        if (error) throw error;
        setMessage("Si cette adresse correspond à un compte, un lien de réinitialisation vient d’être envoyé.");
      } else if (view === "signup") {
        const credentials = mode === "email"
          ? { email: identifier.trim(), password }
          : { phone: identifier.trim(), password };
        const { data, error } = await supabase.auth.signUp({
          ...credentials,
          options: { data: { full_name: fullName.trim(), app_scope: "islam-a-lorigine" } }
        });
        if (error) throw error;
        if (data.session && data.user) {
          await supabase.from("islam_origine_app_profiles").upsert({
            id: data.user.id, full_name: fullName.trim() || null,
            phone: mode === "phone" ? identifier.trim() : null
          });
          window.location.assign("/");
        } else {
          setMessage(mode === "phone"
            ? "Compte créé. Vérifiez le code SMS envoyé pour confirmer votre numéro avant de vous connecter."
            : "Compte créé. Consultez votre boîte e-mail pour confirmer votre adresse avant de vous connecter.");
        }
      } else {
        const credentials = mode === "email"
          ? { email: identifier.trim(), password }
          : { phone: identifier.trim(), password };
        const { data, error } = await supabase.auth.signInWithPassword(credentials);
        if (error) throw error;
        if (data.user) {
          await supabase.from("islam_origine_app_profiles").upsert({
            id: data.user.id,
            full_name: String(data.user.user_metadata?.full_name ?? "") || null,
            phone: data.user.phone ?? null
          });
        }
        window.location.assign("/");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Une erreur est survenue. Réessayez.");
    } finally { setBusy(false); }
  }

  const title = view === "signup" ? "Créer un compte" : view === "reset" ? "Mot de passe oublié" : "Bienvenue";
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link href="/" className="auth-brand"><span>۞</span><b>L’Islam à l’Origine</b></Link>
        <p className="auth-eyebrow">ESPACE PERSONNEL</p>
        <h1>{title}</h1>
        <p className="auth-intro">Accédez à votre espace d’apprentissage et retrouvez votre progression.</p>

        {view !== "reset" && (
          <div className="auth-tabs" role="group" aria-label="Type de connexion">
            <button type="button" className={mode === "email" ? "active" : ""} onClick={() => {setMode("email");setError("");setMessage("");}}>E-mail</button>
            <button type="button" className={mode === "phone" ? "active" : ""} onClick={() => {setMode("phone");setError("");setMessage("");}}>Téléphone</button>
          </div>
        )}
        <form onSubmit={submit} className="auth-form">
          {view === "signup" && <label>Nom complet<input autoComplete="name" value={fullName} onChange={e=>setFullName(e.target.value)} required placeholder="Votre nom" /></label>}
          <label>{mode === "email" ? "Adresse e-mail" : "Numéro de téléphone"}
            <input type={mode === "email" ? "email" : "tel"} autoComplete={mode === "email" ? "email" : "tel"} value={identifier} onChange={e=>setIdentifier(e.target.value)} required placeholder={mode === "email" ? "nom@exemple.com" : "+227 90 00 00 00"} />
          </label>
          {view !== "reset" && <label>Mot de passe
            <div className="auth-password"><input type={showPassword ? "text" : "password"} autoComplete={view === "signup" ? "new-password" : "current-password"} value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} placeholder="6 caractères minimum" /><button type="button" onClick={()=>setShowPassword(v=>!v)}>{showPassword ? "Masquer" : "Afficher"}</button></div>
          </label>}
          {error && <p className="auth-error" role="alert">{error}</p>}
          {message && <p className="auth-success" role="status">{message}</p>}
          <button className="auth-submit" type="submit" disabled={busy}>{busy ? "Veuillez patienter…" : view === "signup" ? "Créer mon compte" : view === "reset" ? "Envoyer le lien" : "Se connecter"}</button>
        </form>
        <div className="auth-links">
          {view === "login" && <><button type="button" onClick={()=>{setView("reset");setMode("email");setError("");setMessage("");}}>Mot de passe oublié ?</button><p>Pas encore de compte ? <button type="button" onClick={()=>{setView("signup");setError("");setMessage("");}}>Créer un compte</button></p></>}
          {view !== "login" && <button type="button" onClick={()=>{setView("login");setError("");setMessage("");}}>← Retour à la connexion</button>}
        </div>
        <p className="auth-legal">Vos identifiants sont protégés. Ne partagez jamais votre mot de passe.</p>
      </section>
    </main>
  );
}
