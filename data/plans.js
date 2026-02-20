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
      sendero_1: { children: 24500, adults: 29000, seniors: 0, foreigners: 78500 },
      sendero_2: { children: 24500, adults: 29000, seniors: 0, foreigners: 78500 },
      sendero_3: { children: 24500, adults: 29000, seniors: 0, foreigners: 78500 },
      sendero_4: { children: 24500, adults: 29000, seniors: 0, foreigners: 78500 },
      sendero_5: { children: 24500, adults: 29000, seniors: 0, foreigners: 78500 },
      sendero_6: { children: 24500, adults: 29000, seniors: 0, foreigners: 78500 },
      sendero_7: { children: 24500, adults: 29000, seniors: 0, foreigners: 78500 }
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
