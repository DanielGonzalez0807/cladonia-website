-- =====================================================
-- VISTAS PARA VER RESERVAS COMPLETAS
-- =====================================================

-- Vista 1: Todas las reservas con información básica
CREATE OR REPLACE VIEW vista_reservas_completas AS
SELECT 
  r.id,
  r.nombre || ' ' || r.apellido AS cliente,
  r.email,
  r.telefono,
  r.destino,
  s.nombre AS sendero,
  p.nombre AS plan,
  r.fecha,
  r.exentos,
  r.estudiantes,
  r.adultos,
  r.extranjeros,
  r.total_personas,
  r.total_precio,
  r.observaciones,
  r.estado,
  r.created_at AS fecha_reserva
FROM reservas r
LEFT JOIN senderos s ON r.sendero_id = s.id
LEFT JOIN planes p ON r.plan_id = p.id
ORDER BY r.created_at DESC;


-- Vista 2: Reservas del Plan Básico con vehículos
CREATE OR REPLACE VIEW vista_reservas_plan_basico AS
SELECT 
  r.id,
  r.nombre || ' ' || r.apellido AS cliente,
  r.email,
  r.telefono,
  s.nombre AS sendero,
  r.fecha,
  r.total_personas,
  -- Vehículos
  rpb.automoviles,
  rpb.microbuses,
  rpb.buses,
  -- Costos desglosados
  rpb.costo_entradas,
  rpb.costo_polizas,
  rpb.costo_guia,
  rpb.costo_vehiculos,
  r.total_precio AS total_final,
  r.estado,
  r.created_at AS fecha_reserva
FROM reservas r
INNER JOIN reservas_plan_basico rpb ON r.id = rpb.reserva_id
LEFT JOIN senderos s ON r.sendero_id = s.id
WHERE r.plan_id = 'basic'
ORDER BY r.created_at DESC;


-- Vista 3: Reservas del Plan Top con fecha programada
CREATE OR REPLACE VIEW vista_reservas_plan_top AS
SELECT 
  r.id,
  r.nombre || ' ' || r.apellido AS cliente,
  r.email,
  r.telefono,
  s.nombre AS sendero,
  r.fecha,
  r.total_personas,
  fpt.cupos_totales,
  fpt.cupos_disponibles AS cupos_restantes,
  r.total_precio,
  r.estado,
  r.created_at AS fecha_reserva
FROM reservas r
INNER JOIN reservas_plan_top rpt ON r.id = rpt.reserva_id
INNER JOIN fechas_programadas_top fpt ON rpt.fecha_programada_id = fpt.id
LEFT JOIN senderos s ON r.sendero_id = s.id
WHERE r.plan_id = 'top'
ORDER BY r.created_at DESC;


-- Vista 4: Reservas del Plan Dinámico con opciones
CREATE OR REPLACE VIEW vista_reservas_plan_dinamico AS
SELECT 
  r.id,
  r.nombre || ' ' || r.apellido AS cliente,
  r.email,
  r.telefono,
  s.nombre AS sendero,
  r.fecha,
  r.total_personas,
  rpd.precio_base,
  -- Opciones seleccionadas (concatenadas)
  STRING_AGG(
    od.nombre || ' (x' || rod.cantidad || '): $' || rod.precio_total, 
    ', '
  ) AS opciones_seleccionadas,
  r.total_precio AS total_final,
  r.estado,
  r.created_at AS fecha_reserva
FROM reservas r
INNER JOIN reservas_plan_dinamico rpd ON r.id = rpd.reserva_id
LEFT JOIN reservas_opciones_dinamicas rod ON rpd.id = rod.reserva_dinamico_id
LEFT JOIN opciones_dinamicas od ON rod.opcion_id = od.id
LEFT JOIN senderos s ON r.sendero_id = s.id
WHERE r.plan_id = 'dynamic'
GROUP BY r.id, r.nombre, r.apellido, r.email, r.telefono, s.nombre, 
         r.fecha, r.total_personas, rpd.precio_base, r.total_precio, 
         r.estado, r.created_at
ORDER BY r.created_at DESC;


-- =====================================================
-- CONSULTAS ÚTILES
-- =====================================================

-- Ver todas las reservas (resumen)
-- SELECT * FROM vista_reservas_completas;

-- Ver solo reservas del Plan Básico con vehículos
-- SELECT * FROM vista_reservas_plan_basico;

-- Ver solo reservas del Plan Top
-- SELECT * FROM vista_reservas_plan_top;

-- Ver solo reservas del Plan Dinámico con opciones
-- SELECT * FROM vista_reservas_plan_dinamico;

-- Ver reservas de un cliente específico
-- SELECT * FROM vista_reservas_completas WHERE cliente LIKE '%nombre%';

-- Ver reservas pendientes
-- SELECT * FROM vista_reservas_completas WHERE estado = 'pendiente';
