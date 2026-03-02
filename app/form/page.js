import { Suspense } from 'react';
import Form from './sections/form';
import Header from './components/Header';

export const metadata = {
  title: 'Reserva tu Experiencia',
  description: 'Completa el formulario para reservar tu experiencia de ecoturismo en Cladonia. Selecciona fechas, actividades y personaliza tu aventura en la naturaleza colombiana.',
  keywords: ['reserva', 'formulario', 'booking', 'ecoturismo', 'Cladonia', 'Colombia'],
  openGraph: {
    title: 'Reserva tu Experiencia | Cladonia',
    description: 'Reserva tu aventura de ecoturismo en Colombia con Cladonia.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-white">Cargando...</p></div>}>
      <div className="bg-cover bg-fixed bg-center" style={{ backgroundImage: "url('/images/exp_1.png')" }}>
        <Header />
        <Form />
      </div>
    </Suspense>
  );
}