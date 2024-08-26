// Käyttäjän dokumentti malli
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    username: {type:String, defalt: ''},
    password: {type:String, defalt: ''},
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
}, 'Password cannot be blank');

UserSchema.path('bio').validate(function(bio) {
  return bio.length;
}, 'Bio cannot be blank');

/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next();

  if (!(this.password && this.password.length)) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

export const UserModel = mongoose.model("User",UserSchema);