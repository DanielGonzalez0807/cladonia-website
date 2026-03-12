"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

return (
<section className="relative w-screen min-h-screen text-gray-900 py-12 md:py-20 bg-white">  

<h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-12 md:mb-16">
C L A D O N I A
</h2>

<div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-6 md:gap-8 lg:gap-32 px-4 md:px-6">

{/* TEXTO */}
<div className="w-full lg:w-full">
<p className="text-justify text-sm md:text-base lg:text-lg leading-relaxed text-gray-800">
En Cladonia, somos apasionados por la naturaleza y las aventuras al aire libre.
Nuestra misión es ofrecer experiencias únicas que conecten a las personas con el entorno natural.
<br /><br />
Fundada por un grupo de entusiastas del senderismo y la exploración, Cladonia se dedica a organizar excursiones,
talleres y eventos que promueven la conservación y el respeto por la naturaleza.
<br /><br />
Nuestro propósito es ofrecer experiencias de conexión con la naturaleza a través de recorridos guiados,
observación de fauna y programas de educación ambiental.
</p>
</div>

{/* GRID */}
<div className="w-full">

{/* Carrusel móvil */}
<div className="lg:hidden flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
style={{scrollbarWidth:'none',msOverflowStyle:'none'}}>

<motion.div variants={item} initial="hidden" whileInView="show" viewport={{once:true}}
className="relative min-w-full h-48 md:h-64 rounded-lg overflow-hidden snap-start">
<Image src="/images/img_1.png" alt="" fill className="object-cover"/>
</motion.div>

<motion.div variants={item} initial="hidden" whileInView="show" viewport={{once:true}}
className="relative min-w-full h-48 md:h-64 rounded-lg overflow-hidden snap-start">
<Image src="/images/img_2.png" alt="" fill className="object-cover"/>
</motion.div>

<motion.div variants={item} initial="hidden" whileInView="show" viewport={{once:true}}
className="relative min-w-full h-48 md:h-64 rounded-lg overflow-hidden snap-start">
<Image src="/images/img_3.png" alt="" fill className="object-cover"/>
</motion.div>

</div>

{/* Bento grid desktop */}
<motion.div
variants={container}
initial="hidden"
whileInView="show"
viewport={{once:true}}
className="hidden lg:grid grid-cols-5 grid-rows-4 gap-3 h-104"
>

<motion.div variants={item} className="relative rounded-lg bg-white overflow-hidden row-span-2"></motion.div>

<motion.div variants={item} className="relative rounded-lg overflow-hidden row-span-2 shadow-md shadow-black/50">
<Image src="/images/img_1.png" alt="" fill className="object-cover"/>
</motion.div>

<motion.div variants={item} className="relative rounded-lg overflow-hidden col-span-2 shadow-md shadow-black/50">
<Image src="/images/img_2.png" alt="" fill className="object-cover"/>
</motion.div>

<motion.div variants={item} className="relative rounded-lg bg-white overflow-hidden row-span-1"></motion.div>

<motion.div variants={item} className="relative rounded-lg overflow-hidden row-span-2 shadow-md shadow-black/50">
<Image src="/images/img_3.png" alt="" fill className="object-cover"/>
</motion.div>

<motion.div variants={item} className="relative rounded-lg overflow-hidden col-span-2 shadow-md shadow-black/50">
<Image src="/images/img_3.png" alt="" fill className="object-cover"/>
</motion.div>

<motion.div variants={item} className="relative rounded-lg overflow-hidden col-span-2 shadow-md shadow-black/50">
<Image src="/images/img_3.png" alt="" fill className="object-cover"/>
</motion.div>

<motion.div variants={item} className="relative rounded-lg overflow-hidden row-span-2 shadow-md shadow-black/50">
<Image src="/images/img_3.png" alt="" fill className="object-cover"/>
</motion.div>

<motion.div variants={item} className="relative rounded-lg bg-white overflow-hidden row-span-2"></motion.div>

<motion.div variants={item} className="relative rounded-lg bg-white overflow-hidden row-span-2"></motion.div>

<motion.div variants={item} className="relative rounded-lg overflow-hidden col-span-2 shadow-md shadow-black/50">
<Image src="/images/img_2.png" alt="" fill className="object-cover"/>
</motion.div>

</motion.div>

</div>
</div>
</section>
);
}
