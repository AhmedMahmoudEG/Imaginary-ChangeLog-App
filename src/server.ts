import express, { Request, Response, NextFunction } from 'express';
import router from './router';
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
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
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/',(req:Request,res:Response)=>{
  res.send(`
    <h1>📘 ProdFlow API Overview</h1>
    <p>This is the backend API for ProdFlow. Visit <a href="/docs" target="_blank">/docs</a> for full Swagger documentation.</p>

    <h2>🧑‍💻 Authentication</h2>
    <ul>
      <li><strong>POST</strong> /user – Sign up with <code>{ username, password }</code></li>
      <li><strong>POST</strong> /signin – Sign in with <code>{ username, password }</code></li>
    </ul>

    <h2>📦 Product Routes (JWT required)</h2>
    <ul>
      <li><strong>GET</strong> /api/product – List all products</li>
      <li><strong>GET</strong> /api/product/:id – Get a product by ID</li>
      <li><strong>POST</strong> /api/product – Create with <code>{ name }</code></li>
      <li><strong>PUT</strong> /api/product/:id – Update with <code>{ name }</code></li>
      <li><strong>DELETE</strong> /api/product/:id – Delete by ID</li>
    </ul>

    <h2>🆕 Update Routes (JWT required)</h2>
    <ul>
      <li><strong>GET</strong> /api/update – List all updates</li>
      <li><strong>GET</strong> /api/update/:id – Get update by ID</li>
      <li><strong>POST</strong> /api/update – Create with <code>{ title, body, productID }</code></li>
      <li><strong>PUT</strong> /api/update/:id – Update with optional <code>{ title, body, version }</code> and required <code>status: IN_PROGRESS | SHIPPED | DEPRECATED</code></li>
      <li><strong>DELETE</strong> /api/update/:id – Delete by ID</li>
    </ul>

    <h2>📍 UpdatePoint Routes (JWT required)</h2>
    <ul>
      <li><strong>GET</strong> /api/updatepoint – List all update points</li>
      <li><strong>GET</strong> /api/updatepoint/:id – Get update point by ID</li>
      <li><strong>POST</strong> /api/updatepoint – Create with <code>{ name, description, updateID }</code></li>
      <li><strong>PUT</strong> /api/updatepoint/:id – Update with optional <code>{ name, description }</code></li>
      <li><strong>DELETE</strong> /api/updatepoint/:id – Delete by ID</li>
    </ul>

    <p>🔐 All <code>/api/*</code> routes require an <code>Authorization: Bearer &lt;your-token&gt;</code> header.</p>
    <p>📚 For full, testable docs go to <a href="/docs">/docs</a>.</p>
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