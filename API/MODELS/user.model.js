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
        default : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png',
    },
    isAdmin : {
        type:Boolean,
        default : false,
    },
},{timestamps:true}
);

const User = mongoose.model('user',userSchema);

export default User;