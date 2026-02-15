-- =====================================================
-- ACTUALIZAR FECHAS PROGRAMADAS PARA PLAN TOP
-- =====================================================

-- Eliminar fechas existentes
DELETE FROM fechas_programadas_top;

-- Insertar fechas correctas que coinciden con topPlanDates.js
INSERT INTO fechas_programadas_top (sendero_id, fecha, cupos_totales, cupos_disponibles) VALUES
-- Sendero 1: Lagunas de Siecha
('sendero_1', '2026-01-10', 15, 15),
('sendero_1', '2026-02-07', 15, 15),
('sendero_1', '2026-03-07', 15, 15),

-- Sendero 2: Laguna Seca
('sendero_2', '2026-01-11', 12, 12),
('sendero_2', '2026-02-08', 12, 12),
('sendero_2', '2026-03-08', 12, 12),

-- Sendero 3: Suasie
('sendero_3', '2026-01-17', 10, 10),
('sendero_3', '2026-02-14', 10, 10),
('sendero_3', '2026-03-14', 10, 10),

-- Sendero 4: Cuchillas de Siecha
('sendero_4', '2026-01-18', 15, 15),
('sendero_4', '2026-02-15', 15, 15),
('sendero_4', '2026-03-15', 15, 15),

-- Sendero 5: Lagunas de Buitrago
('sendero_5', '2026-01-24', 12, 12),
('sendero_5', '2026-02-21', 12, 12),
('sendero_5', '2026-03-21', 12, 12),

-- Sendero 6: Sendero Interpretativo
('sendero_6', '2026-01-25', 15, 15),
('sendero_6', '2026-02-22', 15, 15),
('sendero_6', '2026-03-22', 15, 15),

-- Sendero 7: Páramo de Chingaza
('sendero_7', '2026-01-31', 10, 10),
('sendero_7', '2026-02-28', 10, 10),
('sendero_7', '2026-03-28', 10, 10);
