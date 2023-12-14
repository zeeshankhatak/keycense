import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtSecret } from '../config/jwt.config'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({message: 'Unauthorized'})
  }

  jwt.verify(token, jwtSecret, (err: any) => {
    if (err) {
      return res.status(403).json({message: 'Forbidden'})
    }
    next();
  });
};
