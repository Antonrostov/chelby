import express from 'express';
import authAPIController from '../../../controllers/APIController/authAPIController';
const router = express.Router();
router.post('/signup', authAPIController.postSignup);
router.post('/login', authAPIController.postLogin);
router.delete('/logout/:id', authAPIController.logout);
export default router;
