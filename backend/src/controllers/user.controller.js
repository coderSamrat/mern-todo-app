import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const createAccount = async (req, res) => {
      const { fullname, email, password } = req.body;

      if (!fullname) {
            return res.status(400)
                  .json({
                        message: "Fullname is required",
                        error: true,
                  });
      }
      if (!email) {
            return res.status(400)
                  .json({
                        message: "Email is required",
                        error: true,
                  });
      }
      if (!password) {
            return res.status(400)
                  .json({
                        message: "Password is required",
                        error: true,
                  });
      }
      try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                  return res.status(400)
                        .json({
                              message: "Email already exists",
                              error: true,
                        });
            }

            const user = new User({
                  fullname,
                  email,
                  password,
            });
            await user.save();
            const token = jwt.sign(
                  { id: user._id },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: '2h' }
            );
            return res.status(201)
                  .json({
                        message: "Account created successfully",
                        user: user,
                        token: token,
                        error: false,
                  });
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
};

export const login = async (req, res) => {
      const { email, password } = req.body;

      if (!email) {
            return res.status(400).json({
                  message: "Email is required",
                  error: true,
            });
      }
      if (!password) {
            return res.status(400).json({
                  message: "Password is required",
                  error: true,
            });
      }
      try {
            const user = await User.findOne({ email });
            if (!user) {
                  return res.status(400).json({
                        message: "Invalid email or password",
                        error: true,
                  });
            }

            const validPassword = await user.comparePassword(password);
            if (!validPassword) {
                  return res.status(400).json({
                        message: "Incorrect password",
                        error: true,
                  });
            }

            const token = jwt.sign(
                  { id: user._id },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: '2h' }
            );

            return res.status(200).json({
                  message: "Login successful",
                  user: user,
                  token: token,
                  error: false,
            });
      } catch (error) {
            return res.status(500).json({ message: error.message });
      }
};

export const getUser = async (req, res) => {
      const { user } = req;
      try {
            const isUser = await User.findOne({ _id: user._id }).select('-password');
            if (!isUser) {
                  return res.status(404).json({
                        message: "User not found",
                        error: true,
                  });
            }
            return res.status(200).json({
                  message: "User retrieved successfully",
                  user: isUser, 
                  error: false,
            });
      } catch (error) {
            return res.status(500).json({ message: error.message });
      }
};
