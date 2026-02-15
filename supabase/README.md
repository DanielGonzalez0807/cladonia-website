# Configuración de Base de Datos - Supabase

## Estructura de Tablas

### 1. **senderos**
Almacena información de cada sendero disponible en PNN Chingaza.

### 2. **planes**
Los 3 planes disponibles: Básico, Top y Dinámico.

### 3. **precios_senderos**
Precios de cada plan por sendero.

### 4. **tarifas_basicas**
Tarifas específicas del Plan Básico por tipo de visitante (estudiantes, adultos, exentos, extranjeros).

### 5. **tarifas_guias**
Tarifa del guía por cada sendero.

### 6. **fechas_programadas_top**
Fechas específicas disponibles para el Plan Top con cupos limitados.
- Los cupos se actualizan automáticamente al crear una reserva.

### 7. **opciones_dinamicas**
Opciones adicionales para el Plan Dinámico (transporte, comidas, guías especializados).

### 8. **reservas** (Tabla principal)
Almacena todas las reservas con datos del cliente, sendero, plan, fecha y totales.

### 9. **reservas_plan_basico**
Detalles específicos del Plan Básico: vehículos y costos desglosados.

### 10. **reservas_plan_top**
Relación con la fecha programada seleccionada.

### 11. **reservas_plan_dinamico**
Precio base del plan dinámico.

### 12. **reservas_opciones_dinamicas**
Opciones adicionales seleccionadas en el Plan Dinámico.

## Pasos para Configurar en Supabase

1. **Acceder a Supabase Dashboard**
   - Ve a https://supabase.com
   - Accede a tu proyecto

2. **Ejecutar el Schema SQL**
   - Ve a SQL Editor
   - Copia todo el contenido de `schema.sql`
   - Pégalo y ejecuta

3. **Verificar Tablas Creadas**
   - Ve a Table Editor
   - Deberías ver las 12 tablas creadas

4. **Datos Iniciales**
   - El script ya incluye datos iniciales:
     - 7 senderos
     - 3 planes
     - Precios por sendero/plan
     - Tarifas básicas
     - Tarifas de guías
     - 21 fechas programadas (3 por sendero)
     - 7 opciones dinámicas

## Flujo de Datos

### Plan Básico
```
reservas → reservas_plan_basico
```
Guarda: vehículos, costos de entradas, pólizas, guía y vehículos.

### Plan Top
```
reservas → reservas_plan_top → fechas_programadas_top
```
Actualiza automáticamente los cupos disponibles.

### Plan Dinámico
```
reservas → reservas_plan_dinamico → reservas_opciones_dinamicas
```
Guarda precio base y todas las opciones adicionales seleccionadas.

## Consultas Útiles

### Ver reservas con detalles del sendero
```sql
SELECT r.*, s.nombre as sendero_nombre, p.nombre as plan_nombre
FROM reservas r
JOIN senderos s ON r.sendero_id = s.id
JOIN planes p ON r.plan_id = p.id
ORDER BY r.created_at DESC;
```

### Ver cupos disponibles Plan Top
```sql
SELECT s.nombre, f.fecha, f.cupos_disponibles, f.cupos_totales
FROM fechas_programadas_top f
JOIN senderos s ON f.sendero_id = s.id
WHERE f.activo = true AND f.cupos_disponibles > 0
ORDER BY f.fecha;
```

### Ver reservas Plan Dinámico con opciones
```sql
SELECT r.*, rd.precio_base, 
       json_agg(json_build_object('opcion', od.nombre, 'precio', rod.precio_total)) as opciones
FROM reservas r
JOIN reservas_plan_dinamico rd ON r.id = rd.reserva_id
LEFT JOIN reservas_opciones_dinamicas rod ON rd.id = rod.reserva_dinamico_id
LEFT JOIN opciones_dinamicas od ON rod.opcion_id = od.id
WHERE r.plan_id = 'dynamic'
GROUP BY r.id, rd.precio_base;
```
