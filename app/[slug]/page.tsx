import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "../components/content-page";

const slugs = ["coran", "hadiths", "sira", "sciences-islamiques", "lieux-merveilles", "a-propos"];

export function generateStaticParams() {
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const titles: Record<string, string> = {
    coran: "Le Saint Coran",
    hadiths: "Hadiths authentiques",
    sira: "La vie du Prophète ﷺ",
    "sciences-islamiques": "Sciences islamiques",
    "lieux-merveilles": "Lieux et merveilles de l’Islam",
    "a-propos": "À propos et contact"
  };
  if (!titles[slug]) return {};
  return { title: titles[slug], description: titles[slug] + " — L’Islam à l’Origine." };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();
  return <ContentPage slug={slug} />;
}