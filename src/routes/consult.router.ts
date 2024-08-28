import express from 'express';
import {
    getAllConsultsController,
    getConsultByIdController,
    getConsultCountController,
    getConsultsByPatientController,
    getConsultsByDateController,
    getConsultsByStatusController,
    createConsultController,
    updateConsultController,
    deleteConsultController
} from '../controllers/consult.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const consultRouter = express.Router();

consultRouter.get('/', authenticateJWT, getAllConsultsController);
consultRouter.get('/count', authenticateJWT, getConsultCountController);
consultRouter.get('/paciente/:paciente', authenticateJWT, getConsultsByPatientController);
consultRouter.get('/fecha/:fecha', authenticateJWT, getConsultsByDateController);
consultRouter.get('/estatus/:estatus', authenticateJWT, getConsultsByStatusController);
consultRouter.get('/:id', authenticateJWT, getConsultByIdController);
consultRouter.post('/:paciente', authenticateJWT, createConsultController);
consultRouter.put('/:id', authenticateJWT, updateConsultController);
consultRouter.delete('/:id', authenticateJWT, deleteConsultController);

export default consultRouter;