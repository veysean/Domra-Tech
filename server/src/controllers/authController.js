import db from '../models/index.js';
import jwt from 'jsonwebtoken';

const { User } = db;

//Handles user registration.
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: 'user'
    });

    const userResponse = {
      userId: newUser.userId,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role
    };

    return res.status(201).json({ message: 'User registered successfully!', user: userResponse });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Failed to register user.', error: error.message });
  }
};

// Handles user login.
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    //generate a JWT and send it back
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );
    

    const userResponse = {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };

    return res.status(200).json({ message: 'Logged in successfully!', user: userResponse , token });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Failed to log in.', error: error.message });
  }
};

export default {
  register,
  login,
};