import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { generateRegistrationEmail } from '@/lib/emailTemplates';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { rur, token } = await request.json();

    // Validar token
    const expectedToken = crypto
      .createHash('sha256')
      .update(`${rur}-${process.env.ADMIN_SECRET}`)
      .digest('hex');

    if (token !== expectedToken) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    // Buscar reserva
    const { data: reserva, error: fetchError } = await supabase
      .from('reservas')
      .select('*')
      .eq('rur', rur)
      .single();

    if (fetchError || !reserva) {
      return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 });
    }

    if (reserva.estado !== 'pendiente') {
      return NextResponse.json({ error: `Reserva ya está en estado: ${reserva.estado}` }, { status: 400 });
    }

    // Generar serial único
    const serial = crypto.randomBytes(16).toString('hex');
    const linkRegistro = `${process.env.NEXT_PUBLIC_BASE_URL}/visitor-details/${serial}`;

    // Actualizar estado
    const { error: updateError } = await supabase
      .from('reservas')
      .update({
        estado: 'atendida',
        fecha_atendida: new Date().toISOString(),
        link_registro: serial
      })
      .eq('id', reserva.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Enviar email
    const emailData = {
      nombre: reserva.nombre,
      apellido: reserva.apellido,
      rur: reserva.rur,
      linkRegistro: linkRegistro,
      total: reserva.total_precio,
      fecha: reserva.fecha
    };

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: reserva.email,
      subject: `✅ Reserva Atendida - ${rur} - Completa tu registro`,
      html: generateRegistrationEmail(emailData)
    });

    return NextResponse.json({ success: true, linkRegistro });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
