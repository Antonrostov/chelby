import express from 'express';
import adminAPIController from '../../../controllers/APIController/adminAPIController';
const router = express.Router();
router.get('/userlist/:id', adminAPIController.getUserlist);
export default router;
