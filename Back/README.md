# Backend - API de Autenticación

Backend de autenticación con Express, TypeScript y JWT para el challenge técnico.

## Tecnologías

- **Node.js** v20+
- **Express** - Framework web
- **TypeScript** - Tipado estático
- **JSON Web Token (JWT)** - Autenticación
- **CORS** - Manejo de peticiones cross-origin

## Requisitos Previos

- Node.js versión 20.19+ o 22.12+
- npm (incluido con Node.js)

## Instalación

1. Navegar a la carpeta del backend:
```bash
cd Back
```

2. Instalar las dependencias:
```bash
npm install
```

## Ejecución

### Modo Desarrollo
```bash
npm run dev
```
El servidor se iniciará en `http://localhost:3000`

### Modo Producción
```bash
npm run build
npm start
```

## Estructura del Proyecto

```
Back/
├── src/
│   ├── data/
│   │   └── users.json          # Base de datos de usuarios (JSON)
│   ├── middleware/
│   │   └── auth.ts             # Middleware de autenticación JWT
│   ├── types/
│   │   └── index.ts            # Definiciones de tipos TypeScript
│   └── index.ts                # Punto de entrada de la aplicación
├── package.json
└── tsconfig.json
```

## Endpoints

### POST /api/login
Autenticación de usuario.

**Request Body:**
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "edad": 28,
    "email": "juan@example.com"
  }
}
```

**Response (401):**
```json
{
  "message": "Credenciales inválidas"
}
```

### GET /api/user
Obtener datos del usuario autenticado (ruta protegida).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "edad": 28,
  "email": "juan@example.com"
}
```

**Response (401):**
```json
{
  "message": "Token no proporcionado"
}
```

## Usuarios de Prueba

| Email | Password | Nombre | Apellido | Edad |
|-------|----------|--------|----------|------|
| juan@example.com | 123456 | Juan | Pérez | 28 |
| maria@example.com | 123456 | María | González | 32 |
| carlos@example.com | 123456 | Carlos | Rodríguez | 25 |

## Configuración

El secreto JWT está definido en `src/index.ts`. En producción, debería estar en variables de entorno:

```typescript
const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro_123';
```

## Dependencias Principales

```json
{
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5"
}
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con hot reload
- `npm run build` - Compila el proyecto TypeScript a JavaScript
- `npm start` - Inicia el servidor en modo producción

## Notas

- Los usuarios están almacenados en un archivo JSON (`src/data/users.json`)
- Las contraseñas están en texto plano (solo para desarrollo/pruebas)
- El token JWT expira en 24 horas
- CORS está habilitado para todas las origins (configurar en producción)
