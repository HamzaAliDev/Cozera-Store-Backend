const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                data: null,
                error: true,
                message: 'All fields are required'
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                data: null,
                error: true,
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generate JWT token after registration
        const token = jwt.sign(
            { _id: newUser._id, email: newUser.email },
            process.env.SECRET_KEY,
            // { expiresIn: '7d' } // Optional: Set expiration time
        );

        return res.status(201).json({
            data: {
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    status: newUser.status
                },
                token: token
            },
            error: false,
            message: 'User registered successfully'
        });


    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error.message,
            message: "Failed to register user"
        });
    }
}

// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("email", email);
        console.log("password", password);

        if (!email || !password) {
            return res.status(400).json({
                data: null,
                error: true,
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                data: null,
                error: true,
                message: 'User does not exist'
            });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({
                data: null,
                error: true,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ _id: existingUser._id, email: existingUser.email }, process.env.SECRET_KEY);

        return res.status(200).json({
            data: {
                user: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role,
                    status: existingUser.status
                },
                token: token
            },
            error: false,
            message: 'User logged in successfully'
        });

    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error.message,
            message: "Failed to login user"
        });
    }
}

// fetch user
const fetchUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findOne({ _id });
        return res.status(200).json({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            },
            error: false,
            message: 'User fetched successfully'
        });
    } catch (error) {
        return res.status(409).json({
            data: null,
            error: error.message,
            message: "Failed to fetch user"
        });
    }
}

// update profile
const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        const { _id } = req.user;

        const user = await User.findOneAndUpdate({ _id }, { name }, { new: true });
        res.status(200).json({
            data: {
                _id: user._id,
                name: user.name,
            },
            message: "User updated successfully",
        });
    } catch (error) {
        return res.status(409).json({
            data: null,
            error: error.message,
            message: "Failed to update profile"
        });
    }
}

module.exports = { registerUser, loginUser, fetchUser, updateProfile };