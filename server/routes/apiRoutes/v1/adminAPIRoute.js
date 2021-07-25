import express from 'express';
import adminAPIController from '../../../controllers/APIController/adminAPIController';
const router = express.Router();
router.get('/userlist/:id', adminAPIController.getUserlist);
router.patch('/makeAdmin', adminAPIController.makeAdmin);
export default router;
