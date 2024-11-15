import express from 'express';
import { test, updateUser , deleteUser, signout } from '../CONTROLLERS/user.controller.js';
import { verifyuser } from '../UTILS/verifyuser.js';

const router = express.Router();

router.get('/test',test);
router.put('/update/:userId',verifyuser, updateUser);
router.delete('/delete/:userId',verifyuser, deleteUser);
router.post('/signout',signout);

export default router;