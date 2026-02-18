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
import { guideRates } from "@/data/guideRates";
import { topPlanDates } from "@/data/topPlanDates";
import TermsModal from "@/app/_components/ui/TermsModal";
import { supabase } from "@/lib/supabase";
import { useEvents } from "@/hooks/useEvents";
import { saveReservation, getFechaProgramadaId } from '@/lib/reservations';
import BasicPlan from "./plans/BasicPlan";
import TopPlan from "./plans/TopPlan";
import DynamicPlan from "./plans/DynamicPlan";

const EXPERIENCE_MAP = {
  'chingaza': 'chingaza',
  'cocuy': 'zoque',
  'fotografia': 'fotografico'
};

TopPlan
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
  const [selectedTopDate, setSelectedTopDate] = useState("");

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
      foreigners: 0,
      description: "",
      acceptTerms: false,
      acceptPrivacy: false
    }
  });

  const { children, adults, seniors, foreigners, acceptTerms, acceptPrivacy } = watch();
  const [vehicleCounts, setVehicleCounts] = useState({ car: 0, minibus: 0, bus: 0 });
  const [dynamicOptions, setDynamicOptions] = useState({
    includeTransport: false,
    selectedMeals: [],
    selectedGuide: null
  });

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
  }, [searchParams, events]);

  const calculation = useMemo(() => {
    if (!selectedPlan || !selectedActivity) return null;

    const childrenCount = parseInt(children) || 0;
    const adultsCount = parseInt(adults) || 0;
    const seniorsCount = parseInt(seniors) || 0;
    const foreignersCount = parseInt(foreigners) || 0;

    const totalPersons =
      childrenCount +
      adultsCount +
      seniorsCount +
      foreignersCount;

    if (totalPersons === 0) return null;

    let total = 0;

    // ==============================
    // PLAN BÁSICO
    // ==============================
    if (selectedPlan === "basic") {
      const rates = plans.basic.rates[selectedActivity];

      if (!rates) return null;

      total =
        childrenCount * rates.children +
        adultsCount * rates.adults +
        seniorsCount * rates.seniors +
        foreignersCount * rates.foreigners;
    }

    // ==============================
    // PLAN DINÁMICO
    // ==============================
    else if (selectedPlan === "dynamic") {
      const rates = plans.basic.rates[selectedActivity];

      if (!rates) return null;

      // 1️⃣ Base igual al plan básico
      total =
        childrenCount * rates.children +
        adultsCount * rates.adults +
        seniorsCount * rates.seniors +
        foreignersCount * rates.foreigners;

      // 2️⃣ Transporte (por persona)
      if (dynamicOptions?.includeTransport) {
        total += 50000 * totalPersons;
      }

      // 3️⃣ Comidas (por persona)
      const mealPrices = {
        breakfast: 15000,
        snack: 8000,
        lunch: 25000,
      };

      dynamicOptions?.selectedMeals?.forEach((mealId) => {
        if (mealPrices[mealId]) {
          total += mealPrices[mealId] * totalPersons;
        }
      });

      // 4️⃣ Guía especializado (precio fijo por grupo)
      const guidePrices = {
        photography: 100000,
        biology: 120000,
        bilingual: 150000,
      };

      if (dynamicOptions?.selectedGuide) {
        total += guidePrices[dynamicOptions.selectedGuide] || 0;
      }
    }

    // ==============================
    // PLAN TOP
    // ==============================
    else if (selectedPlan === "top") {
      const pricePerPerson =
        plans.top.prices[selectedActivity] || 0;

      total = pricePerPerson * totalPersons;
    }

    return { totalPersons, total };
  }, [
    selectedPlan,
    selectedActivity,
    children,
    adults,
    seniors,
    foreigners,
    dynamicOptions
  ]);

  
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

      const totalPersons = (parseInt(data.children) || 0) + (parseInt(data.adults) || 0) + (parseInt(data.seniors) || 0) + (parseInt(data.foreigners) || 0);

      // Preparar datos base
      const formData = {
        name: data.name,
        lastname: data.lastname,
        tel: data.tel,
        email: data.email,
        date: selectedPlan === 'top' ? selectedTopDate : data.date,
        children: data.children,
        adults: data.adults,
        seniors: data.seniors,
        foreigners: data.foreigners,
        description: data.description,
        selectedDestination,
        selectedActivity,
        selectedPlan,
        totalPrice: calculation?.total || 0,
        totalPersons
      };

      // Preparar detalles específicos según el plan
      let planDetails = {};

      if (selectedPlan === 'basic') {
        const childrenCount = parseInt(data.children) || 0;
        const adultsCount = parseInt(data.adults) || 0;
        const seniorsCount = parseInt(data.seniors) || 0;
        const foreignersCount = parseInt(data.foreigners) || 0;
        const totalVisitors = childrenCount + adultsCount + seniorsCount + foreignersCount;
        
        const parkEntryRates = { exempt: 0, student: 24500, adult: 29000, foreigner: 78500 };
        const insurancePerPerson = 10000;
        const guideRate = guideRates[selectedActivity] || 0;
        
        const costoEntradas = (seniorsCount * parkEntryRates.exempt) + 
                             (childrenCount * parkEntryRates.student) + 
                             (adultsCount * parkEntryRates.adult) + 
                             (foreignersCount * parkEntryRates.foreigner);
        
        const costoPolizas = totalVisitors * insurancePerPerson;
        const costoVehiculos = (vehicleCounts.car * 15000) + 
                              (vehicleCounts.minibus * 25000) + 
                              (vehicleCounts.bus * 40000);

        planDetails = {
          vehicleCounts,
          costoEntradas,
          costoPolizas,
          costoGuia: guideRate,
          costoVehiculos
        };
      } 
      else if (selectedPlan === 'top') {
        const fechaProgramadaId = await getFechaProgramadaId(selectedActivity, selectedTopDate);
        
        planDetails = {
          fechaProgramadaId,
          totalPersonas: totalPersons
        };
      } 
      else if (selectedPlan === 'dynamic') {
        const opcionesSeleccionadas = [];
        
        // Agregar transporte si está seleccionado
        if (dynamicOptions.includeTransport) {
          opcionesSeleccionadas.push({
            id: 'transport',
            cantidad: totalPersons,
            precioUnitario: 50000,
            precioTotal: 50000 * totalPersons
          });
        }
        
        // Agregar comidas seleccionadas
        const mealPrices = { breakfast: 15000, snack: 8000, lunch: 25000 };
        dynamicOptions.selectedMeals.forEach(mealId => {
          opcionesSeleccionadas.push({
            id: mealId,
            cantidad: totalPersons,
            precioUnitario: mealPrices[mealId],
            precioTotal: mealPrices[mealId] * totalPersons
          });
        });
        
        // Agregar guía especializado
        if (dynamicOptions.selectedGuide) {
          const guidePrices = { photography: 100000, biology: 120000, bilingual: 150000 };
          opcionesSeleccionadas.push({
            id: dynamicOptions.selectedGuide,
            cantidad: 1,
            precioUnitario: guidePrices[dynamicOptions.selectedGuide],
            precioTotal: guidePrices[dynamicOptions.selectedGuide]
          });
        }

        planDetails = {
          precioBase: calculation?.total || 0,
        };
      }

      // Guardar reserva en Supabase
      const result = await saveReservation(formData, planDetails);

      if (!result.success) {
        console.error('Error en saveReservation:', result.error);
        throw new Error(result.error);
      }

      // Preparar datos para el email
      const senderoNombre = activities['PNN CHINGAZA'].find(a => a.value === selectedActivity)?.label || selectedActivity;
      
      const emailData = {
        email: data.email,
        nombre: data.name,
        apellido: data.lastname,
        telefono: data.tel,
        destino: selectedDestination,
        sendero: senderoNombre,
        plan: selectedPlan,
        planNombre: plans[selectedPlan].name,
        fecha: formData.date,
        total: formData.totalPrice,
        estudiantes: parseInt(data.children) || 0,
        adultos: parseInt(data.adults) || 0,
        exentos: parseInt(data.seniors) || 0,
        extranjeros: parseInt(data.foreigners) || 0,
        planDetails: {}
      };

      // Agregar detalles específicos del plan para el email
      if (selectedPlan === 'basic') {
        const vehiculosTexto = [];
        if (vehicleCounts.car > 0) vehiculosTexto.push(`${vehicleCounts.car} automóvil(es)`);
        if (vehicleCounts.minibus > 0) vehiculosTexto.push(`${vehicleCounts.minibus} microbus(es)`);
        if (vehicleCounts.bus > 0) vehiculosTexto.push(`${vehicleCounts.bus} bus(es)`);
        
        emailData.planDetails = {
          costoEntradas: planDetails.costoEntradas,
          costoPolizas: planDetails.costoPolizas,
          costoGuia: planDetails.costoGuia,
          costoVehiculos: planDetails.costoVehiculos,
          vehiculos: vehiculosTexto.join(', ') || 'Ninguno',
          transporteIncluido: false
        };
      } else if (selectedPlan === 'top') {
        emailData.planDetails = {
          transporteIncluido: true
        };
      } else if (selectedPlan === 'dynamic') {
        const opcionesNombres = {
          transport: 'Transporte',
          breakfast: 'Desayuno',
          snack: 'Refrigerio',
          lunch: 'Almuerzo',
          photography: 'Guía Experto en Fotografía',
          biology: 'Guía Experto en Biología',
          bilingual: 'Guía Bilingüe'
        };
        
        const opcionesParaEmail = planDetails.opcionesSeleccionadas && planDetails.opcionesSeleccionadas.length > 0
          ? planDetails.opcionesSeleccionadas.map(op => ({
              nombre: opcionesNombres[op.id] || op.id,
              cantidad: op.cantidad,
              precioTotal: op.precioTotal
            }))
          : [];
        
        emailData.planDetails = {
          opciones: opcionesParaEmail,
          transporteIncluido: dynamicOptions.includeTransport
        };
      }

      // Enviar email de confirmación
      const emailResponse = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      const emailResult = await emailResponse.json();
      
      if (!emailResponse.ok) {
        console.error('Error al enviar email:', emailResult);
        toast.error('Reserva guardada pero hubo un error al enviar el email de confirmación');
      } else {
        console.log('Email enviado exitosamente:', emailResult);
      }

      toast.success('¡Reserva guardada exitosamente!');
      setTimeout(() => {
        router.push('/confirmation');
      }, 1500);
    } catch (error) {
      const errorMessage = error?.message || error?.toString() || 'Error desconocido';
      console.error('Error al guardar reserva:', errorMessage);
      console.error('Detalles del error:', error);
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const isFormComplete = selectedDestination && selectedActivity && selectedPlan && acceptTerms && acceptPrivacy;

  return (
    <>
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} type="terms" />
      <TermsModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} type="privacy" />
      
      {/* Sección del Formulario */}
      <section className="relative w-full min-h-screen overflow-hidden">
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
                  <label htmlFor="tel" className="block text-sm font-medium mb-1">Teléfono - WhatsApp</label>
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
                  <option value="PNN CHINGAZA">PNN CHINGAZA</option>
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

              {selectedDestination !== 'eventos' && selectedPlan !== 'top' && (
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <label className="block text-sm font-medium mb-1 text-center">Fecha de Reserva</label>
                    <div className="flex justify-center">
                      <Controller
                        control={control}
                        name="date"
                        rules={{ required: selectedPlan !== 'top' ? "Fecha es requerida" : false }}
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

              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">Tipo de Visitante</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Exentos - Primero */}
                  <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-600">
                    <label htmlFor="seniors" className="block text-sm font-bold mb-2">Exentos</label>
                    <input 
                      type="number" 
                      {...register("seniors", { 
                        min: { value: 0, message: "No puede ser negativo" },
                        valueAsNumber: true
                      })}
                      className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    {errors.seniors && <p className="text-red-400 text-xs mt-1">{errors.seniors.message}</p>}
                    <ul className="mt-3 text-xs text-gray-300 space-y-1">
                      <li>• Mayores de 60 años</li>
                      <li>• Entrada gratuita</li>
                      <li>• Presentar documento</li>
                    </ul>
                  </div>

                  {/* Estudiantes */}
                  <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-600">
                    <label htmlFor="children" className="block text-sm font-bold mb-2">Estudiantes</label>
                    <input 
                      type="number" 
                      {...register("children", { min: { value: 0, message: "No puede ser negativo" }, valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    {errors.children && <p className="text-red-400 text-xs mt-1">{errors.children.message}</p>}
                    <ul className="mt-3 text-xs text-gray-300 space-y-1">
                      <li>• 5 a 25 años</li>
                      <li>• Tarifa reducida</li>
                      <li>• Carné estudiantil</li>
                    </ul>
                  </div>

                  {/* Adultos */}
                  <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-600">
                    <label htmlFor="adults" className="block text-sm font-bold mb-2">Adultos</label>
                    <input 
                      type="number" 
                      {...register("adults", { min: { value: 0, message: "No puede ser negativo" }, valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    {errors.adults && <p className="text-red-400 text-xs mt-1">{errors.adults.message}</p>}
                    <ul className="mt-3 text-xs text-gray-300 space-y-1">
                      <li>• 26 a 59 años</li>
                      <li>• Tarifa general</li>
                      <li>• Documento de identidad</li>
                    </ul>
                  </div>

                  {/* Extranjeros */}
                  <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-600">
                    <label htmlFor="foreigners" className="block text-sm font-bold mb-2">Extranjeros</label>
                    <input 
                      type="number" 
                      {...register("foreigners", { 
                        min: { value: 0, message: "No puede ser negativo" },
                        valueAsNumber: true
                      })}
                      className="w-full px-4 py-2 rounded-md bg-gray-800/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    {errors.foreigners && <p className="text-red-400 text-xs mt-1">{errors.foreigners.message}</p>}
                    <ul className="mt-3 text-xs text-gray-300 space-y-1">
                      <li>• No residentes</li>
                      <li>• Tarifa especial</li>
                      <li>• Pasaporte requerido</li>
                    </ul>
                  </div>
                </div>
              </div>

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

              {/* Sección de Planes - Dentro del mismo formulario */}
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
                        {selectedActivity && plan.id === "top" && (
                          <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-white">
                              ${(plans.top.prices[selectedActivity] / 1000).toFixed(0)}K
                            </div>
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

                {selectedPlan && (
                  <>
                    {selectedPlan === 'basic' && (
                      <BasicPlan
                        plans={plans}
                        activities={activities}
                        selectedActivity={selectedActivity}
                        childrenCount={children}
                        adults={adults}
                        seniors={seniors}
                        foreigners={foreigners}
                        guideRates={guideRates}
                        vehicleCounts={vehicleCounts}
                        setVehicleCounts={setVehicleCounts}
                        formatPrice={formatPrice}
                        watch={watch}
                      />
                    )}
                    
                    {selectedPlan === 'top' && (
                      <TopPlan
                        plans={plans}
                        activities={activities}
                        selectedActivity={selectedActivity}
                        topPlanDates={topPlanDates}
                        selectedTopDate={selectedTopDate}
                        setSelectedTopDate={setSelectedTopDate}
                        calculation={calculation}
                        formatPrice={formatPrice}
                        watch={watch}
                      />
                    )}
                    
                    {selectedPlan === 'dynamic' && (
                      <DynamicPlan
                        plans={plans}
                        activities={activities}
                        selectedActivity={selectedActivity}
                        selectedPlan={selectedPlan}
                        childrenCount={children}
                        adults={adults}
                        seniors={seniors}
                        foreigners={foreigners}
                        formatPrice={formatPrice}
                        watch={watch}
                        onOptionsChange={setDynamicOptions}
                      />
                    )}
                  </>
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
