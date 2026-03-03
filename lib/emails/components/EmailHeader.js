/**
 * Header reutilizable para todos los emails.
 * @param {Object} opts
 * @param {string} opts.title - Título principal (h1)
 * @param {string} [opts.rur] - Código de reserva (opcional)
 * @param {'dark'|'green'|'purple'|'blue'} [opts.theme='dark'] - Tema visual del header
 */
const THEMES = {
  dark: {
    gradient: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
    titleColor: '#EAB308',
    subtitleColor: '#ffffff',
    rurColor: '#EAB308',
  },
  green: {
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    titleColor: '#ffffff',
    subtitleColor: '#ffffff',
    rurColor: '#d1fae5',
  },
  purple: {
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    titleColor: '#ffffff',
    subtitleColor: '#ffffff',
    rurColor: '#e9d5ff',
  },
  blue: {
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    titleColor: '#ffffff',
    subtitleColor: '#ffffff',
    rurColor: '#dbeafe',
  },
};

const SUBTITLE = 'ALMONTE by Cladonia S.A.S';

export function EmailHeader({ title, rur, theme = 'dark' }) {
  const t = THEMES[theme] || THEMES.dark;
  return `
  <tr>
    <td style="background: ${t.gradient}; padding: 40px 30px; text-align: center;">
      <h1 style="color: ${t.titleColor}; margin: 0; font-size: 28px;">${title}</h1>
      <p style="color: ${t.subtitleColor}; margin: 10px 0 0 0; font-size: 16px;">${SUBTITLE}</p>
      ${rur ? `<p style="color: ${t.rurColor}; margin: 10px 0 0 0; font-size: 14px; font-weight: bold; letter-spacing: 1px;">${rur}</p>` : ''}
    </td>
  </tr>`;
}
