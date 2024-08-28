// Käyttäjän dokumentti malli
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    username: {type:String, required: true,unique:true},
    password: {type:String, default:''},
    bio: {type:String, defalt: ''}
});

/** 
 * Validations
*/

UserSchema.path('username').validate(function(username) {
  return username.length;
}, 'Username cannot be blank');

UserSchema.path('username').validate(function(username) {
  return new Promise(resolve => {
    const User = mongoose.model('User');

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('username')) {
      User.find({ username }).then((users) => {resolve(!users.length)});
    } else resolve(true);
  });
}, 'Username `{VALUE}` already exists');

UserSchema.path('password').validate(function(password) {
  return password.length;
  return password.length > 7;
}, 'Password too short');

UserSchema.path('bio').validate(function(bio) {
  return bio.length;
}, 'Bio cannot be blank');

export const UserModel = mongoose.model("User",UserSchema);