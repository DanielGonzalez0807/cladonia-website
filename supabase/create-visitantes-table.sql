-- Tabla para almacenar datos de visitantes

CREATE TABLE IF NOT EXISTS visitantes (
  id BIGSERIAL PRIMARY KEY,
  reserva_id BIGINT REFERENCES reservas(id) ON DELETE CASCADE,
  tipo_visitante VARCHAR(50) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  es_extranjero BOOLEAN DEFAULT FALSE,
  pais VARCHAR(100) DEFAULT 'Colombia',
  tipo_documento VARCHAR(20) NOT NULL,
  numero_documento VARCHAR(50) NOT NULL,
  edad INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_visitantes_reserva ON visitantes(reserva_id);
CREATE INDEX IF NOT EXISTS idx_visitantes_documento ON visitantes(numero_documento);

-- Comentarios
COMMENT ON TABLE visitantes IS 'Datos detallados de cada visitante de una reserva';
COMMENT ON COLUMN visitantes.tipo_visitante IS 'Exento, Estudiante, Adulto, Extranjero';
COMMENT ON COLUMN visitantes.tipo_documento IS 'CC, TI, CE, Pasaporte';

-- Verificar estructura
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'visitantes'
ORDER BY ordinal_position;
