'use client';
import { Suspense } from 'react';
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Header from "@/app/_components/ui/Header";
import Footer from "@/app/_components/ui/Footer";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const rur = searchParams.get('rur');

  return (
    <>
      <Header />
      
      <main className="relative min-h-screen w-full overflow-hidden">
        <Image 
          src="/images/img_1.png" 
          alt="Background" 
          fill
          className="object-cover object-center" 
          priority
        />
        
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-white px-4 py-20 mt-10">
          <div className="max-w-2xl text-center space-y-6 md:space-y-8">
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-balance">
              ¡Tu pre-reserva se ha generado con éxito!
            </h1>
            
            <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-xl p-6 md:p-8">
              <p className="text-yellow-400 font-bold text-sm md:text-base mb-2">
                ⚠️ IMPORTANTE - GUARDA ESTE CÓDIGO
              </p>
              {rur && (
                <div className="bg-yellow-400/30 border border-yellow-400 rounded-lg p-4 mb-4">
                  <p className="text-white font-bold text-2xl md:text-3xl tracking-wider">
                    {rur}
                  </p>
                </div>
              )}
              <p className="text-white text-lg md:text-xl mb-4">
                Tu código de reserva ha sido enviado a tu correo electrónico.
              </p>
              <p className="text-white/90 text-sm md:text-base">
                Lo necesitarás para cualquier consulta o modificación de tu reserva.
              </p>
            </div>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 text-balance">
              Estaremos en contacto contigo en las próximas 24 horas para confirmar todos los detalles de tu experiencia.
            </p>
            
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white pt-8 text-balance">
              ¡Aquí comienza tu aventura!
            </p>
            
            <div className="flex flex-col items-center space-y-6 pt-8">
              <Image
                src="/logo.svg"
                alt="Cladonia Logo"
                width={80}
                height={80}
                className="invert md:w-24 md:h-24"
              />
              <Image
                src="/tipografia.svg"
                alt="Cladonia"
                width={250}
                height={50}
                className="invert md:w-80"
              />
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Cargando...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
