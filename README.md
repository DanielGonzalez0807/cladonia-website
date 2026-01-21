# Cladonia Website

Sitio web corporativo para Cladonia, empresa especializada en turismo de naturaleza y experiencias ecoturísticas en Colombia. El proyecto presenta una plataforma moderna y responsiva que conecta a los usuarios con experiencias únicas en reservas naturales.

## Descripción del Proyecto

Cladonia es una aplicación web desarrollada con Next.js que ofrece una experiencia inmersiva para explorar y reservar actividades de ecoturismo. El sitio incluye secciones dedicadas a experiencias naturales, eventos programados, información corporativa y un sistema de contacto integrado.

## Características Principales

- **Diseño Responsivo**: Interfaz adaptable que funciona perfectamente en dispositivos móviles, tablets y escritorio
- **Navegación Intuitiva**: Estructura clara con componentes reutilizables y transiciones fluidas
- **Carrusel Interactivo**: Sistema de navegación visual para eventos y experiencias
- **Optimización de Imágenes**: Implementación de Next.js Image para carga optimizada de contenido visual
- **Arquitectura Modular**: Organización de componentes UI y secciones para facilitar el mantenimiento

## Tecnologías Utilizadas

- **Next.js 14**: Framework de React con App Router para renderizado del lado del servidor
- **React 18**: Biblioteca de JavaScript para interfaces de usuario
- **Tailwind CSS**: Framework de CSS utilitario para diseño responsivo
- **JavaScript ES6+**: Sintaxis moderna de JavaScript con hooks y componentes funcionales

## Estructura del Proyecto

```
cladonia-website/
├── app/                    # Páginas y rutas de la aplicación
│   ├── experiencies/       # Página dedicada a experiencias
│   ├── layout.js          # Layout principal de la aplicación
│   └── page.js            # Página de inicio
├── components/
│   └── ui/                # Componentes reutilizables
├── sections/              # Secciones principales del sitio
├── public/
│   ├── images/            # Recursos visuales
│   └── video/             # Contenido multimedia
└── README.md
```

## Instalación y Configuración

### Prerrequisitos

- Node.js 18.0 o superior
- npm o yarn como gestor de paquetes

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/DanielGoDev/cladonia-website.git
```

2. Navegar al directorio del proyecto:
```bash
cd cladonia-website
```

3. Instalar las dependencias:
```bash
npm install
```

4. Ejecutar el servidor de desarrollo:
```bash
npm run dev
```

5. Abrir el navegador en `http://localhost:3000`

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera la versión de producción
- `npm run start`: Ejecuta la aplicación en modo producción
- `npm run lint`: Ejecuta el linter para verificar la calidad del código

## Funcionalidades Implementadas

### Página Principal
- Hero section con video de fondo
- Sección de experiencias con tarjetas interactivas
- Carrusel de eventos programados
- Información corporativa con galería de imágenes
- Formulario de contacto

### Página de Experiencias
- Hero personalizado para experiencias específicas
- Listado completo de actividades disponibles
- Sistema de navegación entre secciones
- Integración con componentes reutilizables

### Componentes UI
- Header con navegación responsiva
- Tarjetas de contenido reutilizables
- Bridges de transición entre secciones
- Footer con información de contacto

## Consideraciones de Desarrollo

El proyecto implementa las mejores prácticas de desarrollo web moderno, incluyendo:

- Separación clara entre componentes UI y secciones de contenido
- Uso de hooks de React para manejo de estado
- Implementación de diseño mobile-first
- Optimización de rendimiento con Next.js Image
- Código limpio y mantenible con estructura modular

## Contribución

Este proyecto forma parte de un portafolio profesional de desarrollo web. Para sugerencias o mejoras, se pueden crear issues en el repositorio de GitHub.

## Autor

Desarrollado por Daniel González como proyecto de demostración de habilidades en desarrollo frontend con React y Next.js.

## Licencia

Este proyecto es de uso educativo y de portafolio profesional.