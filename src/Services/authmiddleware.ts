import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {Db} from '../Services/db'
import {TokenService} from '../Services/token'


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let tokenService: TokenService = new TokenService();

    try{
        const token = req.header('token');
        let verifiedToken = tokenService.verifyToken(token);
        
        //verifiedToken.email;

        let db: Db = new Db();

        //db.findUser(decoded.email ,token)


    } catch {

    }
}