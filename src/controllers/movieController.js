import Movie from '../models/Movie'
const moviesController ={};
moviesController.CreateMovie= async (req,res)=>{
  const {name,director}=req.body;
  const movie= new Movie({name,director});
  await movie.save().then(newMovie=>{
    res.status(200).json({success:true,data:{name}});

  })
}
export default moviesController;
