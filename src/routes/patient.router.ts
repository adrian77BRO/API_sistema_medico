import express from 'express';
import {
    getAllPatientsController,
    getPatientByIdController,
    getPatientCountController,
    createPatientController,
    updatePatientController,
    deletePatientController
} from '../controllers/patient.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const patientRouter = express.Router();

patientRouter.get('/', authenticateJWT, getAllPatientsController);
patientRouter.get('/count', authenticateJWT, getPatientCountController);
patientRouter.get('/:id', authenticateJWT, getPatientByIdController);
patientRouter.post('/', authenticateJWT, createPatientController);
patientRouter.put('/:id', authenticateJWT, updatePatientController);
patientRouter.delete('/:id', authenticateJWT, deletePatientController);

export default patientRouter;