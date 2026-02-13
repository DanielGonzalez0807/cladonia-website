export const plans = {
  basic: {
    id: 'basic',
    name: 'Plan Básico',
    subtitle: 'Experiencia esencial',
    badge: null,
    features: [
      'Guía especializado',
      'Póliza de seguro incluida'
    ],
    prices: {
      // Chingaza
      lagunas_siecha: 45000,
      observacion_aves: 50000,
      fotografia_paisaje: 55000,
      // Zoque
      caminata_ecologica: 50000,
      avistamiento_fauna: 55000,
      plantas_medicinales: 48000,
      // Fotográfico
      amanecer_montaña: 60000,
      macro_flora: 58000,
      paisajes_aereos: 70000,
      // Eventos
      caminata_ancestral: 40000,
      tarde_meditacion: 38000,
      observacion_nocturna: 45000
    }
  },
  standard: {
    id: 'standard',
    name: 'Plan Estándar',
    subtitle: 'Experiencia completa',
    badge: 'MÁS POPULAR',
    features: [
      'Todo del plan básico',
      'Almuerzo incluido',
      'Transporte incluido'
    ],
    prices: {
      // Chingaza
      lagunas_siecha: 74900,
      observacion_aves: 80000,
      fotografia_paisaje: 85000,
      // Zoque
      caminata_ecologica: 80000,
      avistamiento_fauna: 85000,
      plantas_medicinales: 78000,
      // Fotográfico
      amanecer_montaña: 90000,
      macro_flora: 88000,
      paisajes_aereos: 100000,
      // Eventos
      caminata_ancestral: 65000,
      tarde_meditacion: 63000,
      observacion_nocturna: 70000
    }
  },
  premium: {
    id: 'premium',
    name: 'Plan Personalizado',
    subtitle: 'Experiencia a tu medida',
    badge: null,
    features: [
      'Todo del plan estándar',
      'Fotografía profesional',
      'Itinerario personalizado',
      'Guía bilingüe disponible'
    ],
    prices: {
      // Chingaza
      lagunas_siecha: 110000,
      observacion_aves: 120000,
      fotografia_paisaje: 130000,
      // Zoque
      caminata_ecologica: 120000,
      avistamiento_fauna: 130000,
      plantas_medicinales: 115000,
      // Fotográfico
      amanecer_montaña: 140000,
      macro_flora: 135000,
      paisajes_aereos: 160000,
      // Eventos
      caminata_ancestral: 95000,
      tarde_meditacion: 90000,
      observacion_nocturna: 100000
    }
  }
};
