import "./globals.css";
import Footer from "./_components/ui/Footer";
import { Montserrat} from "next/font/google"
import { Toaster } from 'react-hot-toast';
import { generateOrganizationSchema } from '@/lib/structuredData';
import GoogleAnalytics from './_components/GoogleAnalytics';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});
export const metadata = {
  metadataBase: new URL('https://www.cladonia.org'),
  title: {
    default: 'Cladonia | Ecoturismo y Naturaleza en Colombia',
    template: '%s | Cladonia'
  },
  description: 'Descubre experiencias únicas de ecoturismo en reservas naturales de Colombia. Más de 1000 hectáreas de páramo y bosque altoandino te esperan.',
  keywords: ['ecoturismo', 'turismo naturaleza', 'Colombia', 'páramo', 'bosque altoandino', 'reservas naturales', 'biodiversidad'],
  authors: [{ name: 'Cladonia' }],
  creator: 'Cladonia',
  publisher: 'Cladonia',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://www.cladonia.org',
    siteName: 'Cladonia',
    title: 'Cladonia | Ecoturismo y Naturaleza en Colombia',
    description: 'Descubre experiencias únicas de ecoturismo en reservas naturales de Colombia.',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Cladonia Ecoturismo'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cladonia | Ecoturismo y Naturaleza en Colombia',
    description: 'Descubre experiencias únicas de ecoturismo en reservas naturales de Colombia.',
    images: ['/images/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'tu-codigo-de-verificacion',
  }
};

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema();
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${montserrat.className} bg-white text-gray-900 overflow-x-hidden`}>
        <GoogleAnalytics measurementId={GA_ID} />
        <Toaster position="top-center" />
        <main className="relative min-h-screen">{children}</main>
        <Footer />   
      </body>
    </html>
  );
}
