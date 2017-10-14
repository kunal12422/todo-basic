import passport from 'passport'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import auth from '../core/auth.service'
import upload from '../core/s3Utils'
var uploader = upload.single('file');

const controller = {}

controller.signup =  (req, res, next)=> {
  console.log("REGISTRING")
    var localStrategy = passport.authenticate('local-signup', function(err, user, info) {
  
      if (err) return res.status(500).json({ message: 'Something went wrong!' });
      
      if (info) return res.status(401).json({ message: info.message });
      if (!user) return res.status(401).json({ message: 'User already exists!' });
  
      
      var token = auth.signToken(user._id);
     
      var email = user["email"]
      
      return res.status(200).json({
        success: true,
        message: "Welcome",
        token: token,
        user: email
      });
    });
  
    return localStrategy(req, res, next);
  }

  controller.login =  (req, res, next)=>{
    User.findOne({
        "email": req.body.email
      }).populate("todos").exec(function(err, user) {
        if (err) return res.status(500).json(err);
        if (!user) return res.status(403).json({ message: 'No user found.' });
        if (!user.authenticate(req.body.password)) return res.status(403).json({ message: 'Authentication Password failed.' });
        var token = auth.signToken(user._id);
        var email = user["email"]
    
        return res.status(200).json({
          success: true,
          message: 'Welcome back!',
          token: token,
          user: email
        });
      });
  }
  export default controller;