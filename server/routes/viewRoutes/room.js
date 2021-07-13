import express from 'express';
import roomController from '../../controllers/ViewController/roomController';
const router = express.Router();
router.get('/room', roomController.getRoom);
router.post('/create-room', roomController.createRoom);
router.post('/join-room', roomController.joinRoom);
export default router;
