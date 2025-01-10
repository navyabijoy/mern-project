import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {errorHandler} from '../utils/error.js'

export const signup = async (req, res) => {
  const { username, email, password } = req.body; // we request these from the user input
  const hashedPassword = bcryptjs.hashSync(password, 10); // hash the password with bcryptjs library
  const newUser = new User({ username, email, password: hashedPassword }); // saves the user's data as newUser
  try {
     // since we use 'await', we add 'async' to the function
    /* The await keyword is used here to ensure that the newUser.save() operation is 
     completed before the code execution proceeds further */
      await newUser.save();
      res.status(201).json('User created successfully!');
    
  } catch (error) {
    res.status(500).json(error.message); // suppose the user or email are repeated then show the error

  }
};

export const signin = async(req,res,next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Invalid password'))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest} = validUser._doc 
        // uses object destructuring to extract password property form validUser._doc object while 
        // keeping the rest of the properties in a new object called res
        // Mongoose attaches a .doc property to documents, which contains the raw object representation of the data (excluding Mongoose-specific metadata).
        res
        .cookie('access_token',token, { httpOnly: true })
        .status(200)
        .json(rest)
    } catch(error){
        next(error)
    }
}

export const google = async(req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if(user){ // if the user exists
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest} = user._doc
      res
      .cookie('access_token',token, { httpOnly: true })
      .status(200)
      .json(rest)
    }
    else{ // if the user does not exist
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({ username: req.body.email, password: hashedPassword, avatar: req.body.photo })
      await newUser.save()
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest} = newUser._doc
      res
      .cookie('access_token',token, { httpOnly: true })
      .status(200)
      .json(rest)
  }
}
catch(error){
  next(error)
  }
}

export const signOut = async(req,res,next) => {
  try {
    res.clearCookie('access_token')
    res.status(200).json('User has been logged out!')
  } catch(error){
    next(error);
  }
}