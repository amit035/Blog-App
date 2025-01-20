import express from 'express';
import { verifyuser } from '../UTILS/verifyuser.js';
import {createPost, getPost , deletePost} from '../CONTROLLERS/post.controller.js';

const router = express.Router();

router.post('/create-post',verifyuser , createPost);
router.get('/get-post', getPost);
router.delete('/delete-post/:postId/:userId',verifyuser,deletePost);

export default router;