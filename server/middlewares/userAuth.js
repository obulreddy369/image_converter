import jwt from "jsonwebtoken";


const userAuth=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        res.json({success:false,message:"User not authenticated"});
    }
    try {
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId=tokenDecode.id;
        }
        else{
            res.json({success:false,message:"id not found"});
        }
        next();
    } catch (error) {
        res.json({success:false,message:error.message});
    }
    
}
export default userAuth;