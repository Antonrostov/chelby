import express from 'express';
import authRoutes from './authRoutes';
import profileRouter from './profileRoutes';
import blockUnauthenticated from '../middlewares/authentication/blockUnauthenticated';
import controller from '../controllers/ViewController/controller';
import gameController from '../controllers/ViewController/gameController';
const router = express.Router();
router.get('/', controller.homeIndex);
router.get('/index', (req, res) => {
  res.redirect('/');
});
router.get('/home', (req, res) => {
  res.redirect('/');
});
router.use('/auth', authRoutes);
router.use('/profile', profileRouter);
router.get('/rockpaperscissor', blockUnauthenticated, gameController.rpsIndex);
router.get('/gameHistory', blockUnauthenticated, gameController.getGameHistory);
router.post('/gameHistory', blockUnauthenticated, gameController.postGameHistory);
router.delete('/gameHistory', blockUnauthenticated, gameController.deleteGameHistory);
export default router;
