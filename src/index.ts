//validator for email validation 
import express from 'express';
import { userInfo } from 'os';
import { User } from '../src/Model/User';

const app = express()
const port = 5000

app.post('/api/token', (req, res, next) => {
  
  let user = new User('some email')
  let token: string = user.TokenGeneration('some email');
  res.send(token);
  next()
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