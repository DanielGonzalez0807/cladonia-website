import { Suspense } from 'react';
import Form from './sections/form';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-white">Cargando...</p></div>}>
      <Form />
    </Suspense>
  );
}