"use client";

import Link from "next/link";
import Image from "next/image";
import ReserveButton from "./ReserveButton";
import { motion } from "framer-motion";

export default function Header() {

const headerAnimation = {
  hidden: { y: -80, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

return (
<motion.header
variants={headerAnimation}
initial="hidden"
animate="show"
className="fixed top-0 left-0 w-full z-50 bg-linear-to-r from-black/99 from-28% lg:from-10% via-black/0 via-46% lg:via-22% to-black/10 shadow-2xl shadow-black/20"
>

<nav className="relative mx-auto max-w-au px-4 md:px-8 py-2 md:py-3 flex items-center justify-between bg-black/16 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.12)] ">

{/* Logo */}
<Link href="/" className="flex flex-row items-center">

<Image
src="/logo.svg"
alt="Cladonia Logo"
width={32}
height={32}
className="md:w-13 md:h-13 invert"
priority
/>

<Image
src="/tipografia.svg"
alt="Nombre del proyecto"
width={150}
height={30}
className="relative object-contain invert md:w-50 md:h-10 mx-3 shadow-2xl shadow-black"
/>

</Link>

{/* navegación */}
<div className="flex items-center gap-12">

<a
href="#contacto"
className="text-white hover:text-white/90 transition text-lg font-medium text-shadow-md text-shadow-black/50"
>
Contacto
</a>

<div className="scale-90 md:scale-100">
<ReserveButton />
</div>

</div>

</nav>

</motion.header>
);
}
