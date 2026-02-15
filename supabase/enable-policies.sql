-- =====================================================
-- HABILITAR POLÍTICAS DE SEGURIDAD (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE senderos ENABLE ROW LEVEL SECURITY;
ALTER TABLE planes ENABLE ROW LEVEL SECURITY;
ALTER TABLE precios_senderos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarifas_basicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarifas_guias ENABLE ROW LEVEL SECURITY;
ALTER TABLE fechas_programadas_top ENABLE ROW LEVEL SECURITY;
ALTER TABLE opciones_dinamicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas_plan_basico ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas_plan_top ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas_plan_dinamico ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas_opciones_dinamicas ENABLE ROW LEVEL SECURITY;

-- Políticas para LECTURA (SELECT) - Permitir a todos
CREATE POLICY "Permitir lectura pública de senderos" ON senderos FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública de planes" ON planes FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública de precios_senderos" ON precios_senderos FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública de tarifas_basicas" ON tarifas_basicas FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública de tarifas_guias" ON tarifas_guias FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública de fechas_programadas_top" ON fechas_programadas_top FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública de opciones_dinamicas" ON opciones_dinamicas FOR SELECT USING (true);

-- Políticas para ESCRITURA (INSERT) - Permitir a todos crear reservas
CREATE POLICY "Permitir inserción pública de reservas" ON reservas FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserción pública de reservas_plan_basico" ON reservas_plan_basico FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserción pública de reservas_plan_top" ON reservas_plan_top FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserción pública de reservas_plan_dinamico" ON reservas_plan_dinamico FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserción pública de reservas_opciones_dinamicas" ON reservas_opciones_dinamicas FOR INSERT WITH CHECK (true);

-- Políticas para ACTUALIZACIÓN (UPDATE) - Solo fechas programadas para actualizar cupos
CREATE POLICY "Permitir actualización de cupos en fechas_programadas_top" ON fechas_programadas_top FOR UPDATE USING (true);

-- Políticas para LECTURA de reservas (solo para administradores en el futuro)
CREATE POLICY "Permitir lectura de reservas" ON reservas FOR SELECT USING (true);
CREATE POLICY "Permitir lectura de reservas_plan_basico" ON reservas_plan_basico FOR SELECT USING (true);
CREATE POLICY "Permitir lectura de reservas_plan_top" ON reservas_plan_top FOR SELECT USING (true);
CREATE POLICY "Permitir lectura de reservas_plan_dinamico" ON reservas_plan_dinamico FOR SELECT USING (true);
CREATE POLICY "Permitir lectura de reservas_opciones_dinamicas" ON reservas_opciones_dinamicas FOR SELECT USING (true);
