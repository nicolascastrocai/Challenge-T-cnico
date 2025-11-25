/**
 * Backend de Autenticación con Express y JWT
 * 
 * Este servidor proporciona endpoints para:
 * - Autenticación de usuarios (login)
 * - Acceso a rutas protegidas con JWT
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import users from './data/users.json';
import { User, LoginRequest, LoginResponse, UserResponse } from './types';
import { authMiddleware, AuthRequest } from './middleware/auth';

const app = express();
const PORT = 3000;

// IMPORTANTE: En producción, el secreto JWT debe estar en variables de entorno
// Ejemplo: const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const JWT_SECRET = 'mi_secreto_super_seguro_123';

// Configuración de middlewares
app.use(cors()); // Permite peticiones desde cualquier origen (configurar en producción)
app.use(express.json()); // Parsea el body de las peticiones como JSON

/**
 * POST /api/login
 * Endpoint de autenticación de usuarios
 * 
 * @body {string} email - Email del usuario
 * @body {string} password - Contraseña del usuario
 * @returns {LoginResponse} Token JWT y datos del usuario (sin password)
 */
app.post('/api/login', (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const { email, password } = req.body;

  // Validación: verificar que vengan los campos requeridos
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son requeridos' });
  }

  // Buscar el usuario en la "base de datos" (archivo JSON)
  // NOTA: En producción, esto debería ser una consulta a una base de datos real
  const user = (users as User[]).find(
    (u) => u.email === email && u.password === password
  );

  // Si no se encuentra el usuario o la contraseña no coincide
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Crear el payload del JWT (excluir información sensible como el password)
  const userPayload: UserResponse = {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    edad: user.edad,
    email: user.email,
  };

  // Generar el token JWT con expiración de 24 horas
  const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '24h' });

  // Responder con el token y los datos del usuario
  const response: LoginResponse = {
    token,
    user: userPayload,
  };

  res.json(response);
});

/**
 * GET /api/user
 * Ruta protegida - Obtener datos del usuario autenticado
 * 
 * Requiere header: Authorization: Bearer <token>
 * El middleware authMiddleware valida el token antes de ejecutar esta función
 * 
 * @returns {UserResponse} Datos del usuario autenticado
 */
app.get('/api/user', authMiddleware, (req: AuthRequest, res: Response) => {
  // El middleware ya validó el token y agregó el usuario al request
  // Por lo tanto, req.user contiene los datos decodificados del JWT
  res.json(req.user);
});

/**
 * GET /
 * Ruta de prueba para verificar que el servidor está funcionando
 */
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API de autenticación funcionando' });
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
