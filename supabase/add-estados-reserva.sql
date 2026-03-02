-- Script para sistema de estados de reserva

-- 1. Actualizar columna estado con los nuevos valores
ALTER TABLE reservas 
ALTER COLUMN estado TYPE VARCHAR(20);

-- 2. Agregar columnas para tracking
ALTER TABLE reservas 
ADD COLUMN IF NOT EXISTS fecha_atendida TIMESTAMP,
ADD COLUMN IF NOT EXISTS fecha_confirmada TIMESTAMP,
ADD COLUMN IF NOT EXISTS link_registro VARCHAR(255),
ADD COLUMN IF NOT EXISTS pago_verificado BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS monto_pagado DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS metodo_pago VARCHAR(50),
ADD COLUMN IF NOT EXISTS referencia_pago VARCHAR(100);

-- 3. Crear índices
CREATE INDEX IF NOT EXISTS idx_reservas_estado ON reservas(estado);
CREATE INDEX IF NOT EXISTS idx_reservas_link_registro ON reservas(link_registro);

-- 4. Comentarios
COMMENT ON COLUMN reservas.estado IS 'Estados: pendiente, atendida, confirmada, cancelada';
COMMENT ON COLUMN reservas.fecha_atendida IS 'Fecha cuando admin respondió (paso 2)';
COMMENT ON COLUMN reservas.fecha_confirmada IS 'Fecha cuando se confirmó pago (paso 3)';
COMMENT ON COLUMN reservas.link_registro IS 'Serial único para registro de acompañantes';

-- 5. Verificar estructura
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'reservas' 
AND column_name IN ('estado', 'fecha_atendida', 'fecha_confirmada', 'link_registro', 'pago_verificado');
