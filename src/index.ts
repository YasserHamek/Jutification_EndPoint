import express from 'express';
import bodyParser from 'body-parser'
import { Router } from './route/route'

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(Router);

app.listen(port, () => console.log(`[INDEX.TS] Running on port ${port}`))

