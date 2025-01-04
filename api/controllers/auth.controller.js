import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

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