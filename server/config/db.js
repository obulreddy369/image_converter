import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');
    }
    catch(err){
        console.log("Couldn't connect to MongoDB");
        console.log(err.message);
    }
}
export default connectDb;