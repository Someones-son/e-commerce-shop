const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, username, email } });
  } catch (error) {
    res.status(400).json({ message: 'User registration failed', error });
  }
};

// Log In
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user);
      res.json({ token, user: { id: user._id, username: user.username, email } });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
