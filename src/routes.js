import Router from 'express-promise-router';
import moviesController from './controllers/movieController'
import userController from './controllers/userController'
import auth from './config/auth'
const route=Router();
route.get('/default',(req,res)=>{
    console.log(req.body);
    res.status(200).send('Default route working');
});

route.post('/movie',moviesController.CreateMovie);

route.post('/login',userController.Login);
route.post('/Create',userController.CreateUser);

export default route;


