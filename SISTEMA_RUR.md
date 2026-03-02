# Sistema RUR - Registro Único de Reserva

## 📋 Descripción

El sistema RUR (Registro Único de Reserva) genera un código único e identificable para cada reserva realizada en el sistema.

## 🔢 Formato del RUR

```
RUR-EESSAAMMDD###
```

### Componentes:

1. **RUR-**: Prefijo fijo (Registro Único de Reserva)
2. **EE**: Código de experiencia (2 dígitos)
   - `01` = PNN Chingaza
   - Futuras experiencias: 02, 03, etc.

3. **SS**: Código de sendero/actividad (2 dígitos)
   - `01` = Senderismo Lagunas de Siecha
   - `02` = Senderismo Plantas del Camino
   - `03` = Senderismo Ecopalacio Chingaza
   - `04` = Senderismo Laguna Seca
   - `05` = Senderismo Lagunas de Buitrago
   - `06` = Senderismo Integral Laguna Seca + Embalse de Chuza
   - `07` = Senderismo Suasie Embalse de Chuza

4. **AAMMDD**: Fecha de creación de la reserva (6 dígitos)
   - `AA` = Año (últimos 2 dígitos)
   - `MM` = Mes (01-12)
   - `DD` = Día (01-31)

5. **###**: Consecutivo del día (3 dígitos)
   - Contador que se reinicia cada día
   - Rango: 001-999

## 📝 Ejemplos

### Ejemplo 1:
```
RUR-0104020326025
```
- **01**: Chingaza
- **04**: Sendero Laguna Seca
- **020326**: 26 de marzo de 2026
- **025**: Reserva número 25 del día

### Ejemplo 2:
```
RUR-0107250115001
```
- **01**: Chingaza
- **07**: Sendero Suasie Embalse de Chuza
- **250115**: 15 de enero de 2025
- **001**: Primera reserva del día

## 🗄️ Implementación en Base de Datos

### 1. Ejecutar Script SQL

Ejecuta el siguiente script en Supabase SQL Editor:

```sql
-- Agregar columna RUR
ALTER TABLE reservas 
ADD COLUMN IF NOT EXISTS rur VARCHAR(20) UNIQUE;

-- Crear índice
CREATE INDEX IF NOT EXISTS idx_reservas_rur ON reservas(rur);

-- Agregar comentario
COMMENT ON COLUMN reservas.rur IS 'Registro Único de Reserva - Formato: RUR-EESSAAMMDD###';
```

### 2. Verificar Columna

```sql
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns
WHERE table_name = 'reservas' AND column_name = 'rur';
```

## 🔧 Archivos Modificados

### 1. `/lib/rurGenerator.js` (NUEVO)
- Función `generateRUR()`: Genera el código RUR
- Función `validateRUR()`: Valida si un RUR ya existe

### 2. `/lib/reservations.js`
- Integra `generateRUR()` antes de insertar la reserva
- Guarda el RUR en la columna correspondiente

### 3. `/lib/emailTemplates.js`
- Muestra el RUR en el header del email de confirmación
- Formato destacado con color amarillo

### 4. `/app/form/sections/form.js`
- Captura el RUR generado después de guardar
- Lo pasa al sistema de emails

### 5. `/supabase/add-rur-column.sql` (NUEVO)
- Script SQL para agregar la columna RUR

## 📧 Visualización en Email

El RUR aparece en el email de confirmación justo debajo del título:

```
¡Reserva Confirmada!
ALMONTE by Cladonia S.A.S
RUR-0104020326025
```

## 🔍 Búsqueda y Consulta

### Buscar por RUR en Supabase:

```sql
SELECT * FROM reservas WHERE rur = 'RUR-0104020326025';
```

### Buscar reservas de un día específico:

```sql
SELECT * FROM reservas 
WHERE rur LIKE 'RUR-01__020326%';
```

### Buscar reservas de un sendero:

```sql
SELECT * FROM reservas 
WHERE rur LIKE 'RUR-0104%';
```

## ⚠️ Consideraciones Importantes

1. **Unicidad**: El RUR es único en toda la base de datos (constraint UNIQUE)

2. **Consecutivo Diario**: El contador se reinicia cada día a las 00:00

3. **Límite Diario**: Máximo 999 reservas por día (si se alcanza, considerar expandir a 4 dígitos)

4. **Zona Horaria**: Usa la hora del servidor (UTC). Considerar ajustar a hora local de Colombia si es necesario

5. **Formato Fijo**: El RUR siempre tiene 18 caracteres (incluyendo "RUR-")

## 🚀 Próximos Pasos

### Después de ejecutar el script SQL:

1. ✅ Verificar que la columna `rur` existe en la tabla `reservas`
2. ✅ Hacer una reserva de prueba
3. ✅ Verificar que el RUR se genera correctamente
4. ✅ Confirmar que aparece en el email
5. ✅ Probar búsquedas por RUR

### Mejoras Futuras:

- [ ] Panel de administración para buscar por RUR
- [ ] QR code con el RUR para check-in
- [ ] Notificaciones SMS con el RUR
- [ ] Exportar reportes filtrados por RUR
- [ ] API endpoint para validar RUR

## 📊 Estadísticas Útiles

### Reservas por día:
```sql
SELECT 
  DATE(created_at) as fecha,
  COUNT(*) as total_reservas,
  MAX(CAST(RIGHT(rur, 3) AS INTEGER)) as ultimo_consecutivo
FROM reservas
WHERE rur IS NOT NULL
GROUP BY DATE(created_at)
ORDER BY fecha DESC;
```

### Senderos más reservados:
```sql
SELECT 
  SUBSTRING(rur, 7, 2) as codigo_sendero,
  sendero_id,
  COUNT(*) as total
FROM reservas
WHERE rur IS NOT NULL
GROUP BY SUBSTRING(rur, 7, 2), sendero_id
ORDER BY total DESC;
```

## 🆘 Troubleshooting

### Error: "duplicate key value violates unique constraint"
- **Causa**: Dos reservas intentan usar el mismo RUR
- **Solución**: El sistema reintenta automáticamente con el siguiente consecutivo

### RUR no aparece en el email
- **Verificar**: Que la columna `rur` existe en la tabla
- **Verificar**: Que `result.reserva.rur` tiene valor
- **Verificar**: Que el template de email recibe el parámetro `rur`

### Consecutivo incorrecto
- **Verificar**: Zona horaria del servidor
- **Verificar**: Filtro de fecha en la consulta de conteo
- **Solución**: Ajustar la consulta para usar hora local de Colombia

---

**Última actualización**: Implementación inicial del sistema RUR
**Versión**: 1.0.0
