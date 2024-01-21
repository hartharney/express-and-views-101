import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { userInstance } from "../models/userSchema";


const jwtSecret = process.env.JWT_SECRET as string;

export async function auth(req:Request | any, res:Response, next: NextFunction){
    // const token = req.header('Authorization')?.replace('Bearer ', '');
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized, token expired..."
        })
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);

      
        
        const { id } = decoded as {[key:string] : string};

        const user = await userInstance.findOne({
            where: {
                id
            }
        })

        if(!user){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}