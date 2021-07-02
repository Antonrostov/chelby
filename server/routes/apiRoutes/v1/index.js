import express from 'express';
import gameHistoryAPIRoute from './gameHistoryAPIRoute';
import userAPIRoute from './userAPIRoute';
const router = express.Router();
router.use('/game', gameHistoryAPIRoute);
router.use('/profile', userAPIRoute);
export default router;
