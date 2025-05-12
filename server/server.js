import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connect } from 'mongoose';
import connectDb from './config/db.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRouter.js';



const PORT=5000;
const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/user",userRouter);
app.use("/api/image",imageRouter);
app.get('/',(req,res)=>{
         res.send("API");
})

app.listen(PORT,(req,res)=>{
    connectDb();
    console.log(`listening on ${PORT}`);
    });

