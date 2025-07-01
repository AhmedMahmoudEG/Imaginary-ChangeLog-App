import express, { Request, Response, NextFunction } from 'express';
import router from './router';
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';
//I need to make the api
const app =express();
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
//google.com?q=test,another=thing it encodes it 

//the protect only applys for the api path but will not be applied for user and signin cuz it doesnt make sense
app.use('/api',protect,router)
app.use('/user',createNewUser)
app.post('/signin',signin)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // show full error in console
  res.status(500).json({ message: "There was an error!" });
});
export default app;