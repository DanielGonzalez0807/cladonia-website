import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, nombre, apellido, destino, actividad, plan, fecha, total, ninos, adultos, telefono } = body;

    // Email al cliente
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: '✅ Confirmación de Reserva - Cladonia Ecoturismo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #EAB308;">¡Reserva Confirmada!</h1>
          
          <p>Hola <strong>${nombre} ${apellido}</strong>,</p>
          
          <p>Tu reserva ha sido recibida exitosamente. A continuación los detalles:</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Detalles de la Reserva</h3>
            <p><strong>Destino:</strong> ${destino}</p>
            <p><strong>Actividad:</strong> ${actividad}</p>
            <p><strong>Plan:</strong> ${plan}</p>
            <p><strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString('es-CO')}</p>
            <p><strong>Personas:</strong> ${adultos} adultos${ninos > 0 ? `, ${ninos} niños` : ''}</p>
            <p><strong>Total:</strong> ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total)}</p>
          </div>
          
          <p>Nos pondremos en contacto contigo pronto para confirmar los detalles finales.</p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Gracias por elegir Cladonia Ecoturismo<br>
            <a href="mailto:${process.env.EMAIL_FROM}" style="color: #EAB308;">Contáctanos</a>
          </p>
        </div>
      `
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    // Email al administrador
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: '🔔 Nueva Reserva Recibida',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #EAB308;">Nueva Reserva</h1>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Datos del Cliente</h3>
            <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Detalles de la Reserva</h3>
            <p><strong>Destino:</strong> ${destino}</p>
            <p><strong>Actividad:</strong> ${actividad}</p>
            <p><strong>Plan:</strong> ${plan}</p>
            <p><strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString('es-CO')}</p>
            <p><strong>Personas:</strong> ${adultos} adultos${ninos > 0 ? `, ${ninos} niños` : ''}</p>
            <p><strong>Total:</strong> ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total)}</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
