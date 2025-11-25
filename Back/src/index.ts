import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import users from './data/users.json';
import { User, LoginRequest, LoginResponse, UserResponse } from './types';
import { authMiddleware, AuthRequest } from './middleware/auth';

const app = express();
const PORT = 3000;
const JWT_SECRET = 'mi_secreto_super_seguro_123'; // En producción, esto debería estar en variables de entorno

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoint de login
app.post('/api/login', (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const { email, password } = req.body;

  // Validar que vengan los datos
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son requeridos' });
  }

  // Buscar el usuario
  const user = (users as User[]).find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Crear el payload del JWT (sin incluir el password)
  const userPayload: UserResponse = {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    edad: user.edad,
    email: user.email,
  };

  // Generar el token
  const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '24h' });

  // Responder con el token y los datos del usuario
  const response: LoginResponse = {
    token,
    user: userPayload,
  };

  res.json(response);
});

// Ruta protegida - Obtener datos del usuario autenticado
app.get('/api/user', authMiddleware, (req: AuthRequest, res: Response) => {
  // El middleware ya validó el token y agregó el usuario al request
  res.json(req.user);
});

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API de autenticación funcionando' });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
