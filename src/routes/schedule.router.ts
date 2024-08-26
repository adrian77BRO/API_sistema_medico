import express from 'express';
import {
    getAllSchedulesController,
    getScheduleByIdController,
    getScheduleCountController,
    createScheduleController,
    updateScheduleController,
    deleteScheduleController
} from '../controllers/schedule.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const scheduleRouter = express.Router();

scheduleRouter.get('/', authenticateJWT, getAllSchedulesController);
scheduleRouter.get('/count', authenticateJWT, getScheduleCountController);
scheduleRouter.get('/:id', authenticateJWT, getScheduleByIdController);
scheduleRouter.post('/', authenticateJWT, createScheduleController);
scheduleRouter.put('/:id', authenticateJWT, updateScheduleController);
scheduleRouter.delete('/:id', authenticateJWT, deleteScheduleController);

export default scheduleRouter;