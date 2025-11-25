import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserResponse } from '../types';

const JWT_SECRET = 'mi_secreto_super_seguro_123';

// Extender el tipo Request para incluir el usuario
export interface AuthRequest extends Request {
  user?: UserResponse;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // El formato esperado es: "Bearer TOKEN"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Formato de token inválido' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET) as UserResponse;

    // Agregar el usuario al request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
