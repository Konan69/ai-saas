const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs') 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email"]
  },
  customerId: {
    type: String,
    default: '',
  },
  subscription: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: [6, "password must be atleast 6 characters"],
    select: false
  } 
});

//hash password before saving
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next()
});

//match password to hashed password
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

//sign jwt and return
userSchema.methods.getSignedJwtToken = function(res) {
  const accessToken = jwt.sign({id: this._id}, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRE })
  const refreshToken = jwt.sign({id: this._id}, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE })
  res.cookie('refreshToken', `${refreshToken}`, { maxAge: 86400 * 7000, httpOnly: true })

  return {accessToken, refreshToken}
}
const User = mongoose.model('User', userSchema);

module.exports = User