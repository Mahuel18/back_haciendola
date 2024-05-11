import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
      interface Request {
          id?: string;
      }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado' });
    }

    jwt.verify(token, 'Cred', (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Acceso no autorizado, token inválido' });
        }
        req.id = user.id;
        next();
    });
};