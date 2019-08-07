import mongoose from 'mongoose';
const {Schema} =  mongoose;
const movieSchema=  new Schema({
name:{
  type:String,
  required:[true,"Cant be blank"],
  index:true,
  maxLength:200
},
director:{
  type:String,
  required:[true,"Cant be blank"],
  index:true,
  maxLength:200
},

},{timestamps:true});

const Movie=mongoose.model('Movie',movieSchema);
export default Movie;

