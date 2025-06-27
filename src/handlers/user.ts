import prisma from '../db'
import { comparePassword, createJWT, hashPassword } from '../modules/auth'
import { Request, Response } from 'express';

interface UserInput{
    username: string,
    password: string
}
//create a function that allow me to create a user
export const createNewUser = async(req:Request<{},{},{username: string,
    password: string}>,res:Response) =>{
        //destructing the username and password from request body 
    const {username,password} = req.body
    const user = await prisma.user.create({
        data:{
            username,
            password: await hashPassword(password),
        }
    })
    const token = createJWT(user);
    res.status(201).json({token})
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