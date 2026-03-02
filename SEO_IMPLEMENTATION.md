# Guía de Implementación SEO - Cladonia Website

## ✅ Implementaciones Completadas

### 1. **Metadata Mejorada** (`app/layout.js`)
- Título y descripción optimizados
- Keywords relevantes para ecoturismo
- Open Graph para redes sociales
- Twitter Cards
- Configuración de robots y crawlers
- Verificación de Google Search Console

### 2. **robots.txt** (`public/robots.txt`)
- Control de acceso para crawlers
- Protección de rutas privadas (API, confirmaciones)
- Referencia al sitemap
- Configuración específica por bot

### 3. **Sitemap Dinámico** (`app/sitemap.js`)
- Generación automática de URLs
- Incluye páginas estáticas y dinámicas
- Prioridades y frecuencias de actualización
- Compatible con todas las experiencias

### 4. **Metadata Dinámica para Experiencias** (`app/experiencies/[slug]/page.js`)
- SEO específico por experiencia
- Open Graph personalizado
- Canonical URLs
- generateStaticParams para SSG

### 5. **Datos Estructurados JSON-LD** (`lib/structuredData.js`)
- Schema.org para TouristAttraction
- Información de organización
- Mejora la comprensión de Google

### 6. **Optimización de Next.js** (`next.config.mjs`)
- Compresión habilitada
- Formatos de imagen modernos (AVIF, WebP)
- Tamaños optimizados para diferentes dispositivos

## 🔧 Configuraciones Pendientes

### 1. **Actualizar metadataBase**
En `app/layout.js`, línea 11:
```javascript
metadataBase: new URL('https://cladonia.com'),
```
Cambia `https://cladonia.com` por tu dominio real.

### 2. **Google Search Console**
En `app/layout.js`, línea 44:
```javascript
verification: {
  google: 'tu-codigo-de-verificacion',
}
```
Pasos:
1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Agrega tu propiedad
3. Copia el código de verificación
4. Reemplaza `'tu-codigo-de-verificacion'`

### 3. **Crear Imagen Open Graph**
Crea una imagen en `public/images/og-image.jpg`:
- Dimensiones: 1200x630 px
- Formato: JPG o PNG
- Contenido: Logo + paisaje representativo
- Peso: < 300KB

### 4. **Actualizar robots.txt**
En `public/robots.txt`, línea 11:
```
Sitemap: https://cladonia.com/sitemap.xml
```
Cambia por tu dominio real.

### 5. **Agregar Coordenadas Geográficas**
En `lib/structuredData.js`, función `generateExperienceSchema`:
```javascript
geo: {
  '@type': 'GeoCoordinates',
  latitude: '4.5709',  // Ejemplo
  longitude: '-74.2973' // Ejemplo
}
```

## 📊 Herramientas de Validación

### Antes de Producción:
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/
3. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
5. **Lighthouse (Chrome DevTools)**: Auditoría de SEO y rendimiento

### Comandos Útiles:
```bash
# Verificar build de producción
npm run build

# Analizar el sitemap generado
curl http://localhost:3000/sitemap.xml

# Verificar robots.txt
curl http://localhost:3000/robots.txt
```

## 🚀 Mejoras Adicionales Recomendadas

### 1. **Agregar Analytics**
```javascript
// app/layout.js - dentro de <head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

### 2. **Implementar Breadcrumbs**
Mejora la navegación y el SEO:
```javascript
// components/Breadcrumbs.js
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
```

### 3. **Optimizar Imágenes Existentes**
- Convertir a WebP/AVIF
- Agregar atributos `alt` descriptivos
- Implementar lazy loading

### 4. **Agregar Metadata a Otras Páginas**
- `/confirmation/page.js` (noindex, nofollow)
- `/visitor-details/[serial]/page.js` (noindex, nofollow)

### 5. **Implementar Canonical URLs**
Para evitar contenido duplicado en rutas similares.

## 📝 Checklist de Lanzamiento

- [ ] Actualizar dominio en metadataBase
- [ ] Configurar Google Search Console
- [ ] Crear imagen og-image.jpg
- [ ] Actualizar robots.txt con dominio real
- [ ] Agregar coordenadas geográficas
- [ ] Validar datos estructurados
- [ ] Probar Open Graph en redes sociales
- [ ] Ejecutar Lighthouse audit
- [ ] Verificar sitemap.xml
- [ ] Configurar Google Analytics
- [ ] Enviar sitemap a Google Search Console

## 🎯 Métricas a Monitorear

1. **Core Web Vitals**
   - LCP (Largest Contentful Paint) < 2.5s
   - FID (First Input Delay) < 100ms
   - CLS (Cumulative Layout Shift) < 0.1

2. **SEO**
   - Posicionamiento de keywords
   - Tráfico orgánico
   - Tasa de clics (CTR)
   - Páginas indexadas

3. **Rendimiento**
   - Tiempo de carga
   - Tamaño de página
   - Requests HTTP

## 📚 Recursos Adicionales

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Tourism](https://schema.org/TouristAttraction)
- [Web.dev SEO](https://web.dev/lighthouse-seo/)

---

**Última actualización**: Implementación inicial SEO
**Próxima revisión**: Después del lanzamiento a producción
