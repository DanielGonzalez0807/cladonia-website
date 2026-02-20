export function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price);
}

export function generateClientEmail(data) {
  const { nombre, apellido, destino, sendero, plan, fecha, visitantes, total, planDetails, descripcion } = data;

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
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #EAB308; margin: 0; font-size: 28px;">¡Reserva Confirmada!</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">ALMONTE by Cladonia S.A.S</p>
            </td>
          </tr>

          <!-- Saludo -->
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">
                Hola <strong>${nombre} ${apellido}</strong>,
              </p>
              <p style="font-size: 14px; color: #6b7280; margin: 0 0 30px 0;">
                Tu reserva ha sido recibida exitosamente. A continuación encontrarás todos los detalles de tu experiencia en <strong>${destino}</strong>.
              </p>
            </td>
          </tr>

          <!-- Información General -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #EAB308; margin: 0 0 15px 0; font-size: 18px;"> Información General</h3>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; width: 40%;">Destino:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${destino}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Sendero:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${sendero}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Plan:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${plan}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Fecha:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${new Date(fecha).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Visitantes -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #EAB308; margin: 0 0 15px 0; font-size: 18px;">Visitantes</h3>
                    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                      <tr style="background-color: #e5e7eb;">
                        <th style="text-align: left; padding: 10px; color: #374151; font-size: 13px;">Tipo</th>
                        <th style="text-align: center; padding: 10px; color: #374151; font-size: 13px;">Cantidad</th>
                      </tr>
                      ${visitantes.exentos > 0 ? `
                      <tr>
                        <td style="padding: 10px; color: #1f2937; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Exentos (60+ años)</td>
                        <td style="text-align: center; padding: 10px; color: #1f2937; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">${visitantes.exentos}</td>
                      </tr>` : ''}
                      ${visitantes.estudiantes > 0 ? `
                      <tr>
                        <td style="padding: 10px; color: #1f2937; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Estudiantes (5-25 años)</td>
                        <td style="text-align: center; padding: 10px; color: #1f2937; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">${visitantes.estudiantes}</td>
                      </tr>` : ''}
                      ${visitantes.adultos > 0 ? `
                      <tr>
                        <td style="padding: 10px; color: #1f2937; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Adultos (26-59 años)</td>
                        <td style="text-align: center; padding: 10px; color: #1f2937; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">${visitantes.adultos}</td>
                      </tr>` : ''}
                      ${visitantes.extranjeros > 0 ? `
                      <tr>
                        <td style="padding: 10px; color: #1f2937; font-size: 14px; border-bottom: 1px solid #e5e7eb;">Extranjeros</td>
                        <td style="text-align: center; padding: 10px; color: #1f2937; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">${visitantes.extranjeros}</td>
                      </tr>` : ''}
                      <tr style="background-color: #fef3c7;">
                        <td style="padding: 12px; color: #92400e; font-size: 14px; font-weight: bold;">Total Visitantes</td>
                        <td style="text-align: center; padding: 12px; color: #92400e; font-size: 16px; font-weight: bold;">${visitantes.total}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${descripcion ? `
          <!-- Observaciones -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #EAB308;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">Observaciones</h3>
                    <p style="color: #78350f; margin: 0; font-size: 14px; line-height: 1.6;">${descripcion}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          ${generatePlanDetailsHTML(plan, planDetails)}

          <!-- Total -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
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

          <!-- Próximos Pasos -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dbeafe; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">Próximos Pasos</h3>
                    <p style="color: #1e3a8a; margin: 0; font-size: 14px; line-height: 1.6;">
                      • Nos pondremos en contacto contigo en las próximas 24 horas<br>
                      • Confirmaremos los detalles finales de tu reserva<br>
                      • Te enviaremos las instrucciones para el día de la actividad
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                Gracias por elegir <strong style="color: #EAB308;">Cladonia Ecoturismo</strong>
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                Si tienes alguna pregunta, contáctanos a <a href="mailto:${process.env.EMAIL_FROM}" style="color: #EAB308; text-decoration: none;">${process.env.EMAIL_FROM}</a>
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

function generatePlanDetailsHTML(planId, details) {
  if (planId === 'Plan Básico') {
    return `
    <!-- Detalles Plan Básico -->
    <tr>
      <td style="padding: 0 30px 20px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
          <tr>
            <td style="padding: 20px;">
              <h3 style="color: #EAB308; margin: 0 0 15px 0; font-size: 18px;">Desglose Plan Básico</h3>
              <table width="100%" cellpadding="8" cellspacing="0">
                <tr>
                  <td style="color: #6b7280; font-size: 14px;">Entradas al parque</td>
                  <td style="text-align: right; color: #1f2937; font-size: 14px; font-weight: bold;">${formatPrice(details.costoEntradas)}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px;">Pólizas de seguro</td>
                  <td style="text-align: right; color: #1f2937; font-size: 14px; font-weight: bold;">${formatPrice(details.costoPolizas)}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px;">Guía</td>
                  <td style="text-align: right; color: #1f2937; font-size: 14px; font-weight: bold;">${formatPrice(details.costoGuia)}</td>
                </tr>
                ${((details.costoVehiculos && details.costoVehiculos > 0) || (details.vehicleCounts)) ? `
                <tr>
                  <td style="color: #6b7280; font-size: 14px;">Vehículos (${details.vehiculos || formatVehicleCounts(details.vehicleCounts)})</td>
                  <td style="text-align: right; color: #1f2937; font-size: 14px; font-weight: bold;">${formatPrice(details.costoVehiculos || 0)}</td>
                </tr>` : ''}
              </table>
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
                <p style="color: #dc2626; margin: 0; font-size: 13px;"><strong>Transporte NO incluido</strong> - Debes gestionar tu propio transporte</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
  }

  if (planId === 'Plan Top') {
    return `
    <!-- Detalles Plan Top -->
    <tr>
      <td style="padding: 0 30px 20px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; border: 2px solid #22c55e;">
          <tr>
            <td style="padding: 20px;">
              <h3 style="color: #15803d; margin: 0 0 15px 0; font-size: 18px;">TODO INCLUIDO - Inmersión Total</h3>
              <table width="100%" cellpadding="10" cellspacing="0">
                <tr>
                  <td style="width: 50%; text-align: center; color: #15803d; font-size: 14px; font-weight: bold;">Entrada</td>
                  <td style="width: 50%; text-align: center; color: #15803d; font-size: 14px; font-weight: bold;">Seguro</td>
                </tr>
                <tr>
                  <td style="width: 50%; text-align: center; color: #15803d; font-size: 14px; font-weight: bold;">Transporte</td>
                  <td style="width: 50%; text-align: center; color: #15803d; font-size: 14px; font-weight: bold;">Refrigerio</td>
                </tr>
              </table>
              <p style="color: #166534; margin: 15px 0 0 0; font-size: 13px; text-align: center;">
                No te preocupes por nada, nosotros nos encargamos de todo
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
  }

  if (planId === 'Plan Dinámico') {
    // Support both `opciones` and `opcionesSeleccionadas` (form may send either)
    const opciones = details.opciones || details.opcionesSeleccionadas || [];
    const hasOpciones = opciones && opciones.length > 0;
    
    // Calcular totales de entradas y pólizas
    const entradasOption = opciones.find(op => op.id === 'entradas_dinamico');
    const polizasOption = opciones.find(op => op.id === 'poliza_dinamico');

    return `
    <!-- Detalles Plan Dinámico -->
    <tr>
      <td style="padding: 0 30px 20px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
          <tr>
            <td style="padding: 20px;">
              <h3 style="color: #EAB308; margin: 0 0 15px 0; font-size: 18px;">Desglose del Plan Dinámico</h3>
              
              <!-- Resumen de Visitantes -->
              ${(entradasOption || polizasOption) ? `
              <div style="background-color: #f3f4f6; border: 1px solid #e5e7eb; padding: 12px; border-radius: 6px; margin-bottom: 15px;">
                <p style="color: #6b7280; margin: 0; font-size: 13px; font-weight: bold; margin-bottom: 8px;">Resumen de Visitantes</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  ${entradasOption ? `
                  <div>
                    <p style="color: #6b7280; font-size: 12px; margin: 0;">Entradas (${entradasOption.cantidad} visitantes)</p>
                    <p style="color: #1f2937; font-weight: bold; font-size: 14px; margin: 3px 0 0 0;">${formatPrice(entradasOption.precioTotal)}</p>
                  </div>
                  ` : ''}
                  ${polizasOption ? `
                  <div>
                    <p style="color: #6b7280; font-size: 12px; margin: 0;">Pólizas (${polizasOption.cantidad} visitantes)</p>
                    <p style="color: #1f2937; font-weight: bold; font-size: 14px; margin: 3px 0 0 0;">${formatPrice(polizasOption.precioTotal)}</p>
                  </div>
                  ` : ''}
                </div>
              </div>
              ` : ''}
              
              <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 13px; font-weight: bold;">Servicios Detallados</p>
              ${hasOpciones ? `
              <table width="100%" cellpadding="8" cellspacing="0" style="border: 1px solid #e5e7eb;">
                <tr style="background-color: #e5e7eb;">
                  <th style="text-align: left; padding: 10px; color: #374151; font-size: 13px;">Concepto</th>
                  <th style="text-align: center; padding: 10px; color: #374151; font-size: 13px;">Cantidad</th>
                  <th style="text-align: right; padding: 10px; color: #374151; font-size: 13px;">Precio</th>
                </tr>
                ${opciones.map(opcion => `
                <tr>
                  <td style="padding: 10px; color: #1f2937; font-size: 14px; border-bottom: 1px solid #e5e7eb;">${opcion.nombre || opcion.name || opcion.id}</td>
                  <td style="text-align: center; padding: 10px; color: #1f2937; font-size: 14px; border-bottom: 1px solid #e5e7eb;">${opcion.cantidad || opcion.quantity || 1}</td>
                  <td style="text-align: right; padding: 10px; color: #1f2937; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">${formatPrice(opcion.precioTotal || opcion.totalPrice || opcion.priceTotal || 0)}</td>
                </tr>`).join('')}
              </table>
              ` : `
              <p style="color: #6b7280; margin: 0; font-size: 14px;">Sin opciones adicionales seleccionadas</p>
              `}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
  }

  return '';
}

export function generateAdminEmail(data) {
  const clientEmail = generateClientEmail(data);
  return clientEmail.replace('¡Reserva Confirmada!', 'Nueva Reserva Recibida')
                    .replace(`Hola <strong>${data.nombre} ${data.apellido}</strong>,`, `<strong>Cliente:</strong> ${data.nombre} ${data.apellido}<br><strong>Email:</strong> ${data.email}<br><strong>Teléfono:</strong> ${data.telefono}`);
}

// Helper to format vehicle counts into a readable string
function formatVehicleCounts(vc = {}) {
  if (!vc) return 'Ninguno';
  const parts = [];
  if (vc.car && vc.car > 0) parts.push(`${vc.car} automóvil(es)`);
  if (vc.minibus && vc.minibus > 0) parts.push(`${vc.minibus} microbus(es)`);
  if (vc.bus && vc.bus > 0) parts.push(`${vc.bus} bus(es)`);
  return parts.join(', ') || 'Ninguno';
}
