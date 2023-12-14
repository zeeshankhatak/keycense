import { Request, Response } from 'express';
import { jwtSecret } from '../../config/jwt.config'
import jwt from 'jsonwebtoken';
import { User } from '../../types/User.types'
import fs from 'fs'

const userDataFile = './data/users.json';
let users: User[] = JSON.parse(fs.readFileSync(userDataFile, 'utf-8'));

export const login = (req: Request, res: Response) => {
  const {username, password} = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) return res.status(400).json({message: 'Bad Request'});

  const token = jwt.sign({username: user.username}, jwtSecret);
  res.json({token});
}
