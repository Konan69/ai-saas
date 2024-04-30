const User = require('../Models/User')
const ErrorResponse = require('../Utils/errorResponse')
const jwt = require('jsonwebtoken')

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken(res);

  res
    .status(statusCode)
    .json({ success: true, token })
} 

exports.register = async (req, res, next) => {
  const {username, email, password} = req.body;

  // CHECK IF user email exists
  const emailExist = await User.findOne({email})
  if(emailExist) {
    return next(new ErrorResponse(`Email ${email} is already registered`, 400))
  }

  try{
    const user = await User.create({
      username,
      email,
      password
    })
    sendToken(user, 201, res)

  } catch (err) {
    next(err)
  } 
}

exports.login = async (req, res, next) => {
  const {email, password} = req.body;
  if(!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400))
  }
  try {
    const user = await User.findOne({email}).select('+password')
    if(!user) {
      return next(new ErrorResponse(`Invalid credentials`, 401))
    }
    const isMatch = await user.matchPassword(password)
    if(!isMatch) {
      return next(new ErrorResponse(`Invalid credentials`, 401))
    }
    sendToken(user, 200, res)
  } catch (err) {
    next(err)
  }
}

exports.logout = (req,res) => {
  res.clearCookie('refreshToken')
  res.status(200).json({success: true, message: 'Logged out'})
}