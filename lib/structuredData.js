export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Cladonia',
    description: 'Empresa especializada en turismo de naturaleza y experiencias ecoturísticas en Colombia',
    url: 'https://www.cladonia.org',
    logo: 'https://www.cladonia.org/logo.svg',
    image: 'https://www.cladonia.org/images/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CO',
      addressLocality: 'Colombia'
    },
    sameAs: [
      'https://www.instagram.com/cladonia',
      'https://www.facebook.com/cladonia'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Spanish']
    }
  };
}

export function generateExperienceSchema(experience, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: `${experience.title} - ${experience.subtitle}`,
    description: experience.about[0].description,
    image: experience.hero.image,
    url: `https://www.cladonia.org/experiencies/${slug}`,
    geo: {
      '@type': 'GeoCoordinates',
      // Agregar coordenadas reales cuando estén disponibles
    },
    touristType: ['Eco-tourism', 'Nature lovers', 'Adventure seekers']
  };
}
