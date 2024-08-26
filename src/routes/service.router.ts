import express from 'express';
import {
    getAllServicesController,
    getServiceByIdController,
    getServiceCountController,
    createServiceController,
    updateServiceController,
    deleteServiceController
} from '../controllers/service.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const serviceRouter = express.Router();

serviceRouter.get('/', authenticateJWT, getAllServicesController);
serviceRouter.get('/count', authenticateJWT, getServiceCountController);
serviceRouter.get('/:id', authenticateJWT, getServiceByIdController);
serviceRouter.post('/', authenticateJWT, createServiceController);
serviceRouter.put('/:id', authenticateJWT, updateServiceController);
serviceRouter.delete('/:id', authenticateJWT, deleteServiceController);

export default serviceRouter;