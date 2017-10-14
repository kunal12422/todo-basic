import * as   local from  'passport-local'
import User from '../models/user.model'

const LocalStrategy = local.Strategy;

export default  (passport)=> {
    


   
  passport.use('local-signup', new LocalStrategy({
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    }, (req, email, password, done) =>{
  
        
        User.findOne({ 'email' : email }, (err, user)=> {
        
        if (err) return done(err, false, { message: "Something went wrong." });
  
        
        if (user) return done(null, false, { message: "This email has already been registered." });
         
        var newUser = new User();
        newUser.email = email;
        newUser.password = password;
        
        newUser.save(function(err, user) {
          // Error found
          if (err) return done(err, false, { message: "Something went wrong." });
  
          // New user created
          return done(null, user);
  
        });
      });
    }));
  
    };