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
                      Haz clic en el botón para enviar las instrucciones de pago al cliente.
                    </p>
                    <a href="${confirmarPagoUrl}?rur=${encodeURIComponent(rur)}&amp;token=${token}" 
                       style="display: inline-block; background-color: #ffffff; color: #8b5cf6; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      💳 Enviar Instrucciones de Pago
                    </a>
                    <p style="color: #e9d5ff; margin: 15px 0 0 0; font-size: 12px;">
                      Esto cambiará el estado a "confirmada" y enviará el email con información de pago al cliente.
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


// EMAIL: Instrucciones de pago
export function generatePaymentInstructionsEmail(data) {
  const { nombre, apellido, rur, total, fecha, destino } = data;

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
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">💳 Instrucciones de Pago</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">ALMONTE by Cladonia S.A.S</p>
              <p style="color: #e9d5ff; margin: 10px 0 0 0; font-size: 14px; font-weight: bold;">${rur}</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">
                Hola <strong>${nombre} ${apellido}</strong>,
              </p>
              <p style="font-size: 14px; color: #6b7280; margin: 0 0 30px 0;">
                ¡Excelente! Hemos recibido todos los datos de los visitantes. A continuación encontrarás la información para realizar el pago de tu reserva.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #EAB308 0%, #F59E0B 100%); border-radius: 8px;">
                <tr>
                  <td style="padding: 25px; text-align: center;">
                    <p style="color: #ffffff; margin: 0 0 5px 0; font-size: 16px;">Total a Pagar</p>
                    <p style="color: #ffffff; margin: 0; font-size: 36px; font-weight: bold;">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #8b5cf6; margin: 0 0 15px 0; font-size: 18px;">💰 Métodos de Pago</h3>
                    
                    <div style="margin-bottom: 20px; padding: 15px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <h4 style="color: #1f2937; margin: 0 0 10px 0; font-size: 16px;">Transferencia Bancaria</h4>
                      <table width="100%" cellpadding="5" cellspacing="0">
                        <tr>
                          <td style="color: #6b7280; font-size: 14px; width: 40%;">Banco:</td>
                          <td style="color: #1f2937; font-size: 14px; font-weight: bold;">Bancolombia</td>
                        </tr>
                        <tr>
                          <td style="color: #6b7280; font-size: 14px;">Tipo de cuenta:</td>
                          <td style="color: #1f2937; font-size: 14px; font-weight: bold;">Ahorros</td>
                        </tr>
                        <tr>
                          <td style="color: #6b7280; font-size: 14px;">Número de cuenta:</td>
                          <td style="color: #1f2937; font-size: 14px; font-weight: bold;">XXXX-XXXX-XXXX</td>
                        </tr>
                        <tr>
                          <td style="color: #6b7280; font-size: 14px;">Titular:</td>
                          <td style="color: #1f2937; font-size: 14px; font-weight: bold;">ALMONTE by Cladonia S.A.S</td>
                        </tr>
                      </table>
                    </div>

                    <div style="margin-bottom: 20px; padding: 15px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <h4 style="color: #1f2937; margin: 0 0 10px 0; font-size: 16px;">Nequi</h4>
                      <p style="color: #1f2937; font-size: 14px; margin: 0;"><strong>Número:</strong> XXX-XXX-XXXX</p>
                    </div>

                    <div style="padding: 15px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <h4 style="color: #1f2937; margin: 0 0 10px 0; font-size: 16px;">Daviplata</h4>
                      <p style="color: #1f2937; font-size: 14px; margin: 0;"><strong>Número:</strong> XXX-XXX-XXXX</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #EAB308;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">⚠️ Importante</h3>
                    <p style="color: #78350f; margin: 0; font-size: 14px; line-height: 1.6;">
                      • Envía el comprobante de pago a <strong>${process.env.EMAIL_FROM}</strong><br>
                      • Incluye tu código de reserva <strong>${rur}</strong> en el asunto<br>
                      • Una vez verificado el pago, recibirás la confirmación final con todos los documentos
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dbeafe; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">📋 Resumen de tu Reserva</h3>
                    <p style="color: #1e3a8a; margin: 0; font-size: 14px; line-height: 1.6;">
                      <strong>Destino:</strong> ${destino}<br>
                      <strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>
                      <strong>Código:</strong> ${rur}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                Gracias por elegir <strong style="color: #8b5cf6;">Cladonia Ecoturismo</strong>
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                Si tienes alguna pregunta, contáctanos a <a href="mailto:${process.env.EMAIL_FROM}" style="color: #8b5cf6; text-decoration: none;">${process.env.EMAIL_FROM}</a>
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
