import "./globals.css";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { Montserrat} from "next/font/google"

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
      <body className={`${montserrat.className} bg-black text-white`}>
        <main className="relative min-h-screen">{children}</main>
        <Footer />   
      </body>
    </html>
  );
}
