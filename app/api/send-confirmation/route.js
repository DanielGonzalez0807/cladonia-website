import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { generateClientEmail, generateAdminEmail } from '@/lib/emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    
    const {
      email,
      nombre,
      apellido,
      destino,
      sendero,
      plan, // could be 'basic' | 'top' | 'dynamic' or human name
      planNombre,
      fecha,
      total,
      estudiantes,
      adultos,
      exentos,
      extranjeros,
      telefono,
      planDetails
    } = body;

    // Normalize plan name (prefer explicit planNombre, fallback to id)
    const planName = planNombre || (plan === 'basic' ? 'Plan Básico' : plan === 'top' ? 'Plan Top' : plan === 'dynamic' ? 'Plan Dinámico' : (plan || 'Plan'));

    // Normalize planDetails to support different payload shapes from the form
    const normalizedPlanDetails = planDetails ? { ...planDetails } : {};

    // Support opcionesSeleccionadas -> opciones and viceversa
    if (normalizedPlanDetails.opcionesSeleccionadas && !normalizedPlanDetails.opciones) {
      normalizedPlanDetails.opciones = normalizedPlanDetails.opcionesSeleccionadas.map(op => ({
        id: op.id || op.nombre || op.name,
        nombre: op.nombre || op.name || op.id,
        cantidad: op.cantidad || op.quantity || 1,
        precioTotal: op.precioTotal || op.totalPrice || op.priceTotal || (op.precioUnitario && op.cantidad ? op.precioUnitario * op.cantidad : 0),
      }));
    }
    if (normalizedPlanDetails.opciones && !normalizedPlanDetails.opcionesSeleccionadas) {
      normalizedPlanDetails.opcionesSeleccionadas = normalizedPlanDetails.opciones.map(op => ({
        id: op.id || op.nombre || op.name,
        nombre: op.nombre || op.name || op.id,
        cantidad: op.cantidad || op.quantity || 1,
        precioTotal: op.precioTotal || op.totalPrice || op.priceTotal || (op.precioUnitario && op.cantidad ? op.precioUnitario * op.cantidad : 0),
      }));
    }

    // Infer transporte included from flags or options
    const transporteIncluded = Boolean(
      normalizedPlanDetails.transporteIncluido ||
      normalizedPlanDetails.transporteIncluded ||
      normalizedPlanDetails.includeTransport ||
      (normalizedPlanDetails.opciones && normalizedPlanDetails.opciones.some(o => (o.id || '').toString().toLowerCase().includes('transport')))
    );
    normalizedPlanDetails.transporteIncluido = transporteIncluded;

    // Support vehicleCounts shape for Plan Básico
    if (normalizedPlanDetails.vehicleCounts && !normalizedPlanDetails.vehiculos) {
      normalizedPlanDetails.vehiculos = null; // template will format via helper if provided
    }

    const totalVisitantes = (estudiantes || 0) + (adultos || 0) + (exentos || 0) + (extranjeros || 0);

    const emailData = {
      nombre,
      apellido,
      email,
      telefono,
      destino,
      sendero,
      plan: planName,
      fecha,
      visitantes: {
        exentos: exentos || 0,
        estudiantes: estudiantes || 0,
        adultos: adultos || 0,
        extranjeros: extranjeros || 0,
        total: totalVisitantes
      },
      total,
      planDetails: normalizedPlanDetails
    };

    // Email al cliente
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: '✅ Pre-reserva exitosa - ALMONTE by Cladonia S.A.S',
      html: generateClientEmail(emailData)
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    // Email al administrador
    const adminResult = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: '🔔 Nueva Reserva Recibida',
      html: generateAdminEmail(emailData)
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
