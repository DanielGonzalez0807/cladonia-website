import Card from "@/app/experiencies/components/Card";

export default function Activities() {
    return (
        <section className="relative w-screen min-h-screen overflow-hidden bg-black py-12 md:py-20 flex justify-center">  
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">Actividades</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <Card 
                        title="Meditación Ancestral"
                        description="La meditación ancestral es una actividad que revitaliza y mejora tu salud."
                        image="/images/act_1.png"
                    />
                    <Card 
                        title="Senderismo Ecológico"
                        description="Explora senderos naturales mientras aprendes sobre la flora y fauna nativa. Descubre cómo cada especie contribuye al equilibrio del ecosistema en una caminata educativa guiada."
                        image="/images/act_2.png"
                    />
                    <Card 
                        title="Taller de Conservación"
                        description="Participa en actividades de preservación del hábitat natural. Aprende técnicas de reforestación, cuidado de especies y cómo contribuir a la protección del medio ambiente."
                        image="/images/act_3.png"
                    />
                </div>
            </div>
        </section>                          
    )    
}