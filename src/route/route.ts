import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { User } from './../Model/user';
import { Db } from './../Services/db'
import { Justification } from './../Services/justification'
import { authMiddleware, headerChecking, rateCheking } from './../Services/middleware'
import { TokenService } from './../Services/tokenService';

export const Router = express.Router();

//initialisation
const tokenService = new TokenService();
const db = new Db();


/**
 * @header content-type text/plain
 * @body text to be justified
 * @returns words left and justified text
 */
Router.post('/api/justify', authMiddleware, headerChecking, rateCheking,  (req: Request, res: Response, next: NextFunction) => {  
    const justify: Justification = new Justification();
    const text: string = req.body;
  
    try{
      let user: User =res.locals.user;
      const wordsLeft: number = 80000 -user.ratecounter;
      const textjustified: string = justify.MainJustificationMethod(text);
      console.log(textjustified);
      res.status(200).json({"wordsLeft": wordsLeft,"textjustified": textjustified}).send();
  
    } catch(e) {
      console.log(e);
      res.status(500).send({ errorMessage: 'internal server error' });
    }
  })
  
  
  /**
   * @body email as json
   * @returns a token
   */
  Router.post('/api/token', async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email) {
      return res.status(400).send({ errorMessage: 'An email must be provided!' });
    }
  
    try{
      const email: string = <string>req.body.email;
      const isUserInDb: boolean = await db.isUserInDb(email);
      const token: string = tokenService.tokenGeneration(email);
  
      if(isUserInDb){
        res.send(token)
  
      } else {
        let user: User = new User(email,0,0);
        await db.singUp(user);
        res.send({user,token});
      }
    } catch(e) {
      console.log(e);
      res.status(500).send({ errorMessage: 'internal server error' });
    }
  })
  