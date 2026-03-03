'use client';

/**
 * Contador reutilizable: menos a la izquierda, valor en el centro, más a la derecha.
 * Mismo diseño que el selector de vehículos en Plan Dinámico.
 * Se usa en: tipo de visitante (form), vehículos Plan Básico, transporte Plan Dinámico.
 *
 * @param {string} label - Título del bloque (ej. "Automóvil", "Exentos")
 * @param {number} value - Valor actual
 * @param {function} onIncrement - Al hacer clic en +
 * @param {function} onDecrement - Al hacer clic en -
 * @param {number} [min=0] - Valor mínimo (el botón - se deshabilita en mínimo)
 * @param {string} [priceLabel] - Línea de precio (ej. "$21K", "por vehículo")
 * @param {string} [priceSubtitle] - Texto pequeño bajo el precio (ej. "por vehículo")
 * @param {string|React.ReactNode} [detailLine] - Línea extra cuando value > 0 (ej. "Total: $42.000")
 * @param {React.ReactNode} [hint] - Contenido bajo el stepper (ej. lista de bullets)
 * @param {string} [activeBorderColor='border-blue-400'] - Borde cuando value > 0
 * @param {boolean} [showCheckmark=false] - Mostrar ✅/⬜ según value > 0
 */
export default function QuantityStepper({
  label,
  value,
  onIncrement,
  onDecrement,
  min = 0,
  priceLabel,
  priceSubtitle,
  detailLine,
  hint,
  activeBorderColor = 'border-blue-400',
  showCheckmark = false,
}) {
  const current = Number(value) || 0;
  const isActive = current > 0;

  return (
    <div
      className={`bg-gray-800/60 border-2 p-3 rounded transition-colors ${
        isActive ? activeBorderColor : 'border-gray-600'
      }`}
    >
      <p className="text-white font-bold text-sm mb-1">
        {showCheckmark && (isActive ? '✅' : '⬜')}
        {showCheckmark && ' '}
        {label}
      </p>
      {priceLabel != null && (
        <>
          <p className="text-yellow-400 font-bold text-base">{priceLabel}</p>
          {priceSubtitle && <p className="text-white text-xs mb-2">{priceSubtitle}</p>}
        </>
      )}

      <div className="flex items-center justify-between mt-2">
        <button
          type="button"
          onClick={onDecrement}
          disabled={current <= min}
          className="bg-gray-700 text-white w-8 h-8 rounded font-bold hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Restar"
        >
          -
        </button>
        <span className="text-white font-bold text-xl">{current}</span>
        <button
          type="button"
          onClick={onIncrement}
          className="bg-gray-700 text-white w-8 h-8 rounded font-bold hover:bg-gray-600"
          aria-label="Sumar"
        >
          +
        </button>
      </div>

      {isActive && detailLine != null && (
        <p className="text-yellow-400 text-xs mt-2 text-center">
          {detailLine}
        </p>
      )}

      {hint != null && <div className="mt-3">{hint}</div>}
    </div>
  );
}
