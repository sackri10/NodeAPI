import dotenv from 'dotenv';
import http from 'http';
import app from './app'
dotenv.config();
const port=process.env.API_PORT || 3004
http.Server(app).listen(port,()=>console.info(`Running at port ${port}`));
