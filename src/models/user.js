import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const {Schema} =mongoose;
const UserSchema= new Schema({
email:String,
salt:String,
hash:String
});
UserSchema.methods.setPassword=function(password){

  this.salt=crypto.randomBytes(16).toString('hex');
  this.hash=crypto.pbkdf2Sync(password,this.salt,1000,512,'sha512').toString('hex');
}
UserSchema.methods.validatePassword=function(password){
  const hash=crypto.pbkdf2Sync(password,this.salt,1000,512,'sha512').toString('hex');
  return hash==this.hash;
}
UserSchema.methods.generateJWTToken=function(){
  console.info(dotenv.JWT_Secret_Key)
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return jwt.sign({
email:this.email,
id:this._id,
exp:parseInt(expirationDate.getTime()/1000,10)
  },'Meanstack');
}

UserSchema.methods.authDetailsToJSON= function(){
  return {id:this._id,
  email:this.email,
  token:this.generateJWTToken()
}
}

const Users=mongoose.model('Users',UserSchema)
export default Users;
