'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/app/_components/ui/Header';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const rur = searchParams.get('rur');

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full bg-gray-800/60 border border-gray-700 rounded-2xl p-8 md:p-12 text-center">
          
          <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-8 flex items-center justify-center">
            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¡Pre-reserva Generada con Éxito!
          </h1>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Tu solicitud ha sido recibida correctamente
          </p>

          {rur && (
            <div className="bg-yellow-400/10 border-2 border-yellow-400 rounded-xl p-6 mb-8">
              <p className="text-yellow-400 text-sm mb-3 uppercase tracking-wider font-bold">
                ⚠️ Importante - Guarda este código
              </p>
              <div className="bg-gray-900/60 border border-yellow-400 rounded-lg p-4 mb-4">
                <p className="text-yellow-400 text-2xl md:text-3xl font-bold tracking-wide">{rur}</p>
              </div>
              <p className="text-white text-sm">
                Lo necesitarás para cualquier consulta o modificación de tu reserva
              </p>
            </div>
          )}

          <div className="bg-blue-500/10 border border-blue-400 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-blue-400 font-bold text-lg mb-3">Próximos Pasos</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Estaremos en contacto contigo en las próximas <strong>24 horas</strong></span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Recibirás un correo para completar el registro de visitantes</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Revisa tu correo electrónico (incluyendo spam)</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-400 rounded-xl p-5 mb-8">
            <p className="text-green-400 text-lg font-bold leading-relaxed">
              ¡Aquí comienza tu aventura!
            </p>
          </div>

          <a 
            href="/"
            className="inline-block bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg hover:bg-yellow-500 transition"
          >
            Volver al Inicio
          </a>

          <p className="text-gray-500 text-sm mt-8">
            ALMONTE by Cladonia S.A.S
          </p>
        </div>
      </div>
    </>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Cargando...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
