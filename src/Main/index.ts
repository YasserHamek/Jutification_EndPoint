/*var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.text());*/

import { Request, Response } from 'express';
import express from 'express';

import { User } from '../Model/User';
import {Db} from '../Services/db'
import { TokenService } from '../Services/token';
import {Justification} from '../Services/justification'



const app = express();
const port = 5000;

const db = new Db();
const tokenService = new TokenService();

app.get('/api/jutify', (req: Request, res: Response, next) => {
  let justify: Justification = new Justification();
  let text: string = req.params.text.toString()
  console.log(text);
  console.log(req.params.text);

  try{
    let textjustified: string[] = justify.MainJustificationMethod(req.params.text)
    res.status(200).json(textjustified).send();
  } catch(e){
    console.log(e);
    res.status(500).send('internal server error');
  }

  //let user = db.singUp('yasser@yasser','tokentoken',0).then((value)=>value.rows[0]);
  //res.send(db.isUserInDb('yasser@yasser').then((value) => value.rows));
})

app.post('/api/token', (req: Request, res: Response, next) => {
  
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

    let user: User = new User(req.params.email,timeLeft);
    user.rateCounter=0;
    user.token=token;

    db.singUp(user);

    res.send({user,token});
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