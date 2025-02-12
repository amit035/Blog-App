import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique : true, 
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    photoUrl : {
        type : String,
        default : 'Logo.png',
    },
    isAdmin : {
        type:Boolean,
        default : false,
    },
},{timestamps:true}
);

const User = mongoose.model('user',userSchema);

export default User;