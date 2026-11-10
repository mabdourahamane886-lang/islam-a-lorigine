import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "./components/site-header";
import NativeAuthGate from "./components/native-auth-gate";
import AuthStyles from "./components/auth-styles";

export const metadata: Metadata = {
  title: {
    default: "L’Islam à l’Origine — Revenir aux sources",
    template: "%s | L’Islam à l’Origine"
  },
  description: "Bibliothèque islamique bilingue : Coran, récitation audio, hadiths référencés, Sîra, sciences islamiques et patrimoine historique.",
  metadataBase: new URL("https://islam-a-lorigine.bickriservice-agency.workers.dev"),
  icons: { icon: "/logo-mark.svg", shortcut: "/logo-mark.svg", apple: "/logo-mark.svg" },
  openGraph: {
    title: "L’Islam à l’Origine",
    description: "Revenir aux sources, comprendre l’Islam, transmettre avec connaissance.",
    type: "website",
    locale: "fr_FR"
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffefa"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" dir="ltr">
      <body>
        <AuthStyles />
        <NativeAuthGate>
          <SiteHeader />
          {children}
          <footer className="site-footer">
          <div className="container footer-inner">
            <div>
              <a className="brand footer-brand" href="/"> <img className="brand-logo footer-logo" src="/logo-islam-a-lorigine.svg" alt="L’Islam à l’Origine" /></a>
              <p>Revenir aux sources, comprendre l’Islam, transmettre avec connaissance.</p>
            </div>
            <div className="footer-links">
              <a href="/apprentissage">Académie</a><a href="/coran">Coran</a><a href="/hadiths">Hadiths</a><a href="/tajwid">Tajwid</a><a href="/fiqh">Fiqh</a><a href="/nahwu">Nahwu</a><a href="/apprentissage/sarf">Sarf</a><a href="/tafsir">Tafsir</a><a href="/sira">Sîra</a><a href="/encyclopedie-savants">Savants</a><a href="/lieux-merveilles">Patrimoine</a>
            </div>
            <small>© {new Date().getFullYear()} L’Islam à l’Origine. Les contenus doivent être vérifiés et référencés.</small>
          </div>
          </footer>
        </NativeAuthGate>
      </body>
    </html>
  );
}