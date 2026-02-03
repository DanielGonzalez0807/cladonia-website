import Card from "../components/ui/Card";

export default function Experiencies() {
    return (
        <section className="relative w-screen min-h-screen overflow-hidden bg-black py-12 md:py-20 flex justify-center">  
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">Experiencias</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <Card 
                        title="Parque Natural Nacional Chingaza"
                        description="Descubre páramos únicos, lagunas y frailejones centenarios. Camina por senderos que conectan ecosistemas de alta montaña."
                        image="/images/img_1.png"
                    />
                    <Card 
                        title="Reserva Natural El Zoque"
                        description="Sumérgete en bosques y observa especies de aves endémicas. Recorre senderos ecológicos mientras aprendes"
                        image="/images/img_2.png"
                    />
                    <Card 
                        title="Tour Fotográfico"
                        description="Captura la magia de paisajes únicos con técnicas profesionales de fotografía. Incluye equipo especializado y guía experto."
                        image="/images/img_3.png"
                    />
                </div>
            </div>
        </section>                          
    )
    
}