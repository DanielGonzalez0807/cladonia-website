export const dynamicOptions = {
  transport: [
  {
    id: "standard",
    label: "Para 3 pasajeros",
    price: 50000,
    description: "Transporte ida y vuelta en bus compartido"
  },
  {
    id: "private",
    label: "Para 10 pasajeros",
    price: 120000,
    description: "Vehículo privado ida y vuelta"
  },
  {
    id: "luxury",
    label: "Para 15 pasajeros",
    price: 200000,
    description: "Camioneta 4x4 con conductor exclusivo"
  }
],

  meals: [
    {
      id: "breakfast",
      label: "Desayuno",
      price: 15000,
      description: "Desayuno completo"
    },
    {
      id: "snack",
      label: "Refrigerio",
      price: 8000,
      description: "Refrigerio ligero"
    },
    {
      id: "lunch",
      label: "Almuerzo",
      price: 25000,
      description: "Almuerzo completo"
    }
  ],
  guides: [
    {
      id: "photography",
      label: "Guía Experto en Fotografía",
      price: 100000,
      description: "Especialista en fotografía de naturaleza"
    },
    {
      id: "biology",
      label: "Guía Experto en Biología",
      price: 120000,
      description: "Biólogo especializado en fauna y flora"
    },
    {
      id: "bilingual",
      label: "Guía Bilingüe",
      price: 150000,
      description: "Guía con dominio de inglés"
    }
  ]
};
