const User = require('../models/userModel');

exports.signup = function(req,res,next){
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(422).send({ error: "Please provide email or password"})
  }

  User.findOne({ email: email }, function(err, existingUser){
    if(err){ return next(err); }
    if(existingUser){
      return res.status(422).send({error: "Email already exist"});
    }
    const user = new User({
      email : email,
      password: password
    });
    user.save(function(err){
      if(err){return next(err)}
      res.json({ success: true });
    });


  })
}
