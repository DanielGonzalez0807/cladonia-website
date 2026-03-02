import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { generatePaymentInstructionsEmail } from '@/lib/emailTemplatesNew';
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
      .update(`${rur}-payment-${process.env.ADMIN_SECRET}`)
      .digest('hex');

    if (token !== expectedToken) {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center;">
          <div style="background: white; padding: 60px 40px; border-radius: 16px; max-width: 600px; margin: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); text-align: center;">
            <h1 style="color: #dc2626; margin: 0 0 15px 0; font-size: 32px;">❌ Token Inválido</h1>
            <p style="color: #6b7280; font-size: 16px;">El enlace no es válido o ha expirado.</p>
          </div>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    // Buscar reserva
    const { data: reserva, error: fetchError } = await supabase
      .from('reservas')
      .select('*')
      .eq('rur', rur)
      .single();

    if (fetchError || !reserva) {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Error</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial; background: #dc2626; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
          <div style="background: white; padding: 60px 40px; border-radius: 16px; max-width: 600px; text-align: center;">
            <h1 style="color: #dc2626;">❌ Reserva no encontrada</h1>
          </div>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    if (reserva.estado !== 'atendida') {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Error</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial; background: #f59e0b; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
          <div style="background: white; padding: 60px 40px; border-radius: 16px; max-width: 600px; text-align: center;">
            <h1 style="color: #f59e0b;">⚠️ Estado Incorrecto</h1>
            <p style="color: #6b7280;">La reserva está en estado: <strong>${reserva.estado}</strong></p>
            <p style="color: #6b7280; font-size: 14px;">Solo se pueden enviar instrucciones de pago a reservas en estado "atendida"</p>
          </div>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    // Actualizar estado a confirmada (datos recibidos, pendiente de pago)
    const { error: updateError } = await supabase
      .from('reservas')
      .update({
        estado: 'confirmada',
        fecha_confirmada: new Date().toISOString()
      })
      .eq('id', reserva.id);

    if (updateError) {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Error</title></head>
        <body style="margin: 0; padding: 0; font-family: Arial; background: #dc2626; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
          <div style="background: white; padding: 60px 40px; border-radius: 16px; max-width: 600px; text-align: center;">
            <h1 style="color: #dc2626;">❌ Error al actualizar</h1>
            <p>${updateError.message}</p>
          </div>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    // Enviar email con instrucciones de pago
    const emailData = {
      nombre: reserva.nombre,
      apellido: reserva.apellido,
      rur: reserva.rur,
      total: reserva.total_precio,
      fecha: reserva.fecha,
      destino: reserva.destino
    };

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: reserva.email,
      subject: `💳 Instrucciones de Pago - ${rur}`,
      html: generatePaymentInstructionsEmail(emailData)
    });

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pago Confirmado</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 60px 40px; border-radius: 16px; max-width: 600px; margin: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); text-align: center;">
          <div style="width: 80px; height: 80px; background: #8b5cf6; border-radius: 50%; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center;">
            <svg style="width: 50px; height: 50px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 style="color: #1f2937; margin: 0 0 15px 0; font-size: 32px; font-weight: 700;">Instrucciones Enviadas</h1>
          <p style="color: #6b7280; font-size: 16px; margin: 0 0 40px 0; line-height: 1.6;">Las instrucciones de pago han sido enviadas al cliente</p>
          
          <div style="background: #f3f4f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
            <div style="margin-bottom: 15px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">Código de Reserva</p>
              <p style="color: #8b5cf6; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: 1px;">${rur}</p>
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0;">Estado actualizado a:</p>
              <p style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0;">Confirmada</p>
            </div>
          </div>
          
          <div style="background: #dcfce7; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; text-align: left; margin-bottom: 30px;">
            <p style="color: #15803d; margin: 0; font-size: 14px; line-height: 1.6;">
              <strong>✓ Email enviado</strong> al cliente: ${reserva.email}<br>
              <strong>✓ Instrucciones de pago</strong> incluidas en el correo<br>
              <strong>✓ Estado</strong> actualizado a confirmada (pendiente de pago)
            </p>
          </div>
          
          <p style="color: #9ca3af; font-size: 13px; margin: 0;">ALMONTE by Cladonia S.A.S</p>
        </div>
      </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"><title>Error</title></head>
      <body style="margin: 0; padding: 0; font-family: Arial; background: #dc2626; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 60px 40px; border-radius: 16px; max-width: 600px; text-align: center;">
          <h1 style="color: #dc2626;">❌ Error</h1>
          <p>${error.message}</p>
        </div>
      </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  }
}
