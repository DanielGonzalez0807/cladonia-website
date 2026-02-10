import "./globals.css";
import Footer from "./_components/ui/Footer";
import { Montserrat} from "next/font/google"
import { Toaster } from 'react-hot-toast';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});
export const metadata = {
  title: "Cladonia",
  description: "Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} bg-white text-gray-900 overflow-x-hidden`}>
        <Toaster position="top-center" />
        <main className="relative min-h-screen">{children}</main>
        <Footer />   
      </body>
    </html>
  );
}
