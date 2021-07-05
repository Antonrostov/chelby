import express from 'express';
import authAPIRoute from './authAPIRoute';
import userAPIRoute from './userAPIRoute';
import gameHistoryAPIRoute from './gameHistoryAPIRoute';
const router = express.Router();
router.use('/auth', authAPIRoute);
router.use('/profile', userAPIRoute);
router.use('/game', gameHistoryAPIRoute);
export default router;
