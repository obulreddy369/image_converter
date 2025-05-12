
import express from "express";
import { registerUser,loggedUser, userCredits } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";

const userRouter =express.Router();
userRouter.post('/register',registerUser);
userRouter.post('/login',loggedUser);
userRouter.get('/credits',userAuth,userCredits);

export default userRouter;