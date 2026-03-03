/**
 * Bloque CTA reutilizable (botón principal del email).
 * @param {Object} opts
 * @param {string} opts.title - Título del bloque (h3)
 * @param {string} [opts.description] - Texto descriptivo arriba o debajo del botón
 * @param {string} opts.buttonText - Texto del botón
 * @param {string} opts.href - URL del enlace
 * @param {'yellow'|'green'|'purple'} [opts.theme='yellow'] - Tema del bloque
 * @param {string} [opts.hint] - Texto pequeño debajo del botón
 */
const THEMES = {
  yellow: {
    gradient: 'linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)',
    buttonBg: '#ffffff',
    buttonColor: '#F59E0B',
    hintColor: '#d1fae5',
  },
  green: {
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    buttonBg: '#ffffff',
    buttonColor: '#059669',
    hintColor: '#d1fae5',
  },
  purple: {
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    buttonBg: '#ffffff',
    buttonColor: '#8b5cf6',
    hintColor: '#e9d5ff',
  },
};

export function EmailButton({ title, description, buttonText, href, theme = 'yellow', hint } = {}) {
  const t = THEMES[theme] || THEMES.yellow;
  const encodedHref = href.replace(/&/g, '&amp;');
  return `
  <tr>
    <td style="padding: 0 30px 30px 30px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background: ${t.gradient}; border-radius: 8px;">
        <tr>
          <td style="padding: 20px; text-align: center;">
            <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px;">${title}</h3>
            ${description ? `<p style="color: #ffffff; margin: 0 0 20px 0; font-size: 14px;">${description}</p>` : ''}
            <a href="${encodedHref}" 
               style="display: inline-block; background-color: ${t.buttonBg}; color: ${t.buttonColor}; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              ${buttonText}
            </a>
            ${hint ? `<p style="color: ${t.hintColor}; margin: 15px 0 0 0; font-size: 12px;">${hint}</p>` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}
