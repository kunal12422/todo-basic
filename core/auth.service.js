'use strict';

import passport from 'passport'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import compose from 'composable-middleware'

import User from '../models/user.model'


const  secret = process.env.SECRET || 'mysecret';
const validateJwt = expressJwt({ secret: secret });
function isAuthenticated(){
    
  return compose()
  // Validate jwt
   
  
    .use(function(req, res, next){

            if(req.query && req.query.hasOwnProperty('access_token')){
              req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            validateJwt(req, res, next);  
           

           
      
    })
    .use(function(err, req, res, next) {
      
          if(err.name === 'UnauthorizedError') {
              console.log("===== LOGGER UNAUTHOIZED ====")

              res.redirect("/login")
          }else{
          next();
        }
})
    // Attaching user to request
    .use(function(req, res, next){
      // console.log("REQUEST.USER TWO " + req.user._id)

      
      User.findById(req.user._id).select('-hashedPassword -salt').exec(function(err, user){
        if(err) return next(err);
        if(!user){
            res.redirect("/login");
             return;
        } 
        req.user = user;
        next();
      });
    });
}



function signToken(id) {
  return jwt.sign({ _id: id },secret, { expiresIn:  60*60*24  });
}


exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;