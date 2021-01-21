import express from 'express';
import bodyParser from 'body-parser'
import { Router } from './route/route'
import swaggerUI from 'swagger-ui-express'

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(Router);

app.listen(port, () => console.log(`[INDEX.TS] Running on port ${port}`))

