import express from 'express';
import {signup,google} from '../CONTROLLERS/auth.controller.js';
import {signin } from '../CONTROLLERS/auth.controller.js';

const router = express.Router();
{/*API for Sign Up*/}

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);

export default router;