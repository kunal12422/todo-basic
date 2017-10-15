import mongoose from 'mongoose';

import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto'

import Todo from './todo.model'
const userSchema = mongoose.Schema({
       email : { type: String, unique: true, required: true },
       hashedPassword: { type: String, required: true },
       salt:  { type: String},
       todos: [{ type: mongoose.Schema.ObjectId, ref: 'Todo' }]
    },
 {collection : 'user'});

 userSchema
 .virtual('password')
 .set(function(password){
   this._password = password;
   this.salt = this.makeSalt();
   this.hashedPassword = this.encryptPassword(password);
 })
 .get(function(){
   return this._password;
 });


 var validatePresenceOf = function(value) {
  return value && value.length;
};


userSchema.methods = {
  authenticate: function(plainText) {
      return this.encryptPassword(plainText) === this.hashedPassword;
    },
  makeSalt: function(){
    return crypto.randomBytes(16).toString('base64');
  },
  encryptPassword: function(password) {
    
      if (!password || !this.salt) return '';
      var salt = new Buffer(this.salt, 'base64');
      return crypto.pbkdf2Sync(password, salt, 10000, 512,'sha512').toString('base64');
    },
}

userSchema
.pre('save', function(next) {

  if (!this.isNew) return next();

  if (!validatePresenceOf(this.hashedPassword))
    next(new Error('Invalid password'));
  else
    next();
});




  
 let UserModel = mongoose.model('User', userSchema);

export default UserModel;