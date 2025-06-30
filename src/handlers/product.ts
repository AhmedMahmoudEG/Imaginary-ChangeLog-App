import prisma from "../db"
import { Request,Response } from "express"
interface AuthenticatedUser {
  id: string;
  username: string;
}

interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}
// get all products
export const getProducts = async(req:AuthRequest,res:Response) =>{
     const user = await prisma.user.findUnique({
        where:{
            id: req.user!.id
        },
        include:{
            products: true
        }
     })
     res.json({data:user?.products||[]})
}
//to get one product you need to have the id of the product to trigger the route of it 
//'product/id
export const getOneProduct = async (req:AuthRequest,res:Response)=>{
    const id = req.params.id
    const product = await prisma.product.findUnique({
        where: {
        id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user!.id
      }
    }
    })
    res.status(200).json({data:product})
}
export const createProduct = async(req:AuthRequest,res:Response)=>{
        const product = await prisma.product.create({
            data:{
                name: req.body.name,
                belongsToId : req.user!.id
            }
        })
        res.status(201).json({ data: product });
}
export const updateProduct = async(req:AuthRequest,res:Response)=>{
    const update = await prisma.product.update({
        where:{
            id_belongsToId:{
                id: req.params.id,
                belongsToId : req.user!.id
            }
            
        },
        data:{
            name : req.body.name
        }
    })
    res.status(200).json({data:update})
}

export const deleteProduct = async (req:AuthRequest,res:Response)=>{
    const deleted = await prisma.product.delete({
        where:{
            id_belongsToId:{
                id: req.params.id,
                belongsToId : req.user!.id
            }
        }
    })
    res.status(200).json({data:deleted})
}