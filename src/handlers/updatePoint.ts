import { NextFunction, Request,Response } from "express";
import prisma from "../db";
import { AuthRequest } from "./interfaces/authRequest";
import { UpdatePointBody } from "./interfaces/updatePoint";
//import { CreateUpdatePointRequest } from "./interfaces/updatePoint";


//get all update points of product
//if i have userID I can get products 
//if i have products I can get the updates 
//if i have updates i can get updates points 
export const getUpdatePoints = async(req:AuthRequest,res:Response) => {
      try {
    const updatePoints = await prisma.updatePoint.findMany({
      where: {
        update: {
          product: {
            belongsToId: req.user!.id
          }
        }
      }
    })

    res.status(200).json({ data: updatePoints })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong while fetching update points' })
  }
}

//get on update point
export const oneUpdatePoint = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const updatePoint = await prisma.updatePoint.findFirst({
            where:{
                id:req.params.id
            }
        })
        if(!updatePoint){
            res.status(404).json({message:"there's no update point for this update"})
            return
        }
        res.status(200).json({ data: updatePoint });
    } catch(error:any){
        error.type = 'input'
        next(error);
    }
}
//create update point
export const createUpdatePoint = async (
  req: Request<{}, {}, UpdatePointBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, updateID } = req.body;

    const updatePoint = await prisma.updatePoint.create({
      data: {
        name,
        description,
        update: {
          connect: { id: updateID }
        }
      }
    });

     res.status(201).json({ data: updatePoint });
  } catch (err: any) {
    console.error("Create UpdatePoint Error:", err);
    next({ message: err.message || 'Unexpected error', type: 'input' });
  }
};

//update update point
export const updateUpPoint = async( req:Request,res:Response,next:NextFunction)=>{
    try {
        const updateupP = await prisma.updatePoint.update({
            where:{
                id:req.params.id
            },
            data:{
                name:req.body.name,
                description:req.body.description
            }
        })
        res.status(200).json({ data: updateupP });
    } catch (error: any) {
        console.error('Update UpdatePoint Error:', error);
        next({ message: error.message || 'Unexpected error', type: 'input' });
    }

}
//delete update point
export const deleteUPoint = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const deleteUP = await prisma.updatePoint.delete({
            where:{
                id:req.params.id
            }
        })
         res.status(200).json({ data: deleteUPoint });
  } catch (error: any) {
    console.error('Delete UpdatePoint Error:', error);
    next({ message: error.message || 'Unexpected error', type: 'input' });
  }
}