-- Verificar y corregir tabla reservas_plan_basico
-- Si la tabla ya existe, este script solo agregará las columnas faltantes

-- Verificar si la tabla existe, si no, crearla
CREATE TABLE IF NOT EXISTS reservas_plan_basico (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reserva_id UUID REFERENCES reservas(id) ON DELETE CASCADE,
  automoviles INTEGER DEFAULT 0,
  microbuses INTEGER DEFAULT 0,
  buses INTEGER DEFAULT 0,
  costo_entradas INTEGER NOT NULL,
  costo_polizas INTEGER NOT NULL,
  costo_guia INTEGER NOT NULL,
  costo_vehiculos INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verificar datos existentes
SELECT 
  r.id,
  r.nombre,
  r.apellido,
  r.plan_id,
  rpb.automoviles,
  rpb.microbuses,
  rpb.buses,
  rpb.costo_vehiculos
FROM reservas r
LEFT JOIN reservas_plan_basico rpb ON r.id = rpb.reserva_id
WHERE r.plan_id = 'basic'
ORDER BY r.created_at DESC
LIMIT 10;
