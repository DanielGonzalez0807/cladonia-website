import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { generateInvoiceEmail } from '@/lib/emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { rur, montoPagado, metodoPago, referenciaPago } = await request.json();

    // Buscar reserva
    const { data: reserva, error: fetchError } = await supabase
      .from('reservas')
      .select('*')
      .eq('rur', rur)
      .single();

    if (fetchError || !reserva) {
      return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 });
    }

    if (reserva.estado !== 'atendida') {
      return NextResponse.json({ error: `Reserva debe estar en estado atendida` }, { status: 400 });
    }

    // Actualizar a confirmada
    const { error: updateError } = await supabase
      .from('reservas')
      .update({
        estado: 'confirmada',
        fecha_confirmada: new Date().toISOString(),
        pago_verificado: true,
        monto_pagado: montoPagado,
        metodo_pago: metodoPago,
        referencia_pago: referenciaPago
      })
      .eq('id', reserva.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Enviar email con factura
    const emailData = {
      nombre: reserva.nombre,
      apellido: reserva.apellido,
      rur: reserva.rur,
      total: reserva.total_precio,
      montoPagado,
      metodoPago,
      referenciaPago,
      fecha: reserva.fecha
    };

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: reserva.email,
      subject: `🎉 Reserva Confirmada - ${rur} - Factura y Detalles`,
      html: generateInvoiceEmail(emailData)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
