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
  res.json({
    message: "📘 ProdFlow API Documentation",
    auth: {
      signup: {
        method: "POST",
        path: "/user",
        body: {
          username: "string",
          password: "string"
        }
      },
      signin: {
        method: "POST",
        path: "/signin",
        body: {
          username: "string",
          password: "string"
        }
      }
    },
    protectedRoutes: {
      note: "All routes under `/api` require JWT token in Authorization header: Bearer <token>",
      products: {
        getAll: { method: "GET", path: "/api/product" },
        getOne: { method: "GET", path: "/api/product/:id" },
        create: {
          method: "POST",
          path: "/api/product",
          body: { name: "string" }
        },
        update: {
          method: "PUT",
          path: "/api/product/:id",
          body: { name: "string" }
        },
        delete: { method: "DELETE", path: "/api/product/:id" }
      },
      updates: {
        getAll: { method: "GET", path: "/api/update" },
        getOne: { method: "GET", path: "/api/update/:id" },
        create: {
          method: "POST",
          path: "/api/update",
          body: {
            title: "string",
            body: "string",
            productID: "string"
          }
        },
        update: {
          method: "PUT",
          path: "/api/update/:id",
          body: {
            title: "string (optional)",
            body: "string (optional)",
            status: "IN_PROGRESS | SHIPPED | DEPRECATED",
            version: "string (optional)"
          }
        },
        delete: { method: "DELETE", path: "/api/update/:id" }
      },
      updatePoints: {
        getAll: { method: "GET", path: "/api/updatepoint" },
        getOne: { method: "GET", path: "/api/updatepoint/:id" },
        create: {
          method: "POST",
          path: "/api/updatepoint",
          body: {
            name: "string",
            description: "string",
            updateID: "string"
          }
        },
        update: {
          method: "PUT",
          path: "/api/updatepoint/:id",
          body: {
            name: "string (optional)",
            description: "string (optional)"
          }
        },
        delete: { method: "DELETE", path: "/api/updatepoint/:id" }
      }
    }
  });
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