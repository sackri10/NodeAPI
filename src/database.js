import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
mongoose.Promise=global.Promise;

let dbUrl='mongodb://localhost:27017/movies';

const options={
  useNewUrlParser:true,
  useCreateIndex:true
}
const database=mongoose.connect(dbUrl,options,err=>(err?console.log(err):console.info('DB Connection successful')));
export default database;
