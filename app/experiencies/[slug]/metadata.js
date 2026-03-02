import { experiences } from '@/data/experiences';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const experience = experiences[slug];

  if (!experience) {
    return {
      title: 'Experiencia no encontrada',
    };
  }

  return {
    title: `${experience.title} - ${experience.subtitle}`,
    description: `Descubre ${experience.title}, ${experience.hero.hectares} hectáreas de naturaleza protegida desde ${experience.hero.founded}. ${experience.about[0].description}`,
    keywords: [
      experience.title,
      'ecoturismo',
      'parque natural',
      'Colombia',
      'naturaleza',
      'biodiversidad',
      experience.subtitle
    ],
    openGraph: {
      title: `${experience.title} - ${experience.subtitle} | Cladonia`,
      description: `Explora ${experience.title}: ${experience.hero.hectares} hectáreas de biodiversidad colombiana.`,
      images: [
        {
          url: experience.hero.image,
          width: 1200,
          height: 630,
          alt: `${experience.title} - ${experience.subtitle}`
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${experience.title} - ${experience.subtitle}`,
      description: `Explora ${experience.title}: ${experience.hero.hectares} hectáreas de biodiversidad colombiana.`,
      images: [experience.hero.image],
    },
    alternates: {
      canonical: `/experiencies/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(experiences).map((slug) => ({
    slug,
  }));
}
