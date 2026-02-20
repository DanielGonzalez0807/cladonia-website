import { experiences } from "@/data/experiences";
import { notFound } from "next/navigation";
import ExperienceHero from "../components/ExperienceHero";
import About from "../sections/About";
import Trails from "../sections/Trails";
import Map from "../sections/Map";
import Recommendations from "../sections/Recommendations";
import BridgeReservePdf from "@/app/_components/ui/BridgeReservePdf";

export default async function ExperiencePage({ params }) {
  const { slug } = await params;

  const experience = experiences[slug];

  if (!experience) {
    notFound();
  }

  const serializedExperience = JSON.parse(JSON.stringify(experience));

  return (
    <main>
      <ExperienceHero data={serializedExperience} slug={slug} />
      <About data={serializedExperience} />
      <Trails />
      <Map data={serializedExperience} />
      <Recommendations />
      <BridgeReservePdf
        text="¿Quieres reservar esta experiencia?"
        slug={slug}
      />
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(experiences).map((slug) => ({
    slug,
  }));
}
