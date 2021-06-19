import express from 'express';
import gameHistoryAPIController from '../../../controllers/APIController/GameHistoryAPIController';
const router = express.Router();
router.get('/history/:id', gameHistoryAPIController.getGameHistory);
router.post('/history', gameHistoryAPIController.postGameHistory);
router.delete('/history', gameHistoryAPIController.deleteGameHistory);
export default router;
