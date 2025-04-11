const express = require('express');
const verifyAuth = require('../middlewares/auth');
const { registerUser, loginUser, fetchUser, updateProfile } = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', verifyAuth, fetchUser)
userRouter.put('/update-profile', verifyAuth, updateProfile)

module.exports = userRouter;