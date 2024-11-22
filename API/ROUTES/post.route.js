import express from 'express';
import { verifyuser } from '../UTILS/verifyuser.js';
import {createPost} from '../CONTROLLERS/post.controller.js';

const router = express.Router();

router.post('/create-post',verifyuser , createPost);

export default router;