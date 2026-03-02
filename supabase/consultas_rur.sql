-- Por RUR específico
SELECT * FROM reservas WHERE rur = 'RUR-0104020326025';

-- Todas las reservas del sendero 4
SELECT * FROM reservas WHERE rur LIKE 'RUR-0104%';

-- Todas las reservas del 26 de marzo de 2026
SELECT * FROM reservas WHERE rur LIKE 'RUR-01__020326%';