import express from 'express';
import {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, razorpayPayment, verifyRazorpay } from '../controllers/userController.js';
import { authUser } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile',upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/list-appointments', authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.post('/payment-razorpay', authUser, razorpayPayment);
userRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default userRouter;