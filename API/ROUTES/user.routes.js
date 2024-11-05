import express from 'express';
import { test, updateUser } from '../CONTROLLERS/user.controller.js';
import { verifyuser } from '../UTILS/verifyuser.js';

const router = express.Router();

router.get('/test',test);
router.put('/update/:userId',verifyuser, updateUser);

export default router;