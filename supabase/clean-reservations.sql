-- =====================================================
-- LIMPIAR TODAS LAS RESERVAS
-- =====================================================
-- ⚠️ CUIDADO: Esto eliminará TODAS las reservas de la base de datos
-- Solo usar en desarrollo/pruebas

-- Eliminar todas las reservas (las tablas relacionadas se eliminan automáticamente por CASCADE)
DELETE FROM reservas;

-- Restaurar cupos de fechas programadas a su valor original
UPDATE fechas_programadas_top 
SET cupos_disponibles = cupos_totales;

-- Verificar que todo se eliminó
SELECT 'Reservas restantes:' AS info, COUNT(*) AS cantidad FROM reservas
UNION ALL
SELECT 'Reservas Plan Básico:', COUNT(*) FROM reservas_plan_basico
UNION ALL
SELECT 'Reservas Plan Top:', COUNT(*) FROM reservas_plan_top
UNION ALL
SELECT 'Reservas Plan Dinámico:', COUNT(*) FROM reservas_plan_dinamico
UNION ALL
SELECT 'Opciones Dinámicas:', COUNT(*) FROM reservas_opciones_dinamicas;
