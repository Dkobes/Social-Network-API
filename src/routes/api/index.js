import { Router } from 'express';
const router = Router();
import thoughtsRoute from './thoughtsRoute.js';
import userRoute from './userRoute.js';

router.use('/thoughts', thoughtsRoute);
router.use('/users', userRoute);

export default router;