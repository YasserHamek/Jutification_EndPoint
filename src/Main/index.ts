//validator for email validation 
import { Request, Response } from 'express';
import express from 'express';

import { User } from '../Model/User';
import {Db} from '../Services/db'
import { TokenService } from '../Services/token';



const app = express();
const port = 5000;

const db = new Db();
const tokenService = new TokenService();

app.get('/api/jutify', (req: Request, res: Response, next) => {
  res.send(db.singUp('yasseryasser@','tokentoken',0).then((value)=>value.rows));
  
  //res.send(db.isUserInDb(req.params.email).then((value) => value.rows));
  next();
})

app.post('/api/token', (req: Request, res: Response, next) => {
  console.log('coucou0')
  if(db.isUserInDb(req.params.email)){
  console.log('********************'+db.isUserInDb(req.params.email))
    let token: string = tokenService.tokenGeneration(req.params.email);
    let unJouEnMiliSeconode : number = 86400000;

    db.upgradeRatecounter(unJouEnMiliSeconode, token, req.params.email);
    res.send(token)
    next()

  } else{
    console.log('coucou2')
    let token = tokenService.tokenGeneration(req.params.email);
    let unJouEnMiliSeconode : number = 86400000;
    let timeLeft: number = new Date().getTime()+unJouEnMiliSeconode;

    db.singUp(req.params.email,token,timeLeft);

    res.send(token);
    next()
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