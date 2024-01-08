import { Router } from 'express';
const router = Router();

import admin from './adminRouter.js';
router.use('/admin', admin);

import user from './userRouter.js';
router.use('/user', user);

router.get('/', (req, res) => {
    res.json('Welcome to Home Page');
});

export default router;
