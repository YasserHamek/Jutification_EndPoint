import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {Db} from '../Services/db'

export const authMiddleware = async (req: Request, res: Response, next) => {
    try{
        const token = req.header('token').replace('Bearer ','');
        const decoded = jwt.verify(token,'justifyendpoint');
        
        let db: Db = new Db();

        db.findUser(decoded.email ,token)


    } catch {

    }
}