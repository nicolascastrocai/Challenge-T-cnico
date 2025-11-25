/**
 * Middleware de Autenticación JWT
 * 
 * Este middleware protege las rutas verificando que el usuario
 * envíe un token JWT válido en el header Authorization
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserResponse } from '../types';

// Debe coincidir con el secreto usado para firmar los tokens
const JWT_SECRET = 'mi_secreto_super_seguro_123';

/**
 * Interfaz que extiende Request para incluir los datos del usuario autenticado
 * Esto permite acceder a req.user en las rutas protegidas
 */
export interface AuthRequest extends Request {
  user?: UserResponse;
}

/**
 * Middleware que valida el token JWT y agrega los datos del usuario al request
 * 
 * @param req - Request extendido con user
 * @param res - Response de Express
 * @param next - Función para continuar al siguiente middleware/ruta
 */
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Obtener el header Authorization de la petición
    const authHeader = req.headers.authorization;

    // Verificar que el header exista
    if (!authHeader) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Extraer el token del formato "Bearer TOKEN"
    // authHeader.split(' ') divide "Bearer TOKEN" en ["Bearer", "TOKEN"]
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Formato de token inválido' });
    }

    // Verificar y decodificar el token usando el secreto JWT
    // Si el token es inválido o expiró, jwt.verify lanza un error
    const decoded = jwt.verify(token, JWT_SECRET) as UserResponse;

    // Agregar los datos del usuario decodificados al objeto request
    // Esto permite que las rutas protegidas accedan a req.user
    req.user = decoded;

    // Continuar con la ejecución de la ruta
    next();
  } catch (error) {
    // Si hay cualquier error (token inválido, expirado, etc.)
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
