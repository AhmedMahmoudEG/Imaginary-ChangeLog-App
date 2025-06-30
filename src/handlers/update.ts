import { body } from "express-validator";
import prisma from "../db";
import { Request,Response } from "express";
import { UPDATE_STATUS } from "../generated/prisma";
interface AuthenticatedUser {
  id: string;
  username: string;
}

interface AuthRequest<T = any> extends Request {
  user?: AuthenticatedUser;
  body: T;
}
interface CreateUpdateBody {
  productID: string;
  title: string;
  body: string;
  status?: string;
  version?: string;
  asset?: string;
  updatedAt?: string;
}
//how to get all updates for a user mean while update table doesn't know about the user 
//there's common table between them "product" that has belongtoID , updates []
//another solution by creating a new schema for user and updats 

export const getUpdates = async (req:AuthRequest,res:Response)=>{
    const updates = await prisma.update.findMany({
        where:{
            product:{
                belongsToId:req.user!.id

            }
        },

    })
    res.status(200).json({data:updates})
}
export const getOneUpdate = async (req:AuthRequest,res:Response)=>{
    const prodID = req.params.id
    const update = await prisma.update.findFirst({
        where:{
            id:prodID,
            /*
            product:{
             belongsToId:req.user!.id
            }
             */
        }
    })
     res.status(200).json({ data: update });
}

export const createUpdate = async (req:AuthRequest<CreateUpdateBody>,res:Response) =>{
    const { productID, title, body, status, version, asset, updatedAt } = req.body;
    const product = await prisma.product.findFirst({
        where:{
            id:productID,
            belongsToId:req.user!.id
        }
    })
    if(!product){
        return res.json({message:"nope"})
    }
    const update = await prisma.update.create({
        data: {
        title,
        body,
        status: req.body.status as UPDATE_STATUS,
        version,
        asset,
        updatedAt: req.body.updatedAt ?? new Date(),
        product: {
            connect: {
            id: productID,
            },
        },
        },
    });
    res.status(200).json({data:update})
}
export const updated = async (req:AuthRequest,res:Response) => {
    const upID = req.params.id
    const updated = await prisma.update.update({
        where:{
            id:upID,
            productID:req.user!.id
        },
        data:{
            body:req.body.body,
            title:req.body.title,
            status:req.body.status
        }
    })
}
export const deleteUpdate = async(req:AuthRequest,res:Response) =>{
    const upID = req.params.id;
    const deleted = await prisma.update.delete({
        where:{
            id:upID,
            productID: req.user!.id
        }
    })
    res.status(200).json({data:deleted})
}
