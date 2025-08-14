import db from '../models/index.js';

const { User } = db;
const getProfile = async (req, res) => {
  try {
    // The verifyAuth middleware added the userId to the request object
    const userId = req.userId;
    
    // Find the user by their ID
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] } 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Failed to retrieve user profile.' });
  }
};

export default {
  getProfile,
};