import { deepStrictEqual } from 'assert';
import {NextFunction, Request, Response} from 'express';
import { User } from '../Model/user';
import {Db} from '../Services/db'
import {decodedToken, TokenService} from '../Services/token'

const db: Db = new Db();
const maxWords: number =80000;

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const tokenService: TokenService = new TokenService();

    try{
        const token: string = req.header('token');
        const verifiedToken: decodedToken = tokenService.verifyToken(token);

        if(db.isUserInDb(verifiedToken._email)){
            res.locals.user = await db.findUser(verifiedToken._email);
            next() 
        } else {
            throw new Error();
        }
    } catch(e) {
        res.status(401).send({errorMessage :"to continue, please get a valid token or register in database"});
    }
}

export const rateCheking = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.text) {
        return res.status(400).send({ errorMessage: 'A text must be provided!' })
    }
    const textToBeVerified : string[] = req.body.text.split(' ');

    if(textToBeVerified.length > maxWords){
        return res.status(402).send({ errorMessage: 'Processing text that contain more than 80 000 words not possible in the free formule, Payement Required' })
    }
    
    try{
        let user : User = res.locals.user;
        if(user.expireTime === 0 || user.expireTime > new Date().getTime()){
            //here user didn't try to justify text yet
            user.expireTime = new Date().getTime()+86400000; // 24h in milisecond;
            user.rateCounter=textToBeVerified.length;
            db.updateUser(user.email, user.expireTime, user.rateCounter);
            next();

        } else if ( user.expireTime < new Date().getTime() && user.rateCounter + textToBeVerified.length < maxWords ) {
            user.rateCounter += textToBeVerified.length;
            db.updateUser(user.email,user.expireTime,user.rateCounter);
            next();

        } else if ( user.expireTime < new Date().getTime() && user.rateCounter + textToBeVerified.length >= maxWords ) {
            return res.status(402).send({ errorMessage: ' 80 000 words per day has been consumed, Payement Required to continue ' })
        } 

    } catch (e) {
        res.status(500).send({errorMessage: 'internal server error'});
    }
}