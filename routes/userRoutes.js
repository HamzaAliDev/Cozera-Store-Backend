const express = require('express');
const verifyAuth = require('../middlewares/auth');
const { registerUser, loginUser, fetchUser, updateProfile, fetchAllUsers } = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.get('/', fetchAllUsers)
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', verifyAuth, fetchUser)
userRouter.put('/update-profile', updateProfile)

module.exports = userRouter;