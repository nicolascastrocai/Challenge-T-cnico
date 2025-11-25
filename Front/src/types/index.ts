export interface User {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
