import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "./components/site-header";

export const metadata: Metadata = {
  title: {
    default: "L’Islam à l’Origine — Revenir aux sources",
    template: "%s | L’Islam à l’Origine"
  },
  description: "Une plateforme éducative pour découvrir le Coran, la Sunnah, la Sîra, les sciences islamiques et le patrimoine musulman.",
  metadataBase: new URL("https://islam-a-lorigine.vercel.app"),
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
  themeColor: "#071d17"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" dir="ltr">
      <body>
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <div className="container footer-inner">
            <div>
              <a className="brand footer-brand" href="/"> <span className="brand-mark">۞</span><span>L’Islam à l’Origine</span></a>
              <p>Revenir aux sources, comprendre l’Islam, transmettre avec connaissance.</p>
            </div>
            <div className="footer-links">
              <a href="/coran">Coran</a><a href="/hadiths">Hadiths</a><a href="/sira">Sîra</a><a href="/lieux-merveilles">Lieux et merveilles</a>
            </div>
            <small>© {new Date().getFullYear()} L’Islam à l’Origine. Les contenus doivent être vérifiés et référencés.</small>
          </div>
        </footer>
      </body>
    </html>
  );
}