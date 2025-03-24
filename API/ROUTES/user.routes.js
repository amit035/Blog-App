import express from 'express';
import { test, updateUser , deleteUser, signout, getUsers, getUser } from '../CONTROLLERS/user.controller.js';
import { verifyToken } from '../UTILS/verifyuser.js';

const router = express.Router();

router.get('/test',test);
router.put('/update/:userId',verifyToken, updateUser);
router.delete('/delete/:userId',verifyToken, deleteUser);
router.post('/signout',signout);
router.get('/get-users',verifyToken,getUsers);
router.get('/:userId',getUser);

export default router;