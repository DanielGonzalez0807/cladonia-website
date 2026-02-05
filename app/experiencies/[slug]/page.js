import { experiences } from "@/data/experiences";
import { notFound } from "next/navigation";
import ExperienceHero from "../components/ExperienceHero";
import About from "../sections/About";
import Activities from "../sections/Activities";
import Map from "../sections/Map";
import Recommendations from "../sections/Recommendations";
import Bridge from "@/app/_components/ui/Bridge";
import Experiencies from "@/app/_components/sections/Experiencies";

export default async function ExperiencePage({ params }) {
  const { slug } = await params;
  const experience = experiences[slug];
  
  if (!experience) {
    notFound();
  }

  return (
    <main>
      <ExperienceHero data={experience} />
      <About data={experience} />
      <Activities data={experience} />
      <Map data={experience} />
      <Recommendations />
      <Bridge text="Explora más experiencias" />
      <Experiencies />
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(experiences).map((slug) => ({
    slug: slug,
  }));
}