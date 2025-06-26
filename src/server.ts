import express from 'express';
import router from './router';
import morgan from 'morgan'
import cors from 'cors'
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
app.get('/',(req,res)=>{
    console.log('hello from express')
    res.status(200);
    res.json({message:"hello"})
})
app.use('/api',router)

export default app;