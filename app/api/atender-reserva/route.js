import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { generateRegistrationEmail } from '@/lib/emailTemplates';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rur = searchParams.get('rur');
    const token = searchParams.get('token');

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

    console.log('Intentando actualizar reserva:', {
      id: reserva.id,
      serial,
      estado_actual: reserva.estado
    });

    // Actualizar estado
    const { data: updatedData, error: updateError } = await supabase
      .from('reservas')
      .update({
        estado: 'atendida',
        fecha_atendida: new Date().toISOString(),
        link_registro: serial
      })
      .eq('id', reserva.id)
      .select();

    console.log('Resultado del update:', { updatedData, updateError });

    if (updateError) {
      console.error('Error al actualizar:', updateError);
      return new Response(`
        <html>
          <body style="font-family: Arial; padding: 40px; text-align: center;">
            <h1 style="color: red;">❌ Error</h1>
            <p>${updateError.message}</p>
            <pre>${JSON.stringify(updateError, null, 2)}</pre>
          </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    // Enviar email
    const emailData = {
      nombre: reserva.nombre,
      apellido: reserva.apellido,
      rur: reserva.rur,
      linkRegistro: linkRegistro,
      total: reserva.total_precio,
      fecha: reserva.fecha,
      destino: reserva.destino,
      sendero: reserva.sendero_id,
      plan: reserva.plan_id
    };

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: reserva.email,
      subject: `✅ Reserva Atendida - ${rur} - Completa tu registro`,
      html: generateRegistrationEmail(emailData)
    });

    return new Response(`
      <html>
        <body style="font-family: Arial; padding: 40px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
          <div style="background: white; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #10b981; margin-bottom: 20px;">✅ Reserva Atendida</h1>
            <p style="font-size: 18px; color: #374151; margin-bottom: 10px;"><strong>RUR:</strong> ${rur}</p>
            <p style="font-size: 16px; color: #6b7280; margin-bottom: 20px;">Email enviado a: ${reserva.email}</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p style="color: #374151; margin: 0;"><strong>Link de registro:</strong></p>
              <p style="color: #059669; word-break: break-all; margin: 10px 0 0 0;">${linkRegistro}</p>
            </div>
          </div>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    return new Response(`
      <html>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1 style="color: red;">❌ Error</h1>
          <p>${error.message}</p>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  }
}
