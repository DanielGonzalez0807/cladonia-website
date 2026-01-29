"use client";
import Image from "next/image";
import { useState } from "react";

export default function FormPage() {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
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

  const handleDestinationChange = (e) => {
    setSelectedDestination(e.target.value);
    setSelectedPlan(""); // Reset plan selection when destination changes
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

  const currentPrices = getCurrentPrices();

  return (
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
            <div className="w-full max-w-3xl mx-auto px-12">
            <form className="space-y-6">
                    <div className="flex flex-row justify-between gap-4">
                        <div className="flex-1">
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
                            <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastname" className="block text-sm font-medium mb-1">Apellido</label>
                            <input type="text" id="lastname" name="lastname" required value={formData.lastname} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                        </div>
                    </div>
                    
                    <div className="flex flex-row gap-4">
                        <div className="w-2/5">
                            <label htmlFor="tel" className="block text-sm font-medium mb-1">Teléfono</label>
                            <input type="tel" id="tel" name="tel" required value={formData.tel} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Correo Electrónico</label>
                            <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-1">Fecha de Reserva</label>
                        <input type="date" id="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black" />
                    </div>
                    <div>
                        <label htmlFor="destination" className="block text-sm font-medium mb-1">Destino</label>
                        <select id="destination" name="destination" required value={selectedDestination} onChange={handleDestinationChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black">
                            <option value="">Selecciona un destino</option>
                            <option value="chingaza">Parque Nacional Chingaza</option>
                            <option value="zoque">Reserva Natural El Zoque</option>
                            <option value="fotografico">Tour Fotográfico</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="destination" className="block text-sm font-medium mb-1">Actividad</label>
                        <select id="destination" name="destination" required value={selectedDestination} onChange={handleDestinationChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black">
                            <option value="">Selecciona un destino</option>
                            <option value="chingaza">Senderismo a las lagunas de Siecha</option>
                            <option value="zoque">Reserva Natural El Zoque</option>
                            <option value="fotografico">Tour Fotográfico</option>
                        </select>
                    </div>
                    <div className="flex flex-row gap-4">
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
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">Observaciones (máx. 120 caracteres)</label>
                        <textarea id="description" name="description" maxLength="120" rows="3" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 valid:bg-white valid:text-black resize-none" placeholder="Cuéntanos sobre algo que debamos saber..."></textarea>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-center">Selecciona tu Plan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className={`bg-gray-800/40 border rounded-lg p-4 hover:border-yellow-400 transition cursor-pointer ${
                                selectedPlan === 'basic' ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-700'
                            }`} onClick={() => handlePlanChange('basic')}>
                                <input type="radio" id="basic" name="plan" value="basic" checked={selectedPlan === 'basic'} onChange={() => handlePlanChange('basic')} className="sr-only" />
                                <label htmlFor="basic" className="cursor-pointer">
                                    <h4 className="font-bold text-yellow-400 mb-2">Plan Básico</h4>
                                    <p className="text-sm mb-2">Experiencia esencial</p>
                                    <p className="text-lg font-bold">${currentPrices.basic.toLocaleString()}</p>
                                    <ul className="text-xs mt-2 space-y-1">
                                        <li>• Guía especializado</li>
                                        <li>• Duración: 4 horas</li>
                                        <li>• Refrigerio incluido</li>
                                    </ul>
                                </label>
                            </div>
                            <div className={`bg-gray-800/40 border rounded-lg p-4 hover:border-yellow-400 transition cursor-pointer ${
                                selectedPlan === 'standard' ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-700'
                            }`} onClick={() => handlePlanChange('standard')}>
                                <input type="radio" id="standard" name="plan" value="standard" checked={selectedPlan === 'standard'} onChange={() => handlePlanChange('standard')} className="sr-only" />
                                <label htmlFor="standard" className="cursor-pointer">
                                    <h4 className="font-bold text-yellow-400 mb-2">Plan Estándar</h4>
                                    <p className="text-sm mb-2">Experiencia completa</p>
                                    <p className="text-lg font-bold">${currentPrices.standard.toLocaleString()}</p>
                                    <ul className="text-xs mt-2 space-y-1">
                                        <li>• Todo del plan básico</li>
                                        <li>• Duración: 6 horas</li>
                                        <li>• Almuerzo incluido</li>
                                        <li>• Transporte</li>
                                    </ul>
                                </label>
                            </div>
                            <div className={`bg-gray-800/40 border rounded-lg p-4 hover:border-yellow-400 transition cursor-pointer ${
                                selectedPlan === 'premium' ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-700'
                            }`} onClick={() => handlePlanChange('premium')}>
                                <input type="radio" id="premium" name="plan" value="premium" checked={selectedPlan === 'premium'} onChange={() => handlePlanChange('premium')} className="sr-only" />
                                <label htmlFor="premium" className="cursor-pointer">
                                    <h4 className="font-bold text-yellow-400 mb-2">Plan Premium</h4>
                                    <p className="text-sm mb-2">Experiencia VIP</p>
                                    <p className="text-lg font-bold">${currentPrices.premium.toLocaleString()}</p>
                                    <ul className="text-xs mt-2 space-y-1">
                                        <li>• Todo del plan estándar</li>
                                        <li>• Duración: 8 horas</li>
                                        <li>• Fotografía profesional</li>
                                        <li>• Cena especial</li>
                                    </ul>
                                </label>
                            </div>
                        </div>
                        {selectedPlan && (
                            <div className="mt-4 p-4 bg-yellow-400/10 border border-yellow-400 rounded-lg">
                                <p className="text-center text-yellow-400 font-semibold">
                                    Plan seleccionado: <span className="capitalize">{selectedPlan}</span> - ${currentPrices[selectedPlan].toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-yellow-400 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-500 transition">Enviar Reserva</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  );
}