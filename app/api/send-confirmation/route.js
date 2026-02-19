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
      plan, 
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

    const totalVisitantes = (estudiantes || 0) + (adultos || 0) + (exentos || 0) + (extranjeros || 0);

    const emailData = {
      nombre,
      apellido,
      email,
      telefono,
      destino,
      sendero,
      plan: planNombre,
      fecha,
      visitantes: {
        exentos: exentos || 0,
        estudiantes: estudiantes || 0,
        adultos: adultos || 0,
        extranjeros: extranjeros || 0,
        total: totalVisitantes
      },
      total,
      planDetails
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
