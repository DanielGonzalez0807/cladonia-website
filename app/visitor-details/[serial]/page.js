'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useForm } from 'react-hook-form';
import Header from '@/app/_components/ui/Header';
import toast from 'react-hot-toast';

export default function VisitorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const serial = params.serial;
  
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState([]);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    async function loadReserva() {
      try {
        const { data, error } = await supabase
          .from('reservas')
          .select('*')
          .eq('link_registro', serial)
          .single();

        if (error || !data) {
          toast.error('Reserva no encontrada');
          return;
        }

        if (data.estado !== 'atendida') {
          toast.error('Esta reserva no está disponible para registro');
          return;
        }

        setReserva(data);
        
        // Inicializar visitantes según cantidades
        const visitantesArray = [];
        for (let i = 0; i < data.exentos; i++) {
          visitantesArray.push({ tipo: 'Exento (60+ años)', index: i });
        }
        for (let i = 0; i < data.estudiantes; i++) {
          visitantesArray.push({ tipo: 'Estudiante (5-25 años)', index: i });
        }
        for (let i = 0; i < data.adultos; i++) {
          visitantesArray.push({ tipo: 'Adulto (26-59 años)', index: i });
        }
        for (let i = 0; i < data.extranjeros; i++) {
          visitantesArray.push({ tipo: 'Extranjero', index: i });
        }
        
        setVisitors(visitantesArray);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar la reserva');
      } finally {
        setLoading(false);
      }
    }

    if (serial) {
      loadReserva();
    }
  }, [serial]);

  const onSubmit = async (data) => {
    try {
      const visitantesData = visitors.map((v, idx) => ({
        reserva_id: reserva.id,
        tipo_visitante: v.tipo,
        nombre: data[`nombre_${idx}`],
        apellido: data[`apellido_${idx}`],
        es_extranjero: data[`extranjero_${idx}`] === 'si',
        pais: data[`pais_${idx}`] || 'Colombia',
        tipo_documento: data[`tipo_doc_${idx}`],
        numero_documento: data[`num_doc_${idx}`],
        edad: parseInt(data[`edad_${idx}`])
      }));

      const { error } = await supabase
        .from('visitantes')
        .insert(visitantesData);

      if (error) throw error;

      toast.success('¡Datos guardados exitosamente!');
      setTimeout(() => router.push('/confirmation'), 2000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al guardar los datos');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Cargando...</p>
      </div>
    );
  }

  if (!reserva) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Reserva no encontrada</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 mb-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              📋 Recolección de Datos de Visitantes
            </h1>
            <p className="text-green-100 mb-2">
              <strong>RUR:</strong> {reserva.rur}
            </p>
            <p className="text-green-100">
              <strong>Total de visitantes:</strong> {reserva.total_personas}
            </p>
          </div>

          {/* Instrucciones */}
          <div className="bg-blue-500/10 border border-blue-400 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-blue-400 mb-3">
              ⚠️ Información Importante
            </h2>
            <p className="text-white text-sm leading-relaxed">
              Es <strong>obligatorio</strong> completar los datos de todos los visitantes para realizar el registro ante el seguro y la entrada al Parque Nacional Natural. Por favor, completa todos los campos con información precisa.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {visitors.map((visitor, idx) => (
              <div key={idx} className="bg-gray-800/60 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">
                  Visitante #{idx + 1} - {visitor.tipo}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Nombre *
                    </label>
                    <input
                      {...register(`nombre_${idx}`, { required: true })}
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Apellido *
                    </label>
                    <input
                      {...register(`apellido_${idx}`, { required: true })}
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      ¿Es extranjero? *
                    </label>
                    <select
                      {...register(`extranjero_${idx}`, { required: true })}
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="">Seleccionar</option>
                      <option value="no">No</option>
                      <option value="si">Sí</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      País *
                    </label>
                    <input
                      {...register(`pais_${idx}`, { required: true })}
                      defaultValue="Colombia"
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Tipo de Documento *
                    </label>
                    <select
                      {...register(`tipo_doc_${idx}`, { required: true })}
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="">Seleccionar</option>
                      <option value="CC">Cédula de Ciudadanía</option>
                      <option value="TI">Tarjeta de Identidad</option>
                      <option value="CE">Cédula de Extranjería</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Número de Documento *
                    </label>
                    <input
                      {...register(`num_doc_${idx}`, { required: true })}
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Edad *
                    </label>
                    <input
                      type="number"
                      {...register(`edad_${idx}`, { required: true, min: 1, max: 120 })}
                      className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-500 transition text-lg"
            >
              Confirmar y Enviar Datos
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
