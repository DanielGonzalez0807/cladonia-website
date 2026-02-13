"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { plans } from "@/data/plans";
import { activities } from "@/data/activities";
import TermsModal from "@/app/_components/ui/TermsModal";
import { supabase } from "@/lib/supabase";
import { useEvents } from "@/hooks/useEvents";

const EXPERIENCE_MAP = {
  'chingaza': 'chingaza',
  'cocuy': 'zoque',
  'fotografia': 'fotografico'
};

export default function Form() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { events, loading: eventsLoading } = useEvents();
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      lastname: "",
      tel: "",
      email: "",
      date: null,
      children: 0,
      adults: 1,
      seniors: 0,
      description: "",
      acceptTerms: false,
      acceptPrivacy: false
    }
  });

  const { children, adults, seniors, acceptTerms, acceptPrivacy } = watch();

  useEffect(() => {
    if (events.length === 0) return;
    
    const experience = searchParams.get('experience');
    const destination = searchParams.get('destination');
    const activity = searchParams.get('activity');
    
    if (destination === 'eventos' && activity) {
      setSelectedDestination('eventos');
      setSelectedActivity(activity);
      const event = events.find(e => e.id === activity);
      setSelectedEvent(event);
    } else if (experience) {
      const mappedExperience = EXPERIENCE_MAP[experience];
      if (mappedExperience) {
        setSelectedDestination(mappedExperience);
      }
    }
  }, [searchParams, events.length]);

  const currentPrices = useMemo(() => {
    if (!selectedActivity) return null;
    return {
      basic: plans.basic.prices[selectedActivity],
      standard: plans.standard.prices[selectedActivity],
      premium: plans.premium.prices[selectedActivity]
    };
  }, [selectedActivity]);

  const calculation = useMemo(() => {
    if (!selectedPlan || !currentPrices) return null;
    
    const basePrice = currentPrices[selectedPlan];
    const childrenCount = parseInt(children) || 0;
    const adultsCount = parseInt(adults) || 0;
    
    const totalPersons = childrenCount + adultsCount;
    if (totalPersons === 0) return null;
    
    const total = basePrice * totalPersons;
    
    return { totalPersons, total };
  }, [selectedPlan, currentPrices, children, adults]);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getAvailableActivities = () => {
    return selectedDestination ? activities[selectedDestination] : [];
  };

  const handleDestinationChange = (e) => {
    setSelectedDestination(e.target.value);
    setSelectedActivity("");
    setSelectedPlan("");
    setSelectedEvent(null);
  };

  const handleActivityChange = (e) => {
    setSelectedActivity(e.target.value);
    if (selectedDestination === 'eventos') {
      const event = events.find(ev => ev.id === e.target.value);
      setSelectedEvent(event);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (selectedDestination === 'eventos' && selectedEvent) {
        const totalPersons = (parseInt(data.children) || 0) + (parseInt(data.adults) || 0);
        if (totalPersons > selectedEvent.cuposDisponibles) {
          toast.error(`Solo hay ${selectedEvent.cuposDisponibles} cupos disponibles`);
          return;
        }

        // Actualizar cupos del evento
        const cuposResponse = await fetch('/api/update-cupos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventId: selectedEvent.id,
            personas: totalPersons
          })
        });

        if (!cuposResponse.ok) {
          toast.error('Error al actualizar cupos del evento');
          return;
        }
      }

      const reservaData = {
        nombre: data.name,
        apellido: data.lastname,
        telefono: data.tel,
        email: data.email,
        destino: selectedDestination,
        actividad: selectedActivity,
        plan: selectedPlan,
        fecha: selectedDestination === 'eventos' && selectedEvent ? selectedEvent.date : data.date,
        ninos: parseInt(data.children) || 0,
        adultos: parseInt(data.adults) || 0,
        mayores: parseInt(data.seniors) || 0,
        observaciones: data.description || null,
        total: calculation?.total || 0
      };

      const { data: reserva, error } = await supabase
        .from('reservas')
        .insert([reservaData])
        .select();

      if (error) throw error;

      // Enviar email de confirmación al cliente
      await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          nombre: data.name,
          apellido: data.lastname,
          destino: selectedDestination,
          actividad: selectedActivity,
          plan: plans[selectedPlan].name,
          fecha: selectedDestination === 'eventos' && selectedEvent ? selectedEvent.date : data.date,
          total: calculation?.total || 0,
          ninos: parseInt(data.children) || 0,
          adultos: parseInt(data.adults) || 0,
          telefono: data.tel
        })
      });

      toast.success('¡Reserva enviada exitosamente!');
      setTimeout(() => {
        router.push('/confirmation');
      }, 1500);
    } catch (error) {
      console.error('Error al guardar reserva:', error);
      toast.error('Error al enviar la reserva. Intenta nuevamente.');
    }
  };

  const isFormComplete = selectedDestination && selectedActivity && selectedPlan && acceptTerms && acceptPrivacy;

  return (
    <>
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} type="terms" />
      <TermsModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} type="privacy" />
      
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
                  <input 
                    {...register("name", { 
                      required: "Nombre es requerido",
                      pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: "Solo se permiten letras" }
                    })}
                    className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.name && <span className="text-yellow-400 text-xs font-semibold">{errors.name.message}</span>}
                </div>
                <div className="flex-1">
                  <label htmlFor="lastname" className="block text-sm font-medium mb-1">Apellido</label>
                  <input 
                    {...register("lastname", { 
                      required: "Apellido es requerido",
                      pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: "Solo se permiten letras" }
                    })}
                    className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.lastname && <span className="text-yellow-400 text-xs font-semibold">{errors.lastname.message}</span>}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/5">
                  <label htmlFor="tel" className="block text-sm font-medium mb-1">Teléfono</label>
                  <input 
                    {...register("tel", { 
                      required: "Teléfono es requerido",
                      pattern: { value: /^[0-9]{10}$/, message: "Teléfono debe tener 10 dígitos" }
                    })}
                    className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.tel && <span className="text-yellow-400 text-xs font-semibold">{errors.tel.message}</span>}
                </div>
                <div className="flex-1">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Correo Electrónico</label>
                  <input 
                    {...register("email", { 
                      required: "Email es requerido",
                      pattern: { value: /^\S+@\S+$/i, message: "Email inválido" }
                    })}
                    className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.email && <span className="text-yellow-400 text-xs font-semibold">{errors.email.message}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="destination" className="block text-sm font-medium mb-1">Destino</label>
                <select 
                  value={selectedDestination} 
                  onChange={handleDestinationChange}
                  className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-yellow-400 [&>option]:bg-white [&>option]:text-gray-800 ${
                    selectedDestination ? 'bg-white text-black border-gray-300' : 'bg-gray-800/40 text-white border-gray-700'
                  }`}
                >
                  <option value="">Selecciona un destino</option>
                  <option value="chingaza">Parque Nacional Chingaza</option>
                  <option value="zoque">Sierra Nevada del Cocuy</option>
                  <option value="fotografico">Tour Fotográfico</option>
                  <option value="eventos">Eventos Programados</option>
                </select>
              </div>

              {selectedDestination && (
                <div>
                  <label htmlFor="activity" className="block text-sm font-medium mb-1">Actividad</label>
                  <select 
                    value={selectedActivity} 
                    onChange={handleActivityChange}
                    className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-yellow-400 [&>option]:bg-white [&>option]:text-gray-800 ${
                      selectedActivity ? 'bg-white text-black border-gray-300' : 'bg-gray-800/40 text-white border-gray-700'
                    }`}
                  >
                    <option value="">Selecciona una actividad</option>
                    {getAvailableActivities().map((activity) => (
                      <option key={activity.value} value={activity.value}>{activity.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedDestination === 'eventos' && selectedEvent && (
                <>
                  <div className="p-4 bg-yellow-400/10 border border-yellow-400 rounded-lg">
                    <h4 className="text-lg font-semibold text-yellow-400 mb-2">Evento: {selectedEvent.title}</h4>
                    <p className="text-white mb-2">
                      <strong>Fecha del evento:</strong> {new Date(selectedEvent.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-white">
                      <strong>Cupos disponibles:</strong> <span className="font-bold text-2xl">{selectedEvent.cuposDisponibles}</span> de {selectedEvent.totalCupos}
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      Selecciona el número de personas que no exceda los cupos disponibles
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-full max-w-md">
                      <label className="block text-sm font-medium mb-1 text-center">Fecha de Reserva (Automática)</label>
                      <input 
                        type="text"
                        value={new Date(selectedEvent.date).toLocaleDateString('es-CO')}
                        disabled
                        className="w-full px-4 py-2 rounded-md bg-gray-600 text-white border border-gray-500 text-center cursor-not-allowed"
                      />
                      <p className="text-gray-400 text-xs text-center mt-1">La fecha se establece automáticamente según el evento</p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="children" className="block text-sm font-medium mb-1">Niños o Estudiantes</label>
                  <input 
                    type="number" 
                    {...register("children", { min: 0 })}
                    className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="adults" className="block text-sm font-medium mb-1">Adultos</label>
                  <input 
                    type="number" 
                    {...register("adults", { min: 1 })}
                    className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="seniors" className="block text-sm font-medium mb-1">Mayores de 60</label>
                  <input 
                    type="number" 
                    {...register("seniors", { 
                      min: 0, 
                      validate: value => !value || parseInt(value) <= (parseInt(adults) || 0) || "No puede exceder el número de adultos"
                    })}
                    className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {selectedDestination !== 'eventos' && (
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <label className="block text-sm font-medium mb-1 text-center">Fecha de Reserva</label>
                    <div className="flex justify-center">
                      <Controller
                        control={control}
                        name="date"
                        rules={{ required: "Fecha es requerida" }}
                        render={({ field }) => (
                          <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona una fecha"
                            className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center"
                            wrapperClassName="w-full"
                          />
                        )}
                      />
                    </div>
                    {errors.date && <span className="text-yellow-400 text-sm font-semibold block text-center mt-1">{errors.date.message}</span>}
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Observaciones (máx. 120 caracteres)</label>
                <textarea 
                  {...register("description", { maxLength: 120 })}
                  rows="3"
                  className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none" 
                  placeholder="Cuéntanos sobre algo que debamos saber..."
                />
              </div>

              <div className="mt-8 mb-8 max-w-md mx-auto space-y-4">
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    {...register("acceptTerms", { required: true })}
                    className="mt-1 w-4 h-4 text-yellow-400 bg-gray-800/40 border-gray-700 rounded focus:ring-yellow-400 focus:ring-2"
                  />
                  <label className="text-sm text-white leading-relaxed">
                    Acepto los <span onClick={() => setShowTermsModal(true)} className="text-yellow-400 underline cursor-pointer hover:text-yellow-300">Términos y Condiciones</span> del servicio
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    {...register("acceptPrivacy", { required: true })}
                    className="mt-1 w-4 h-4 text-yellow-400 bg-gray-800/40 border-gray-700 rounded focus:ring-yellow-400 focus:ring-2"
                  />
                  <label className="text-sm text-white leading-relaxed">
                    Autorizo el tratamiento de mis datos personales conforme a la <span onClick={() => setShowPrivacyModal(true)} className="text-yellow-400 underline cursor-pointer hover:text-yellow-300">Política de Privacidad y Protección de Datos Personales</span>
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-8 text-center">Selecciona tu Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.values(plans).map((plan) => (
                    <div 
                      key={plan.id}
                      className={`relative bg-gray-800/40 rounded-xl border-2 cursor-pointer hover:border-yellow-400 transition-colors ${
                        selectedPlan === plan.id ? 'border-yellow-400' : 'border-gray-700'
                      }`} 
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.badge && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">{plan.badge}</span>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="text-center mb-4">
                          <h4 className="text-xl font-bold text-yellow-400 mb-2">{plan.name}</h4>
                          <p className="text-white text-sm">{plan.subtitle}</p>
                        </div>
                        {currentPrices && (
                          <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-white">${(plan.prices[selectedActivity] / 1000).toFixed(0)}K</div>
                            <div className="text-gray-300 text-sm">por persona</div>
                          </div>
                        )}
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-white">
                              <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPlan && currentPrices && (
                  <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400 rounded-lg">
                    <p className="text-center text-yellow-400 font-semibold">
                      Plan seleccionado: {plans[selectedPlan].name} - ${currentPrices[selectedPlan].toLocaleString()}
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
                  disabled={!isFormComplete}
                  className={`w-full px-4 py-2 rounded-md font-bold transition ${
                    isFormComplete
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
