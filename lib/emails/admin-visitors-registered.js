/**
 * Email al admin: listado de visitantes registrados (sin botón).
 * Solo informativo; para acción con botón ver admin-visitors-with-button.js
 */
import { EmailHeader, EmailFooter } from './components';

export function generateVisitorsConfirmationEmail(data) {
  const { rur, nombre, apellido, email, telefono, destino, fecha, visitantes } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          ${EmailHeader({ title: '📋 Visitantes Registrados', rur, theme: 'blue' })}

          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">Información del Cliente</h2>
              <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="color: #6b7280; font-size: 14px; width: 30%;">Cliente:</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${nombre} ${apellido}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px;">Email:</td>
                  <td style="color: #1f2937; font-size: 14px;">${email}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px;">Teléfono:</td>
                  <td style="color: #1f2937; font-size: 14px;">${telefono}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px;">Destino:</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${destino}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px;">Fecha:</td>
                  <td style="color: #1f2937; font-size: 14px;">${new Date(fecha).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
              </table>

              <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px;">Listado de Visitantes (${visitantes.length})</h2>
              <table width="100%" cellpadding="10" cellspacing="0" style="border: 1px solid #e5e7eb; border-collapse: collapse;">
                <tr style="background-color: #3b82f6;">
                  <th style="text-align: left; padding: 12px; color: #ffffff; font-size: 13px; border: 1px solid #2563eb;">#</th>
                  <th style="text-align: left; padding: 12px; color: #ffffff; font-size: 13px; border: 1px solid #2563eb;">Nombre Completo</th>
                  <th style="text-align: left; padding: 12px; color: #ffffff; font-size: 13px; border: 1px solid #2563eb;">Tipo</th>
                  <th style="text-align: left; padding: 12px; color: #ffffff; font-size: 13px; border: 1px solid #2563eb;">Documento</th>
                  <th style="text-align: center; padding: 12px; color: #ffffff; font-size: 13px; border: 1px solid #2563eb;">Edad</th>
                  <th style="text-align: left; padding: 12px; color: #ffffff; font-size: 13px; border: 1px solid #2563eb;">País</th>
                </tr>
                ${visitantes.map((v, idx) => `
                <tr style="${idx % 2 === 0 ? 'background-color: #f9fafb;' : 'background-color: #ffffff;'}">
                  <td style="padding: 10px; color: #1f2937; font-size: 13px; border: 1px solid #e5e7eb;">${idx + 1}</td>
                  <td style="padding: 10px; color: #1f2937; font-size: 13px; font-weight: bold; border: 1px solid #e5e7eb;">${v.nombre} ${v.apellido}</td>
                  <td style="padding: 10px; color: #6b7280; font-size: 12px; border: 1px solid #e5e7eb;">${v.tipo_visitante}</td>
                  <td style="padding: 10px; color: #1f2937; font-size: 13px; border: 1px solid #e5e7eb;">${v.tipo_documento}: ${v.numero_documento}</td>
                  <td style="text-align: center; padding: 10px; color: #1f2937; font-size: 13px; border: 1px solid #e5e7eb;">${v.edad}</td>
                  <td style="padding: 10px; color: #1f2937; font-size: 13px; border: 1px solid #e5e7eb;">${v.pais}${v.es_extranjero ? ' 🌍' : ''}</td>
                </tr>
                `).join('')}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #EAB308;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">⚠️ Próximo Paso</h3>
                    <p style="color: #78350f; margin: 0; font-size: 14px; line-height: 1.6;">
                      Verifica el pago del cliente y confirma la reserva para enviar la factura y documentos finales.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${EmailFooter({ accentColor: '#3b82f6', secondLine: 'Panel de Administración' })}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
