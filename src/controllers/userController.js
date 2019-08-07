import Users from '../models/user'
import passport from '../config/passport'

const userController={};
userController.CreateUser=function(req,res,next){
  const {body:{user}}=req;
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  console.info(user)
  const finalUser = new Users(user);
console.info(finalUser);
  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.authDetailsToJSON() }));

}
userController.Login = async (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return await passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWTToken();

      return res.json({ user: user.authDetailsToJSON() });
    }

    return status(400).info;
  })(req, res, next);
};

export default userController
