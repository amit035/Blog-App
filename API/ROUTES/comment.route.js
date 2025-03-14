import express from 'express';
import { createComment } from '../CONTROLLERS/comment.controller.js';
import { verifyuser } from '../UTILS/verifyuser.js';

const router = express.Router();

router.post('/create',verifyuser,createComment);

export default router;