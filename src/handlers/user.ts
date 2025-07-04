import prisma from '../db'
import { comparePassword, createJWT, hashPassword } from '../modules/auth'
import { NextFunction, Request, Response } from 'express';
import { UserInput } from './interfaces/user';

//create a function that allow me to create a user
export const createNewUser = async(req:Request<{},{},{username: string,
    password: string}>,res:Response,next:NextFunction) =>{
        //destructing the username and password from request body 
        //how to catch an async error ? using try and catch 
    try {
      const {username,password} = req.body
      const user = await prisma.user.create({
          data:{
              username,
              password: await hashPassword(password),
          }
      })
      const token = createJWT(user);
      res.status(201).json({token})
    } catch (error:any) {
      error.type = 'input'
      next(error);
    }
}

//create a function that allow me to signin 
export const signin = async (
  req: Request<{}, {}, UserInput>,
  res: Response
) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (!user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }
  const isValid = await comparePassword(req.body.password, user.password);
  if (!isValid) {
    res.status(401).json({ message: 'Password incorrect' });
    return;
  }
  const token = createJWT(user);
  res.json({ token });
};