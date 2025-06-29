import express from 'express';
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
//custom middleware
const customLogger = (message: string) => (req: any,res: any,next: () => void)=>{
    console.log(`Hello from ${message}`)
    next();

}
app.use(customLogger("customer"));
//the protect only applys for the api path but will not be applied for user and signin cuz it doesnt make sense
app.use('/api',protect,router)
app.use('/user',createNewUser)
app.post('/signin',signin)
export default app;