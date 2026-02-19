import Card from "../ui/Card";

export default function Experiencies() {
    return (
        <section className="relative w-screen min-h-screen overflow-hidden py-12 md:py-20 flex justify-center bg-white">  
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">Experiencias</h2>
                <div className="flex justify-center">
                    <Card 
                        title="PNN CHINGAZA"
                        description="El páramo de Chingaza nos brinda espacios de bienestar, donde el protagonista es el paisaje natural."
                        image="/images/img_1.png"
                        slug="chingaza"
                    />
                </div>
            </div>
        </section>                          
    )
}