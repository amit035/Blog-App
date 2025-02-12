import express from 'express';
import { test, updateUser , deleteUser, signout, getUsers } from '../CONTROLLERS/user.controller.js';
import { verifyuser } from '../UTILS/verifyuser.js';

const router = express.Router();

router.get('/test',test);
router.put('/update/:userId',verifyuser, updateUser);
router.delete('/delete/:userId',verifyuser, deleteUser);
router.post('/signout',signout);
router.get('/get-users',verifyuser,getUsers);

export default router;