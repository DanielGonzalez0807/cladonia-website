import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateVisitorsConfirmationEmailWithButton } from '@/lib/emailTemplatesNew';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { reserva, visitantes } = await request.json();

    const emailData = {
      rur: reserva.rur,
      nombre: reserva.nombre,
      apellido: reserva.apellido,
      email: reserva.email,
      telefono: reserva.telefono,
      destino: reserva.destino,
      fecha: reserva.fecha,
      visitantes
    };

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: `📋 Visitantes Registrados - ${reserva.rur}`,
      html: generateVisitorsConfirmationEmailWithButton(emailData)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
