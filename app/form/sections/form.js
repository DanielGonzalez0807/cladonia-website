"use client";
import Image from "next/image";
import { useState } from "react";

export default function FormPage() {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    tel: "",
    email: "",
    date: "",
    children: 0,
    adults: 1,
    seniors: 0,
    description: ""
  });

  // Precios por destino
  const destinationPrices = {
    chingaza: { basic: 45000, standard: 74900, premium: 110000 },
    zoque: { basic: 50000, standard: 80000, premium: 120000 },
    fotografico: { basic: 60000, standard: 90000, premium: 140000 }
  };

  const getCurrentPrices = () => {
    return selectedDestination ? destinationPrices[selectedDestination] : { basic: 50000, standard: 80000, premium: 120000 };
  };

  const currentPrices = getCurrentPrices();

  // Cálculo simple sin descuentos
  const calculateTotal = () => {
    if (!selectedPlan) return null;
    
    const basePrice = currentPrices[selectedPlan];
    const children = parseInt(formData.children) || 0;
    const adults = parseInt(formData.adults) || 0;
    const seniors = parseInt(formData.seniors) || 0;
    
    const totalPersons = children + adults + seniors;
    if (totalPersons === 0) return null;
    
    const total = basePrice * totalPersons;
    
    return {
      totalPersons,
      total
    };
  };
  
  const calculation = calculateTotal();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Actividades por destino
  const destinationActivities = {
    chingaza: [
      { value: "lagunas_siecha", label: "Senderismo a las lagunas de Siecha" },
      { value: "observacion_aves", label: "Observación de aves" },
      { value: "fotografia_paisaje", label: "Fotografía de paisaje" }
    ],
    zoque: [
      { value: "caminata_ecologica", label: "Caminata ecológica" },
      { value: "avistamiento_fauna", label: "Avistamiento de fauna" },
      { value: "plantas_medicinales", label: "Taller de plantas medicinales" }
    ],
    fotografico: [
      { value: "amanecer_montaña", label: "Fotografía de amanecer en montaña" },
      { value: "macro_flora", label: "Macrofotografía de flora" },
      { value: "paisajes_aereos", label: "Paisajes aéreos con drone" }
    ]
  };

  const getAvailableActivities = () => {
    return selectedDestination ? destinationActivities[selectedDestination] : [];
  };

  const handleDestinationChange = (e) => {
    setSelectedDestination(e.target.value);
    setSelectedActivity(""); // Reset activity selection when destination changes
    setSelectedPlan(""); // Reset plan selection when destination changes
  };

  const handleActivityChange = (e) => {
    setSelectedActivity(e.target.value);
  };

  const handlePlanChange = (planValue) => {
    setSelectedPlan(planValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.lastname.trim() &&
      formData.tel.trim() &&
      formData.email.trim() &&
      formData.date &&
      selectedDestination &&
      selectedActivity &&
      selectedPlan &&
      acceptTerms &&
      acceptPrivacy
    );
  };

  return (
    <>
    {/* Sección del Formulario */}
    <section className="relative w-full min-h-screen overflow-hidden">
        <Image 
            src="/images/exp_1.png" 
            alt="Background" 
            fill
            className="object-cover object-center" 
            priority
        />
        
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 min-h-screen flex flex-col justify-center text-white py-8">
            <h2 className="text-4xl font-bold text-white text-balance text-center mb-8">
                Ingresa tus datos<br />para reservar
            </h2>
            <div className="w-full max-w-5xl lg:max-w-3xl mx-auto px-4 md:px-8 lg:px-12">
            <form className="space-y-4 md:space-y-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
                            <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black transition-colors" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastname" className="block text-sm font-medium mb-1">Apellido</label>
                            <input type="text" id="lastname" name="lastname" required value={formData.lastname} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-2/5">
                            <label htmlFor="tel" className="block text-sm font-medium mb-1">Teléfono</label>
                            <input type="tel" id="tel" name="tel" required value={formData.tel} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Correo Electrónico</label>
                            <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="destination" className="block text-sm font-medium mb-1">Destino</label>
                        <select id="destination" name="destination" required value={selectedDestination} onChange={handleDestinationChange} className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-yellow-400 [&>option]:bg-white [&>option]:text-gray-800 ${
                            selectedDestination ? 'bg-white text-black border-gray-300' : 'bg-gray-800/40 text-white border-gray-700'
                        }`}>
                            <option value="">Selecciona un destino</option>
                            <option value="chingaza">Parque Nacional Chingaza</option>
                            <option value="zoque">Reserva Natural El Zoque</option>
                            <option value="fotografico">Tour Fotográfico</option>
                        </select>
                    </div>
                    {selectedDestination && (
                        <div>
                            <label htmlFor="activity" className="block text-sm font-medium mb-1">Actividad</label>
                            <select id="activity" name="activity" required value={selectedActivity} onChange={handleActivityChange} className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-yellow-400 [&>option]:bg-white [&>option]:text-gray-800 ${
                                selectedActivity ? 'bg-white text-black border-gray-300' : 'bg-gray-800/40 text-white border-gray-700'
                            }`}>
                                <option value="">Selecciona una actividad</option>
                                {getAvailableActivities().map((activity) => (
                                    <option key={activity.value} value={activity.value}>{activity.label}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="children" className="block text-sm font-medium mb-1">Niños o Estudiantes</label>
                            <input type="number" id="children" name="children" min="0" value={formData.children} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="adults" className="block text-sm font-medium mb-1">Adultos</label>
                            <input type="number" id="adults" name="adults" min="1" value={formData.adults} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="seniors" className="block text-sm font-medium mb-1">Mayores de 62 años</label>
                            <input type="number" id="seniors" name="seniors" min="0" value={formData.seniors} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                        </div>
                    </div>
                    <div className="max-w-md mx-auto">
                        <label htmlFor="date" className="block text-sm font-medium mb-1 text-center">Fecha de Reserva</label>
                        <input type="date" id="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">Observaciones (máx. 120 caracteres)</label>
                        <textarea id="description" name="description" maxLength="120" rows="3" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black resize-none" placeholder="Cuéntanos sobre algo que debamos saber..."></textarea>
                    </div>
                    {/* Términos y Condiciones */}
                    <div className="mt-8 mb-8 max-w-md mx-auto space-y-4">
                        <div className="flex items-start space-x-3">
                            <input 
                                type="checkbox" 
                                id="terms" 
                                checked={acceptTerms} 
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 text-yellow-400 bg-gray-800/40 border-gray-700 rounded focus:ring-yellow-400 focus:ring-2"
                            />
                            <label htmlFor="terms" className="text-sm text-white leading-relaxed">
                                Acepto los <span className="text-yellow-400 underline cursor-pointer hover:text-yellow-300">Términos y Condiciones</span> del servicio
                            </label>
                        </div>
                        <div className="flex items-start space-x-3">
                            <input 
                                type="checkbox" 
                                id="privacy" 
                                checked={acceptPrivacy} 
                                onChange={(e) => setAcceptPrivacy(e.target.checked)}
                                className="mt-1 w-4 h-4 text-yellow-400 bg-gray-800/40 border-gray-700 rounded focus:ring-yellow-400 focus:ring-2"
                            />
                            <label htmlFor="privacy" className="text-sm text-white leading-relaxed">
                                Autorizo el tratamiento de mis datos personales conforme a la <span className="text-yellow-400 underline cursor-pointer hover:text-yellow-300">Política de Privacidad y Protección de Datos Personales</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
    
    {/* Sección de Planes */}
    <section className="relative w-full min-h-screen overflow-hidden">
        <Image 
            src="/images/exp_1.png" 
            alt="Background" 
            fill
            className="object-cover object-center" 
        />
        
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 min-h-screen flex flex-col justify-center text-white py-8">
            <div className="w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
                <form className="space-y-4 md:space-y-6">
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-8 text-center">Selecciona tu Plan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Plan Básico */}
                            <div className={`relative bg-gray-800/40 rounded-xl border-2 cursor-pointer hover:border-yellow-400 transition-colors ${
                                selectedPlan === 'basic' ? 'border-yellow-400' : 'border-gray-700'
                            }`} onClick={() => handlePlanChange('basic')}>
                                <div className="p-6">
                                    <div className="text-center mb-4">
                                        <h4 className="text-xl font-bold text-yellow-400 mb-2">Plan Básico</h4>
                                        <p className="text-white text-sm">Experiencia esencial</p>
                                    </div>
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold text-white">${(currentPrices.basic / 1000).toFixed(0)}K</div>
                                        <div className="text-gray-300 text-sm">por persona</div>
                                    </div>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-center text-white">
                                            <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Guía especializado
                                        </li>
                                        <li className="flex items-center text-white">
                                            <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Póliza de seguro incluida
                                        </li>
                                    </ul>
                                </div>
                                <input type="radio" id="basic" name="plan" value="basic" checked={selectedPlan === 'basic'} onChange={() => handlePlanChange('basic')} className="sr-only" />
                            </div>

                            {/* Plan Estándar */}
                            <div className={`relative bg-gray-800/40 rounded-xl border-2 cursor-pointer hover:border-yellow-400 transition-colors ${
                                selectedPlan === 'standard' ? 'border-yellow-400' : 'border-gray-700'
                            }`} onClick={() => handlePlanChange('standard')}>
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">MÁS POPULAR</span>
                                </div>
                                <div className="p-6">
                                    <div className="text-center mb-4">
                                        <h4 className="text-xl font-bold text-yellow-400 mb-2">Plan Estándar</h4>
                                        <p className="text-white text-sm">Experiencia completa</p>
                                    </div>
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold text-white">${(currentPrices.standard / 1000).toFixed(0)}K</div>
                                        <div className="text-gray-300 text-sm">por persona</div>
                                    </div>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-center text-white">
                                            <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Todo del plan básico
                                        </li>
                                        <li className="flex items-center text-white">
                                            <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Almuerzo incluido
                                        </li>
                                        <li className="flex items-center text-white">
                                            <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Transporte incluido
                                        </li>
                                    </ul>
                                </div>
                                <input type="radio" id="standard" name="plan" value="standard" checked={selectedPlan === 'standard'} onChange={() => handlePlanChange('standard')} className="sr-only" />
                            </div>

                            {/* Plan Personalizado */}
                            <div className={`relative bg-gray-800/40 rounded-xl border-2 cursor-pointer hover:border-yellow-400 transition-colors ${
                                selectedPlan === 'premium' ? 'border-yellow-400' : 'border-gray-700'
                            }`} onClick={() => handlePlanChange('premium')}>
                                <div className="p-6">
                                    <div className="text-center mb-4">
                                        <h4 className="text-xl font-bold text-yellow-400 mb-2">Plan Personalizado</h4>
                                        <p className="text-white text-sm">Experiencia a tu medida</p>
                                    </div>
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold text-white">${(currentPrices.premium / 1000).toFixed(0)}K</div>
                                        <div className="text-gray-300 text-sm">por persona</div>
                                    </div>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-center text-white">
                                            <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Todo del plan estándar
                                        </li>
                                        <li className="flex items-center text-white">
                                            <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Fotografía profesional
                                        </li>
                                        <li className="flex items-center text-white">
                                            <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Itinerario personalizado
                                        </li>
                                        <li className="flex items-center text-white">
                                            <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Guía bilingüe disponible
                                        </li>
                                    </ul>
                                </div>
                                <input type="radio" id="premium" name="plan" value="premium" checked={selectedPlan === 'premium'} onChange={() => handlePlanChange('premium')} className="sr-only" />
                            </div>
                        </div>
                        {selectedPlan && (
                            <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400 rounded-lg">
                                <p className="text-center text-yellow-400 font-semibold">
                                    Plan seleccionado: <span className="capitalize">{selectedPlan === 'premium' ? 'personalizado' : selectedPlan}</span> - ${currentPrices[selectedPlan].toLocaleString()}
                                </p>
                                {calculation && (
                                    <div className="mt-4 text-center">
                                        <p className="text-yellow-400 font-bold text-xl">
                                            Total: {formatPrice(calculation.total)}
                                        </p>
                                        <p className="text-gray-300 text-xs mt-1">
                                            Para {calculation.totalPersons} personas
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        <button 
                            type="submit" 
                            disabled={!isFormValid()}
                            className={`w-full px-4 py-2 rounded-md font-bold transition ${
                                isFormValid() 
                                    ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Enviar Reserva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
    </>
  );
}