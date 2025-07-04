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
app.get('/',(req:Request,res:Response)=>{
  res.send(`
    <h1>📘 ProdFlow API Documentation</h1>
    <p>Welcome to the ProdFlow API. Here are some available routes:</p>

    <h2>Auth</h2>
    <ul>
      <li><strong>POST</strong> /user – Sign up</li>
      <li><strong>POST</strong> /signin – Sign in</li>
    </ul>

    <h2>Protected Routes (require JWT)</h2>
    <ul>
      <li><strong>GET</strong> /api/product – Get all products</li>
      <li><strong>GET</strong> /api/product/:id – Get one product</li>
      <li><strong>POST</strong> /api/product – Create product</li>
      <li>... and so on</li>
    </ul>

    <p>Add the JWT token in the <code>Authorization</code> header as <code>Bearer &lt;token&gt;</code>.</p>
  `);
})
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if(err.type ==='auth'){
    res.status(401).json({message:"unauthorized"})
  }else if (err.type = 'input'){
    res.status(400).json({message:"invalid input"})
  }else{
    res.status(500).json({message:"oops that's on us"})
  }
  console.error(err); // show full error in console
  res.status(500).json({ message: "There was an error!" });
});
export default app;