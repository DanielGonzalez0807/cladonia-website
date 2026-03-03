/**
 * Email al cliente: instrucciones de pago (transferencia, Nequi, Daviplata).
 */
import { formatPrice } from './shared';
import { EmailHeader, EmailFooter } from './components';

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
          
          ${EmailHeader({ title: '💳 Instrucciones de Pago', rur, theme: 'purple' })}

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
                    <p style="color: #ffffff; margin: 0; font-size: 36px; font-weight: bold;">${formatPrice(total)}</p>
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

          ${EmailFooter({ accentColor: '#8b5cf6' })}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
