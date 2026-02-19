export const plans = {
  basic: {
    id: 'basic',
    name: 'Plan Básico',
    subtitle: 'Lo esencial para explorar',
    badge: null,
    features: [
      'Guía especializado',
      'Póliza de seguro incluida'
    ],
    rates: {
      sendero_1: { children: 30000, adults: 45000, seniors: 0, foreigners: 60000 },
      sendero_2: { children: 35000, adults: 50000, seniors: 0, foreigners: 65000 },
      sendero_3: { children: 38000, adults: 55000, seniors: 0, foreigners: 70000 },
      sendero_4: { children: 33000, adults: 48000, seniors: 0, foreigners: 63000 },
      sendero_5: { children: 40000, adults: 58000, seniors: 0, foreigners: 75000 },
      sendero_6: { children: 28000, adults: 42000, seniors: 0, foreigners: 55000 },
      sendero_7: { children: 45000, adults: 65000, seniors: 0, foreigners: 85000 }
    }
  },

  top: {
    id: 'top',
    name: 'Plan Top',
    subtitle: 'Todo incluido, inmersión total',
    badge: 'MÁS POPULAR',
    features: [
      'Todo del plan básico',
      'Almuerzo incluido',
      'Transporte incluido'
    ],
    prices: {
      sendero_1: 199000,
      sendero_2: 199000,
      sendero_3: 199000,
      sendero_4: 199000,
      sendero_5: 199000,
      sendero_6: 199000,
      sendero_7: 199000
    }
  },

  dynamic: {
    id: 'dynamic',
    name: 'Plan Dinámico',
    subtitle: 'Personaliza tu experiencia',
    badge: null,
    features: [
      'Base igual al plan básico',
      'Transporte opcional',
      'Alimentación opcional',
      'Tipo de guía seleccionable'
    ]
  }
};
