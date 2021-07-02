import express from 'express';
import apiRouter from './apiRoutes';
import viewRoutes from './viewRoutes';
import controller from '../controllers/ViewController/controller';
const router = express.Router();
router.get('/', controller.homeIndex);
router.get('/index', (req, res) => {
  res.redirect('/');
});
router.get('/home', (req, res) => {
  res.redirect('/');
});
router.use(viewRoutes);
router.use('/api', apiRouter);
export default router;
