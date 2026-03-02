# Sistema de 3 Pasos - Gestión de Reservas

## 📋 Flujo Completo

### **PASO 1: PRE-RESERVA** (Estado: `pendiente`)

**Acción:** Cliente llena el formulario inicial

**Proceso:**
1. Cliente completa formulario en `/form`
2. Sistema genera RUR único
3. Guarda en BD con estado `pendiente`
4. Envía 2 emails:
   - ✅ Cliente: Confirmación de pre-reserva con RUR
   - ✅ Admin: Notificación con botón "Atender Reserva"

**Email Admin incluye:**
- Todos los detalles de la reserva
- Botón verde: "✅ Atender Reserva"
- Al hacer clic → Activa PASO 2

---

### **PASO 2: ATENDIDA** (Estado: `atendida`)

**Acción:** Admin hace clic en "Atender Reserva"

**Proceso:**
1. Admin hace clic en botón del email
2. API `/api/atender-reserva` se ejecuta:
   - Valida token de seguridad
   - Cambia estado a `atendida`
   - Genera serial único para registro
   - Guarda `fecha_atendida` y `link_registro`
3. Envía email al cliente con:
   - ✅ Confirmación de que fue atendida
   - 🔗 Link para registrar acompañantes
   - 💳 Información preliminar de pago

**Link de registro:** `/visitor-details/[serial]`

---

### **PASO 3: CONFIRMADA** (Estado: `confirmada`)

**Acción:** Admin verifica pago y confirma

**Proceso:**
1. Cliente completa registro de acompañantes
2. Cliente realiza pago
3. Admin verifica pago manualmente
4. Admin llama API `/api/confirmar-reserva`:
   - Valida que estado sea `atendida`
   - Cambia estado a `confirmada`
   - Guarda datos de pago:
     - `monto_pagado`
     - `metodo_pago`
     - `referencia_pago`
     - `pago_verificado = true`
   - Guarda `fecha_confirmada`
5. Envía email final al cliente:
   - 🎉 Confirmación definitiva
   - 🧾 Factura/recibo
   - 📋 Instrucciones finales

---

## 🗄️ Estructura de Base de Datos

### Tabla `reservas` - Nuevas Columnas:

```sql
estado VARCHAR(20)              -- 'pendiente', 'atendida', 'confirmada', 'cancelada'
fecha_atendida TIMESTAMP        -- Cuando admin respondió
fecha_confirmada TIMESTAMP      -- Cuando se confirmó pago
link_registro VARCHAR(255)      -- Serial único para /visitor-details/[serial]
pago_verificado BOOLEAN         -- true cuando se confirma
monto_pagado DECIMAL(10,2)      -- Monto real pagado
metodo_pago VARCHAR(50)         -- 'Transferencia', 'Nequi', 'Daviplata', etc.
referencia_pago VARCHAR(100)    -- Número de referencia/transacción
```

---

## 🔧 APIs Creados

### 1. `/api/atender-reserva` (POST)

**Entrada:**
```json
{
  "rur": "RUR-0104250103025",
  "token": "hash_de_seguridad"
}
```

**Salida:**
```json
{
  "success": true,
  "linkRegistro": "https://cladonia.org/visitor-details/abc123..."
}
```

**Seguridad:** Token = SHA256(rur + ADMIN_SECRET)

---

### 2. `/api/confirmar-reserva` (POST)

**Entrada:**
```json
{
  "rur": "RUR-0104250103025",
  "montoPagado": 500000,
  "metodoPago": "Transferencia Bancaria",
  "referenciaPago": "TRX-123456"
}
```

**Salida:**
```json
{
  "success": true
}
```

---

## 📧 Templates de Email

### Email 1: Pre-reserva (Ya existente)
- Título: "¡Reserva Confirmada!"
- Color: Amarillo (#EAB308)
- Contenido: Detalles de reserva + RUR

### Email 2: Atendida (Nuevo)
- Título: "✅ Reserva Atendida"
- Color: Verde (#10b981)
- Contenido: Link de registro + info de pago
- Función: `generateRegistrationEmail()`

### Email 3: Confirmada (Nuevo)
- Título: "🎉 ¡Reserva Confirmada!"
- Color: Morado (#8b5cf6)
- Contenido: Factura + instrucciones finales
- Función: `generateInvoiceEmail()`

---

## 🔐 Seguridad

### Token de Seguridad:
```javascript
const token = crypto
  .createHash('sha256')
  .update(`${rur}-${process.env.ADMIN_SECRET}`)
  .digest('hex');
```

**Importante:**
- Cambiar `ADMIN_SECRET` en producción
- Token único por RUR
- Previene acceso no autorizado

---

## 🚀 Instalación

### 1. Ejecutar SQL:
```bash
# En Supabase SQL Editor
supabase/add-estados-reserva.sql
```

### 2. Configurar Variables:
```env
ADMIN_SECRET=tu-secret-key-segura
NEXT_PUBLIC_BASE_URL=https://www.cladonia.org
```

### 3. Reiniciar servidor:
```bash
npm run dev
```

---

## 📊 Diagrama de Estados

```
┌─────────────┐
│  PENDIENTE  │ ← Cliente llena formulario
└──────┬──────┘
       │ Admin hace clic "Atender"
       ↓
┌─────────────┐
│  ATENDIDA   │ ← Email con link de registro enviado
└──────┬──────┘
       │ Admin verifica pago
       ↓
┌─────────────┐
│ CONFIRMADA  │ ← Email con factura enviado
└─────────────┘
```

---

## 🧪 Testing

### Probar Paso 2:
```bash
curl -X POST http://localhost:3000/api/atender-reserva \
  -H "Content-Type: application/json" \
  -d '{"rur":"RUR-0104250103001","token":"hash_aqui"}'
```

### Probar Paso 3:
```bash
curl -X POST http://localhost:3000/api/confirmar-reserva \
  -H "Content-Type: application/json" \
  -d '{
    "rur":"RUR-0104250103001",
    "montoPagado":500000,
    "metodoPago":"Transferencia",
    "referenciaPago":"TRX-123"
  }'
```

---

## ✅ Checklist de Implementación

- [x] Script SQL para nuevas columnas
- [x] API `/api/atender-reserva`
- [x] API `/api/confirmar-reserva`
- [x] Template email paso 2 (registro)
- [x] Template email paso 3 (factura)
- [x] Botón en email admin
- [x] Sistema de tokens de seguridad
- [ ] Ejecutar SQL en Supabase
- [ ] Configurar ADMIN_SECRET
- [ ] Probar flujo completo

---

**Última actualización:** Sistema de 3 pasos implementado
**Próximo:** Ejecutar SQL y probar en producción
