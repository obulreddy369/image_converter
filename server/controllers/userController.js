import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing details" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userdata = { name, email, password: hashedPassword };
        const newUser = new userModel(userdata);
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ success: true, token, name: user.name });
    } catch (err) {
        console.error(err);
        return res.json({ success: false, message: err.message });
    }
};

const loggedUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.json({ success: true, token, name: user.name });
        } else {
            res.json({ success: false, message: "Incorrect password" });
        }
    } catch (err) {
        console.error(err);
        return res.json({ success: false, message: err.message });
    }
};

const userCredits=async(req,res)=>{
    try {
    const {userId}=req.body;
    const user=await userModel.findById(userId);
    if(user){
        res.json({ success: true, credits: user.creditBalance,user:{user:user.name}});
    }

    } catch (error) {
        console.error(error.message);
        res.json({ error: error.message });
    }

}

export { registerUser, loggedUser, userCredits};
