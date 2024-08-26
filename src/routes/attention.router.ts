import express from 'express';
import {
    getAllAttentionsController,
    getAttentionByIdController,
    getAttentionCountController,
    createAttentionController,
    updateAttentionController,
    deleteAttentionController
} from '../controllers/attention.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const attentionRouter = express.Router();

attentionRouter.get('/', authenticateJWT, getAllAttentionsController);
attentionRouter.get('/count', authenticateJWT, getAttentionCountController);
attentionRouter.get('/:id', authenticateJWT, getAttentionByIdController);
attentionRouter.post('/', authenticateJWT, createAttentionController);
attentionRouter.put('/:id', authenticateJWT, updateAttentionController);
attentionRouter.delete('/:id', authenticateJWT, deleteAttentionController);

export default attentionRouter;