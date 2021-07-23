import express from 'express';
import adminController from '../../controllers/ViewController/adminController';
const authRouter = express.Router();
authRouter.get('/userlist', adminController.getUserlist);
export default authRouter;
