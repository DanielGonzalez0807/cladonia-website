/**
 * Footer reutilizable para todos los emails.
 * @param {Object} opts
 * @param {string} [opts.accentColor='#EAB308'] - Color del nombre de marca y del enlace de contacto
 * @param {string} [opts.secondLine] - Segunda línea (ej. "Panel de Administración"). Si no se pasa, se muestra el enlace de contacto.
 */
export function EmailFooter({ accentColor = '#EAB308', secondLine } = {}) {
  const contactHtml = secondLine
    ? `<p style="color: #6b7280; margin: 0; font-size: 14px;"><strong style="color: ${accentColor};">Cladonia Ecoturismo</strong> - ${secondLine}</p>`
    : `<p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">Gracias por elegir <strong style="color: ${accentColor};">Cladonia Ecoturismo</strong></p>
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">Si tienes alguna pregunta, contáctanos a <a href="mailto:${process.env.EMAIL_FROM}" style="color: ${accentColor}; text-decoration: none;">${process.env.EMAIL_FROM}</a></p>`;

  return `
  <!-- Footer -->
  <tr>
    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
      ${contactHtml}
    </td>
  </tr>`;
}
