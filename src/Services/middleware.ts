import { NextFunction, Request, Response } from 'express';
import { User } from './../Model/user';
import { Db } from './../Services/db'
import { DecodedToken, TokenService } from './../Services/tokenService'

const db: Db = new Db();
const maxWords: number =80000;

//check if the user is have a valid token
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const tokenService: TokenService = new TokenService();

    try{

        if (!req.header('token')) {
            return res.status(401).send({ errorMessage: 'to continue, please get insert a token in header' })
        }
        const token: string = req.header('token');
        let verifiedToken: DecodedToken;
        let isUserInDb: boolean;

        try{
            verifiedToken = tokenService.verifyToken(token);
            isUserInDb = await db.isUserInDb(verifiedToken._email);
        } catch (e){
            console.log(e)
            return res.status(401).send({ errorMessage: 'to continue, please get a valid token' })
        }

        if(isUserInDb){
            res.locals.user = await db.findUser(verifiedToken._email);
            next() 
        } else {
            return res.status(401).send({errorMessage :"to continue, please register in database"});
        }

    } catch(e) {
        console.log(e);
        return res.status(500).send({ errorMessage: 'internal server error' });
    }
}

//check if the user reached the words rate limit
export const rateCheking = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return res.status(400).send({ errorMessage: 'A text must be provided!' })
    }
    const textToBeVerified : string[] = req.body.split(' ');

    if(textToBeVerified.length > maxWords){
        return res.status(402).send({ errorMessage: 'Processing text that contain more than 80 000 words not possible in the free formule, Payement Required' })
    }
    
    try{
        let user: User = res.locals.user;

        if(user.ratecounter === 0 || user.expiretime > new Date().getTime()){
            //this case, is the first time the user tried to justify a text after getting a token
            user.expiretime = new Date().getTime()+86400000; // 24h in milisecond;
            user.ratecounter=textToBeVerified.length;
            await db.updateUser(user.email, user.expiretime, user.ratecounter);
            next();

        } else if ( user.expiretime < new Date().getTime() && +user.ratecounter + +textToBeVerified.length < maxWords ) {
            user.ratecounter = +user.ratecounter + +textToBeVerified.length;
            await db.updateUser(user.email,user.expiretime,user.ratecounter);
            next();
           
        } else if ( user.expiretime < new Date().getTime() && +user.ratecounter + +textToBeVerified.length >= maxWords ) {
            return res.status(402).send({ errorMessage: ' 80 000 words per day has been consumed, Payement Required to continue ' })
        } 

    } catch (e) {
        console.log(e);
        return res.status(500).send({errorMessage: 'internal server error'});
    }
}

//check if the header is in correct format
export const headerChecking = async (req: Request, res: Response, next: NextFunction) =>{
    if(req.header("Content-Type")!="text/plain"){
        return res.status(400).send({ errorMessage: 'A header of type : "text/plain" must be provided!' })
    }
    next();
}
