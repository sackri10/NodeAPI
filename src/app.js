import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session'
import route from './routes'
import morgan from 'morgan'
import {} from './database';
import errorHandler from 'errorhandler';
import express from 'express';
import { domainToASCII } from 'url';

dotenv.config();
const app=express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public/`));
console.info(__dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(errorHandler())
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(process.env.API_Base,route);

app.use((req,res,next)=>{

  const err = new Error(`Route ${req.url} Not found.`);
  err.status = 404;
  next(err);
});
app.use((err,req,res)=> {
res.status(err.status || 500);
res.json({
  error:{message:err.message}
})
});

export default app;

