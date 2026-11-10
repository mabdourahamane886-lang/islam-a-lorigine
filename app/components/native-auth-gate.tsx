"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function NativeAuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) { setReady(true); return; }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) { router.replace("/connexion/"); setReady(true); return; }
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      const isAuthPage = pathname.startsWith("/connexion");
      if (!data.session && !isAuthPage) router.replace("/connexion/");
      else if (data.session && isAuthPage) router.replace("/");
      setReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      if (!session && !pathname.startsWith("/connexion")) router.replace("/connexion/");
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, [pathname, router]);

  if (Capacitor.isNativePlatform() && !ready) return <main className="auth-loading">L’Islam à l’Origine</main>;
  return <>{children}</>;
}
