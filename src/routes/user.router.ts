import express from 'express';
import {
    loginController,
    getProfileController,
    updateProfileController
} from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const userRouter = express.Router();

//userRouter.post('/registro', registerController);
userRouter.post('/login', loginController);
userRouter.get('/perfil', authenticateJWT, getProfileController);
userRouter.put('/perfil', authenticateJWT, updateProfileController);

export default userRouter;