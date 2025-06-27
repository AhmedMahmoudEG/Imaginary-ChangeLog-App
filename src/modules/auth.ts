import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
interface JwtUserPayload {
  id: string;
  username: string;
}   
export const createJWT = (user: { id: any; username: any }) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401).json({ message: 'Not valid token' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtUserPayload;
    (req as any).user = payload; // OR (req as any).user = payload;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: 'Not valid token' });
  }
};

export const comparePassword = (password:string,hash:string) =>{
    //that's gonna return a promise that has true or false
    return bcrypt.compare(password,hash)
}
export const hashPassword = (password:string) =>{
    const saltRound=4
    const salt = bcrypt.genSalt(saltRound)
    return bcrypt.hash(password,saltRound)
}