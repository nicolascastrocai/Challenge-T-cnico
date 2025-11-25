# Challenge Técnico - Autenticación con React + Express

Aplicación full stack de autenticación básica con React en el frontend y Express con JWT en el backend.

## Descripción del Proyecto

Este proyecto implementa un sistema completo de autenticación que incluye:

- **Backend**: API REST con Express y TypeScript que maneja autenticación mediante JWT
- **Frontend**: Aplicación React con TypeScript que consume la API y maneja el flujo de login/logout
- **Protección de rutas**: Sistema de rutas protegidas que requieren autenticación
- **Persistencia de sesión**: Uso de localStorage para mantener la sesión activa

## Tecnologías Utilizadas

### Backend
- Node.js v20+
- Express
- TypeScript
- JSON Web Token (JWT)
- CORS

### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- CSS

## Estructura del Proyecto

```
Challenge Técnico/
├── Back/                   # Backend (Express + TypeScript)
│   ├── src/
│   │   ├── data/          # Base de datos JSON
│   │   ├── middleware/    # Middleware de autenticación
│   │   ├── types/         # Definiciones TypeScript
│   │   └── index.ts       # Punto de entrada
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── Front/                  # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── config/        # Configuración de API
│   │   ├── pages/         # Páginas (Login, Dashboard)
│   │   ├── styles/        # Estilos CSS
│   │   └── types/         # Definiciones TypeScript
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
└── README.md              # Este archivo
```

## Instalación y Ejecución

### Requisitos Previos
- Node.js versión 20.19+ o 22.12+
- npm (incluido con Node.js)

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd "Challenge Técnico"
```

### 2. Instalar y ejecutar el Backend

```bash
cd Back
npm install
npm run dev
```

El servidor backend estará disponible en `http://localhost:3000`

### 3. Instalar y ejecutar el Frontend

En otra terminal:

```bash
cd Front
npm install
npm run dev
```

La aplicación frontend estará disponible en `http://localhost:5173`

## Usuarios de Prueba

| Email | Password | Nombre | Apellido | Edad |
|-------|----------|--------|----------|------|
| juan@example.com | 123456 | Juan | Pérez | 28 |
| maria@example.com | 123456 | María | González | 32 |
| carlos@example.com | 123456 | Carlos | Rodríguez | 25 |

## Flujo de Autenticación

1. **Login**: El usuario ingresa email y password en el formulario
2. **Validación**: El backend valida las credenciales contra el archivo JSON
3. **Token JWT**: Si las credenciales son correctas, el backend genera un token JWT
4. **Almacenamiento**: El frontend guarda el token y los datos del usuario en localStorage
5. **Redirección**: El usuario es redirigido al dashboard
6. **Acceso protegido**: Las rutas protegidas verifican la existencia del token
7. **Logout**: Al cerrar sesión, se eliminan el token y los datos del localStorage

## Endpoints de la API

### POST /api/login
Autenticación de usuario

**Request:**
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Response:**
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

### GET /api/user
Obtener datos del usuario autenticado (requiere token)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "edad": 28,
  "email": "juan@example.com"
}
```

## Características Implementadas

### Backend
- ✅ Endpoint de login con validación de credenciales
- ✅ Generación de tokens JWT con expiración de 24h
- ✅ Middleware de autenticación para rutas protegidas
- ✅ Validación de tokens JWT
- ✅ Manejo de errores y respuestas HTTP apropiadas
- ✅ CORS habilitado
- ✅ TypeScript con tipado estricto

### Frontend
- ✅ Formulario de login con validación
- ✅ Diseño personalizado con logo de Rentmote
- ✅ Manejo de estados de carga y errores
- ✅ Guardado de token en localStorage
- ✅ Dashboard con información del usuario
- ✅ Avatar con iniciales del usuario
- ✅ Protección de rutas con ProtectedRoute
- ✅ Redirección automática si no hay token
- ✅ Funcionalidad de logout
- ✅ TypeScript con tipado estricto
- ✅ Diseño responsive

## Notas Importantes

### Seguridad
- Las contraseñas están en texto plano (solo para desarrollo/pruebas)
- El secreto JWT está hardcodeado (en producción debe estar en variables de entorno)
- CORS está abierto a todos los orígenes (configurar en producción)

### Mejoras para Producción
- Implementar hash de contraseñas (bcrypt)
- Usar variables de entorno para secretos
- Implementar refresh tokens
- Agregar rate limiting
- Configurar CORS específicamente
- Usar base de datos real (PostgreSQL, MongoDB, etc.)
- Implementar validación de datos más robusta
- Agregar tests unitarios e integración

## Documentación Adicional

Para más detalles sobre cada parte del proyecto, consultar los README específicos:

- [Backend README](./Back/README.md)
- [Frontend README](./Front/README.md)

## Desarrollo

El proyecto fue desarrollado siguiendo buenas prácticas:

- Código comentado y documentado
- Tipado estricto con TypeScript
- Estructura de carpetas organizada
- Separación de responsabilidades
- Manejo apropiado de errores
- Código reutilizable y mantenible

## Licencia

Este proyecto es parte de un challenge técnico.
