import prisma from "../db";
import { NextFunction, Request,Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client';
import { AuthRequest } from "./interfaces/authRequest";
import { CreateUpdateBody } from "./interfaces/updateBody";




//how to get all updates for a user mean while update table doesn't know about the user 
//there's common table between them "product" that has belongtoID , updates []
//another solution by creating a new schema for user and updats 

export const getUpdates = async (req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        const updates = await prisma.update.findMany({
            where:{
                product:{
                    belongsToId:req.user!.id
    
                }
            },
    
        })
        res.status(200).json({data:updates})
    } catch (error) {
        error.type = 'input'
        next(error);
    }
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
        res.json({message:"nope"})
        return 
    }
    type UpdateStatus = 'IN_PROGRESS' | 'SHIPPED' | 'DEPRECATED';
    const update = await prisma.update.create({
        data: {
        title,
        body,
        status: req.body.status as UpdateStatus,
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

    const existing = await prisma.update.findFirst({
        where: {
            id: req.params.id,
            product: {
            belongsToId: req.user!.id,
            },
        },
        });
        if (!existing) {
            res.status(404).json({ message: 'Update not found or not authorized' });
        return 
    }

    const updated = await prisma.update.update({
        where:{
            id:req.params.id,
           // productID:req.user!.id
        },
        data:{
            body:req.body.body,
            title:req.body.title,
            status:req.body.status,
            version:req.body.version!
        }
    })
    res.json({data:updated})
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
