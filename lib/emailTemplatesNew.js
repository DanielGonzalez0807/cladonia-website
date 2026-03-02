// EMAIL ADMIN: Confirmación de visitantes registrados con botón de confirmación
export function generateVisitorsConfirmationEmailWithButton(data) {
  const { rur, nombre, apellido, email, telefono, destino, fecha, visitantes } = data;
  
  const crypto = require('crypto');
  const token = crypto
    .createHash('sha256')
    .update(`${rur}-payment-${process.env.ADMIN_SECRET || 'default-secret'}`)
    .digest('hex');
  
  const confirmarPagoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/confirmar-pago`;

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
          
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">📋 Visitantes Registrados</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">ALMONTE by Cladonia S.A.S</p>
              <p style="color: #dbeafe; margin: 10px 0 0 0; font-size: 14px; font-weight: bold;">${rur}</p>
            </td>
          </tr>

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
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 8px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px;">👉 Acción Requerida</h3>
                    <p style="color: #ffffff; margin: 0 0 20px 0; font-size: 14px;">
                      Haz clic en el botón para confirmar el pago y enviar la factura con los documentos al cliente.
                    </p>
                    <a href="${confirmarPagoUrl}?rur=${encodeURIComponent(rur)}&amp;token=${token}" 
                       style="display: inline-block; background-color: #ffffff; color: #8b5cf6; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      ✅ Confirmar Pago y Enviar Documentos
                    </a>
                    <p style="color: #e9d5ff; margin: 15px 0 0 0; font-size: 12px;">
                      Esto cambiará el estado a "confirmada" y enviará el email final con factura y PDFs al cliente.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                <strong style="color: #3b82f6;">Cladonia Ecoturismo</strong> - Panel de Administración
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
