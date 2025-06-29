import { validationResult } from "express-validator";
import { Request,Response,NextFunction } from "express";

export const handleInputErrors =(req:Request,res:Response,next:NextFunction) =>{
     const errors = validationResult(req)
        console.log(errors)
        if(!errors.isEmpty()){
            res.status(400).json({errors:errors.array()})}
            else{
            next()
        }
}
