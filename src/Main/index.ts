
import {NextFunction, Request, Response } from 'express';
import express from 'express';
import bodyParser from 'body-parser'

import { User } from '../Model/User';
import {Db} from '../Services/db'
import { decodedToken, TokenService } from '../Services/token';
import {Justification} from '../Services/justification'

const app = express();
const port = 5000;

app.use(bodyParser.json())
//app.use(bodyParser.text())

//initialisation
const db = new Db();
const tokenService = new TokenService();


app.post('/api/jutify', (req: Request, res: Response, next: NextFunction) => {
  let justify: Justification = new Justification();

  try{
    let text: string = req.body.text;
    console.log(text);
    let textjustified: string[] = justify.MainJustificationMethod(text)
    res.status(200).json(textjustified).send();
  } catch(e){
    console.log(e);
    res.status(500).send('internal server error');
  }

  //let user = db.singUp('yasser@yasser','tokentoken',0).then((value)=>value.rows[0]);
  //res.send(db.isUserInDb('yasser@yasser').then((value) => value.rows));
})

app.post('/api/token', (req: Request, res: Response, next: NextFunction) => {
  let email: string = ''+req.query.email;

  if(db.isUserInDb(email)){

    let token: string = tokenService.tokenGeneration(email);

    db.upgradeRatecounter(email);
    res.send(token)
    next()

  } else{
    console.log('coucou2')
    let token = tokenService.tokenGeneration(email);
    let unJouEnMiliSeconode : number = 86400000;
    let timeLeft: number = new Date().getTime()+unJouEnMiliSeconode;

    let user: User = new User(email,timeLeft);
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