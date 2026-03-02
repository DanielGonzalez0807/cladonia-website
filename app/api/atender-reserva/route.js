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
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reserva Atendida</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #10b981 0%, #059669 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 60px 40px; border-radius: 16px; max-width: 600px; margin: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); text-align: center;">
          <div style="width: 80px; height: 80px; background: #10b981; border-radius: 50%; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center;">
            <svg style="width: 50px; height: 50px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 style="color: #1f2937; margin: 0 0 15px 0; font-size: 32px; font-weight: 700;">Reserva Atendida</h1>
          <p style="color: #6b7280; font-size: 16px; margin: 0 0 40px 0; line-height: 1.6;">El estado de la reserva ha sido actualizado exitosamente</p>
          
          <div style="background: #f3f4f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
            <div style="margin-bottom: 15px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">Código de Reserva</p>
              <p style="color: #10b981; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: 1px;">${rur}</p>
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0;">Estado actualizado a:</p>
              <p style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0;">Atendida</p>
            </div>
          </div>
          
          <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; text-align: left; margin-bottom: 30px;">
            <p style="color: #1e40af; margin: 0; font-size: 14px; line-height: 1.6;">
              <strong>✓ Email enviado</strong> al cliente: ${reserva.email}<br>
              <strong>✓ Link de registro</strong> generado correctamente
            </p>
          </div>
          
          <p style="color: #9ca3af; font-size: 13px; margin: 0;">ALMONTE by Cladonia S.A.S</p>
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
