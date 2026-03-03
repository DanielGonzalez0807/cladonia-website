-- =====================================================
-- LIMPIAR RESERVAS Y VISITANTES
-- =====================================================
-- Elimina todos los registros de reservas y de visitantes.
-- Las tablas hijas de reservas se vacían por CASCADE.
-- Solo usar en desarrollo/pruebas.
--
-- Orden:
-- 1. visitantes (referencia a reservas; si existe la tabla)
-- 2. reservas (CASCADE borra: reservas_plan_basico, reservas_plan_top,
--              reservas_plan_dinamico, reservas_opciones_dinamicas)
-- 3. Restaurar cupos en fechas_programadas_top
-- =====================================================

-- 1. Vaciar visitantes (solo si la tabla existe)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'visitantes') THEN
    DELETE FROM visitantes;
  END IF;
END $$;

-- 2. Vaciar reservas (CASCADE limpia las tablas de planes)
DELETE FROM reservas;

-- 3. Restaurar cupos de fechas programadas (Plan Top)
UPDATE fechas_programadas_top
SET cupos_disponibles = cupos_totales;

-- 4. Comprobación (deberías ver 0 en todas)
SELECT 'reservas' AS tabla, COUNT(*) AS registros FROM reservas
UNION ALL
SELECT 'reservas_plan_basico', COUNT(*) FROM reservas_plan_basico
UNION ALL
SELECT 'reservas_plan_top', COUNT(*) FROM reservas_plan_top
UNION ALL
SELECT 'reservas_plan_dinamico', COUNT(*) FROM reservas_plan_dinamico
UNION ALL
SELECT 'reservas_opciones_dinamicas', COUNT(*) FROM reservas_opciones_dinamicas;
-- Si tienes tabla visitantes, descomenta la línea siguiente:
-- UNION ALL SELECT 'visitantes', COUNT(*) FROM visitantes;
