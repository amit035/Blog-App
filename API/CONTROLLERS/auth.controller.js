import User from "../MODELS/user.model.js";
import bcryptjs from 'bcryptjs';
import errorMessage from "../UTILS/error.js";
import jwt from 'jsonwebtoken';

const signup = async (req,res,next) => {
    // console.log(req.body);
    const {username,email,password} = req.body;
 
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({message : 'All Fields are Required'});
    }

    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        password : hashedPassword
    });

    try {
        await newUser.save();
        res.json({message:"Signup Successful"});
    } catch (error) {
        // return res.status(400).json({message : error.message});
        next(errorMessage(400,error.message));
    }
}

export {signup};

const signin = async (req,res,next) =>{
    const {email,password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorMessage(400,'All Fields are Required'));
    }

    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorMessage(404,'user not Found'))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password); 
        if(!validPassword){
            return next(errorMessage(400,'Invalid Password'));
        }

        const token = jwt.sign({id : validUser._id} , process.env.JWT_SECRET);
        const {password : pass , ...rest} = validUser._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly:true
        }).json(rest);
    }catch(error){
        next(error);
    }
}

export {signin};

