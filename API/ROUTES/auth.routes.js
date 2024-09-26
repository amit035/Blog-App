import express from 'express';
import {signup} from '../CONTROLLERS/auth.controller.js';
import {signin } from '../CONTROLLERS/auth.controller.js';

const router = express.Router();
{/*API for Sign Up*/}

router.post('/signup',signup);
router.post('/signin',signin);

export default router;