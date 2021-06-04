import express from 'express';
import gameAPIRoute from './gameAPIRoute';
import userAPIRoute from './userAPIRoute';
const router = express.Router();
router.use('/game', gameAPIRoute);
router.use('/profile', userAPIRoute);
export default router;
