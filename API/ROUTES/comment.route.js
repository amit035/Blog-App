import express from 'express';
import { createComment, deleteComment, getPostComments, likeComment , getComments } from '../CONTROLLERS/comment.controller.js';
import { verifyToken } from '../UTILS/verifyuser.js';

const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/get-post-comments/:postId',getPostComments);
router.put('/like-comment/:commentId',verifyToken,likeComment);
router.put('/edit-comment/:commentId',verifyToken,likeComment);
router.delete('/delete-comment/:commentId',verifyToken,deleteComment);
router.get('/get-comments',verifyToken,getComments);

export default router;