import express from 'express';
import { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser'

import { User } from '../Model/User';
import { Db } from '../Services/db'
import { TokenService } from '../Services/token';
import { Justification } from '../Services/justification'
import { authMiddleware } from '../Services/middleware'
import { rateCheking } from '../Services/middleware'

const app = express();
const port = 5000;

app.use(bodyParser.json())
//app.use(bodyParser.text())

//initialisation

const tokenService = new TokenService();
const db = new Db();
const m = async ()=>{
  await db.singUp(new User('yasser@yasser',0,0));
  db.findUser('yasser@yasser').then((user)=>{
    console.log('111111111111111111111111',user)
  });
  console.log('2222222222222222222222222');
}

m();


app.post('/api/jutify', authMiddleware, rateCheking,  (req: Request, res: Response, next: NextFunction) => {  
  const justify: Justification = new Justification();
  const text: string = req.body.text;

  try{
    const textjustified: string = justify.MainJustificationMethod(text);
    res.status(200).json(textjustified).send();
  } catch(e) {
    console.log(e);
    res.status(500).send({ errorMessage: 'internal server error' });
  }

})


app.post('/api/token', async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email) {
    return res.status(400).send({ errorMessage: 'An email must be provided!' });
  }
  try{
    
    const db = new Db();

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


app.listen(port, () => console.log(`[INDEX.TS] Running on port ${port}`))

/*const verifyToken = (req : any, res: any, next: any) => {
  const { token } = req.body;
  if (token === 'valid-token') {
    next()
  } else {
    res.status(400).send();
  }
}

app.get('endpoint', /*middleware1, middleware2, (req, res, next) => {
    console.log('hello')
    next()
})

app.get('/api/justify', verifyToken, (_, res) => {
  res.header("Content-Type", "text/plain");
  res.status(404).send({ result: "not at all ok" })
})*/