import express from 'express';
import { createComment, getPostComments, likeComment } from '../CONTROLLERS/comment.controller.js';
import { verifyToken } from '../UTILS/verifyuser.js';

const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/get-post-comments/:postId',getPostComments);
router.put('/like-comment/:commentId',verifyToken,likeComment);

export default router;