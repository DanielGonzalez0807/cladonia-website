-- Agregar columnas faltantes para sistema de estados

ALTER TABLE reservas 
ADD COLUMN IF NOT EXISTS fecha_atendida TIMESTAMP,
ADD COLUMN IF NOT EXISTS fecha_confirmada TIMESTAMP,
ADD COLUMN IF NOT EXISTS link_registro VARCHAR(255),
ADD COLUMN IF NOT EXISTS pago_verificado BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS monto_pagado DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS metodo_pago VARCHAR(50),
ADD COLUMN IF NOT EXISTS referencia_pago VARCHAR(100);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_reservas_link_registro ON reservas(link_registro);
