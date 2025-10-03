# 🕷️ Invitación Digital - Cumpleaños de Mateo N°4

Una invitación digital interactiva con temática de Spider-Man para celebrar el cuarto cumpleaños de Mateo. El proyecto incluye animaciones fluidas, audio inmersivo y una experiencia de usuario optimizada para dispositivos móviles y desktop.

## ✨ Características

- 🎬 **Animaciones fluidas** con GSAP y ScrollTrigger
- 🎵 **Audio inmersivo** con música y efectos de sonido
- 📱 **Diseño responsivo** optimizado para móviles y desktop
- 🕸️ **Temática Spider-Man** con elementos visuales personalizados
- 🎯 **Navegación por secciones** con scroll horizontal y gestos táctiles
- 🔄 **Control de reproducción** automático de video y audio
- 🎨 **Interfaz moderna** con Tailwind CSS

## 🚀 Estructura del Proyecto

```text
/
├── src/
│   ├── assets/                 # Recursos multimedia
│   │   ├── audio/             # Archivos de audio (música, efectos)
│   │   ├── *.png              # Imágenes (logo, fondos, iconos)
│   │   └── *.svg              # Iconos vectoriales
│   ├── components/            # Componentes de Astro
│   │   ├── Modal.astro        # Modal de bienvenida con audio
│   │   ├── Hero.astro         # Sección principal con video
│   │   └── Sections.astro     # Secciones deslizantes de contenido
│   ├── layouts/
│   │   └── Layout.astro       # Layout base con meta tags y estilos
│   ├── libs/
│   │   ├── animations.ts      # Lógica de animaciones GSAP
│   │   └── animations.d.ts    # Tipos TypeScript para animaciones
│   ├── pages/
│   │   └── index.astro        # Página principal
│   └── styles/
│       └── global.css         # Estilos globales con Tailwind
├── astro.config.mjs           # Configuración de Astro
├── tsconfig.json              # Configuración de TypeScript
└── package.json               # Dependencias y scripts
```

## 🎯 Arquitectura de Animaciones

El proyecto utiliza un sistema de animaciones modular basado en GSAP:

### \`sectionsController\`
Controlador principal que maneja:
- Navegación entre secciones con scroll horizontal
- Detección de gestos táctiles (swipe)
- Sincronización de animaciones
- Control de estado (sección actual, animación en progreso)

### Funciones principales:
- \`initAnimations()\` - Inicializa todo el sistema de animaciones
- \`setHeroAnimation()\` - Configura animaciones del hero
- \`setSectionsAnimation()\` - Configura animaciones de secciones
- \`goToSection()\` - Navega a una sección específica

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| \`pnpm install\`            | Instala las dependencias                        |
| \`pnpm dev\`                | Inicia servidor de desarrollo en \`localhost:4321\` |
| \`pnpm build\`              | Construye el sitio para producción en \`./dist/\` |
| \`pnpm preview\`            | Previsualiza la build localmente                |
| \`pnpm astro ...\`          | Ejecuta comandos CLI como \`astro add\`, \`astro check\` |

## 🛠️ Tecnologías Utilizadas

- **[Astro](https://astro.build/)** - Framework web moderno
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de estilos
- **[GSAP](https://greensock.com/gsap/)** - Animaciones de alta performance
  - ScrollTrigger - Animaciones basadas en scroll
  - Observer - Detección de gestos táctiles
  - ScrollToPlugin - Navegación suave
- **[Sharp](https://sharp.pixelplumbing.com/)** - Optimización de imágenes

## �� Funcionalidades Interactivas

### Modal de Bienvenida
- Reproducción automática de audio de introducción
- Transición a música de fondo al completarse
- Control de pausa/reproducción al cambiar de pestaña

### Navegación de Secciones
- Scroll horizontal automático entre secciones
- Soporte para gestos de swipe en dispositivos táctiles
- Navegación con rueda del mouse
- Snap automático a la sección más cercana

### Animaciones del Hero
- Video de fondo con controles de reproducción inteligentes
- Animaciones de logo con fade in/out
- Efectos de parallax en elementos
- Flecha animada para indicar scroll

## 🌐 Optimizaciones

- **Imágenes responsivas** con múltiples resoluciones
- **Carga diferida** de recursos multimedia
- **Compresión automática** de imágenes con Sharp
- **Prefetch** de recursos críticos
- **Meta tags optimizados** para SEO y redes sociales

## 📱 Compatibilidad

- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Dispositivos móviles iOS/Android

## 🚀 Despliegue

El proyecto está configurado para generación estática (\`output: 'static'\`) y puede desplegarse en cualquier servidor web estático como:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Para desplegar:

```sh
pnpm build
# Los archivos estáticos se generan en ./dist/
```

## 🎨 Personalización

Para adaptar el proyecto a otros eventos:

1. **Reemplazar assets** en \`src/assets/\`
2. **Modificar contenido** en los componentes de \`src/components/\`
3. **Ajustar colores** en las clases de Tailwind CSS
4. **Personalizar animaciones** en \`src/libs/animations.ts\`

## 📄 Licencia

Este proyecto fue creado para un evento privado. El código está disponible como referencia educativa.
