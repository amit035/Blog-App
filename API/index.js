import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './ROUTES/user.routes.js'
import authRoutes from './ROUTES/auth.routes.js'
import postRoutes from './ROUTES/post.route.js'
import commentRoute from './ROUTES/comment.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('MongoDB is Connected');
}).catch((err)=>{
    console.log(err);
});

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () =>{
    console.log('Server is Running on Port 3000');
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoute);

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
});

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })

});