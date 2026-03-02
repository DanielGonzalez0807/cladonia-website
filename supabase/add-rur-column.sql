-- Script para agregar columna RUR a la tabla reservas
-- Ejecutar en Supabase SQL Editor

-- 1. Agregar columna RUR si no existe
ALTER TABLE reservas
ADD COLUMN IF NOT EXISTS rur VARCHAR(20) UNIQUE;

-- 2. Crear índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_reservas_rur ON reservas (rur);

-- 3. Agregar comentario a la columna
COMMENT ON COLUMN reservas.rur IS 'Registro Único de Reserva - Formato: RUR-EESSAAMMDD### donde EE=Experiencia, SS=Sendero, AAMMDD=Fecha, ###=Consecutivo';

-- 4. Verificar la estructura
SELECT
    column_name,
    data_type,
    character_maximum_length,
    is_nullable
FROM information_schema.columns
WHERE
    table_name = 'reservas'
    AND column_name = 'rur';