import InfoCard from "@/app/_components/ui/InfoCard";

export default function Activities({ data }) {
    return (
        <section className="relative w-screen min-h-screen overflow-hidden py-12 md:py-20 flex justify-center bg-white">  
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">Actividades</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {data.activities.map((activity, index) => (
                        <InfoCard 
                            key={index}
                            title={activity.title}
                            description={activity.description}
                            image={activity.image}
                        />
                    ))}
                </div>
            </div>
        </section>                          
    )    
}