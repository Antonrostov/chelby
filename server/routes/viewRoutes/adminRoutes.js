import express from 'express';
import adminController from '../../controllers/ViewController/adminController';
const router = express.Router();
router.get('/userlist', adminController.getUserlist);
router.delete('/deleteUser', adminController.deleteUser);
export default router;
