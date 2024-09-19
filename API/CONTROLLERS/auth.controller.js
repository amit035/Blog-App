import User from "../MODELS/user.model.js";
import bcryptjs from 'bcryptjs';
import errorMessage from "../UTILS/error.js";

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

export default signup;