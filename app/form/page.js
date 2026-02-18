import { Suspense } from 'react';
import Form from './sections/form';
import Header from './components/Header';

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