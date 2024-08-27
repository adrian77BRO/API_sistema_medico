import express from 'express';
import {
    getAllHistoriesController,
    getHistoryByIdController,
    getAllBloodsController,
    createHistoryController,
    updateHistoryController,
    deleteHistoryController
} from '../controllers/history.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const historyRouter = express.Router();

historyRouter.get('/', authenticateJWT, getAllHistoriesController);
historyRouter.get('/tiposangre', getAllBloodsController);
historyRouter.get('/:id', authenticateJWT, getHistoryByIdController);
historyRouter.post('/', authenticateJWT, createHistoryController);
historyRouter.put('/:id', authenticateJWT, updateHistoryController);
historyRouter.delete('/:id', authenticateJWT, deleteHistoryController);

export default historyRouter;