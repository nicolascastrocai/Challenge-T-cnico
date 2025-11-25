# Frontend - Aplicación de Autenticación

Frontend de autenticación con React, TypeScript y Vite para el challenge técnico.

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación y rutas
- **CSS Modules** - Estilos componetizados

## 📋 Requisitos Previos

- Node.js versión 20.19+ o 22.12+
- npm (incluido con Node.js)
- Backend corriendo en `http://localhost:3000`

## 🔧 Instalación

1. Navegar a la carpeta del frontend:
```bash
cd Front
```

2. Instalar las dependencias:
```bash
npm install
```

## ▶️ Ejecución

### Modo Desarrollo
```bash
npm run dev
```
La aplicación se iniciará en `http://localhost:5173`

### Modo Producción
```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
Front/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.tsx    # HOC para proteger rutas
│   ├── config/
│   │   └── api.ts                # Configuración de API y headers
│   ├── pages/
│   │   ├── Login.tsx             # Página de login
│   │   └── Dashboard.tsx         # Página protegida con datos del usuario
│   ├── styles/
│   │   ├── Login.css             # Estilos del login
│   │   └── Dashboard.css         # Estilos del dashboard
│   ├── types/
│   │   └── index.ts              # Definiciones de tipos TypeScript
│   ├── App.tsx                   # Componente principal con rutas
│   ├── main.tsx                  # Punto de entrada
│   └── index.css                 # Estilos globales
├── package.json
└── vite.config.ts
```

## 🔐 Funcionalidades

### Login
- Formulario de autenticación con validación
- Diseño personalizado con logo de Rentmote
- Manejo de errores
- Guardado de token JWT en localStorage

### Dashboard
- Pantalla protegida que requiere autenticación
- Muestra información del usuario (nombre, apellido, edad, email)
- Avatar con iniciales del usuario
- Botón de logout

### Protección de Rutas
- Redirección automática al login si no hay token
- Validación de token en rutas protegidas
- Limpieza de localStorage al cerrar sesión

## 🛣️ Rutas

| Ruta | Componente | Protegida | Descripción |
|------|-----------|-----------|-------------|
| `/` | Login | No | Página de inicio de sesión |
| `/dashboard` | Dashboard | Sí | Página con datos del usuario |
| `*` | - | - | Redirección a `/` |

## 👥 Usuarios de Prueba

Usar las mismas credenciales del backend:

| Email | Password |
|-------|----------|
| juan@example.com | 123456 |
| maria@example.com | 123456 |
| carlos@example.com | 123456 |

## 🎨 Características de Diseño

- Logo personalizado de Rentmote con 4 barras en degradado
- Formulario con inputs con fondo gris claro
- Botón verde para login
- Tarjetas con información del usuario
- Avatar circular con gradiente
- Diseño responsive

## 📦 Dependencias Principales

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "typescript": "~5.6.2",
  "vite": "^7.2.4"
}
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con hot reload
- `npm run build` - Compila el proyecto para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🔗 Conexión con el Backend

La URL del backend está configurada en `src/config/api.ts`:

```typescript
export const API_URL = 'http://localhost:3000/api';
```

## 📝 Notas

- El token JWT se guarda en localStorage
- Los datos del usuario también se guardan en localStorage
- La aplicación verifica la existencia del token antes de acceder a rutas protegidas
- Al cerrar sesión, se limpian todos los datos del localStorage
