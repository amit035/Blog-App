import errorMessage from "../UTILS/error.js";
import User from '../MODELS/user.model.js';
import bcryptjs from 'bcryptjs';

export const test = (req,res) => {
    res.json({message : 'API is working!'});
};

export const updateUser = async(req,res,next) => {
    if(req.user.id !== req.params.userId){
        return next(errorMessage(403,'You are not allowed to update this user'));
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorMessage(400,'Password must be at least 6 Character'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10);
    }
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorMessage(400,'username must be 7 between 7 & 20 Characters'));
        }
        if(req.body.username.includes(' ')){
            return next(errorMessage(400,'username cannot contain spaces'));
        }
        if(req.body.username != req.body.username.toLowerCase()){
            return next(errorMessage(400,'username must be lowercase'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorMessage(400,'username can only contain letters and numbers'));
        }
    }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    photoUrl:req.body.photoUrl,
                    password:req.body.password,
                },
            },{new : true});
            const {password, ... rest } = updatedUser._doc;
            res.status(200).json(rest);  
            
        } catch (error) {
            next(error);
        }
};

export const deleteUser = async (req,res,next) =>{
    if(req.user.id !== req.params.userId){
        return next(errorMessage(403,'You are not allowed to delete this user'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('user has been deleted');
    } catch (error) {
        next(error);
    }
}

export const signout = (req,res,next)=>{
    try {
        res.clearCookie('access_token').status(200).json('user has been signed out');
    } catch (error) {
        next(error);
    }
}