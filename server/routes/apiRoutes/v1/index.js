import express from 'express';
import gameHistoryAPIRoute from './gameHistoryAPIRoute';
import userProfileAPIRoute from './userProfileAPIRoute';
const router = express.Router();
router.use('/game', gameHistoryAPIRoute);
router.use('/profile', userProfileAPIRoute);
export default router;
