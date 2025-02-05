import express from 'express';
import { verifyuser } from '../UTILS/verifyuser.js';
import {createPost, getPost , deletePost, editPost} from '../CONTROLLERS/post.controller.js';

const router = express.Router();

router.post('/create-post',verifyuser , createPost);
router.get('/get-post', getPost);
router.delete('/delete-post/:id/:userId',verifyuser,deletePost);
// _id - The ID of the Post 
// userId - The ID of the user
router.put('/edit-post/:id/:userId',verifyuser,editPost);

export default router;