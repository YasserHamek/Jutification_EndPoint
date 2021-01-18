import {NextFunction, Request, Response} from 'express';
import {Db} from '../Services/db'
import {decodedToken, TokenService} from '../Services/token'


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let tokenService: TokenService = new TokenService();

    try{
        const token: string = req.header('token');
        let verifiedToken: decodedToken = tokenService.verifyToken(token);

        let db: Db = new Db();

        if(db.isUserInDb(verifiedToken._email)){
            next()
        }
    } catch(e) {
        res.status(401).send("please get a valid token to continue");
    }
}