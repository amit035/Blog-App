import errorMessage from "../UTILS/error.js";
import jwt from 'jsonwebtoken';

export const verifyuser = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(errorMessage(401,'unauthorized'));
    }
    jwt.verify(token,process.env.JWT_SECRET, (err,user)=>{
        if(err){
            return next(errorMessage(401,'unauthorized'));
        }
        req.user = user;
        next();
    });
};