import Link from 'next/link';
import Header from './_components/ui/Header';

export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-green-600">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4">Página no encontrada</h2>
          <p className="text-gray-600 mt-4 mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <Link 
            href="/"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}
