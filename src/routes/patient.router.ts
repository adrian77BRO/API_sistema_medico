import express from 'express';
import {
    getAllPatientsController,
    getPatientByIdController,
    getPatientsByNameController,
    getPatientInfoByIdController,
    getPatientCountController,
    createPatientController,
    updatePatientController,
    deletePatientController
} from '../controllers/patient.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const patientRouter = express.Router();

patientRouter.get('/', authenticateJWT, getAllPatientsController);
patientRouter.get('/count', authenticateJWT, getPatientCountController);
patientRouter.get('/nombre/:paciente', authenticateJWT, getPatientsByNameController)
patientRouter.get('/:id', authenticateJWT, getPatientByIdController);
patientRouter.get('/:id/info', authenticateJWT, getPatientInfoByIdController);
patientRouter.post('/', authenticateJWT, createPatientController);
patientRouter.put('/:id', authenticateJWT, updatePatientController);
patientRouter.delete('/:id', authenticateJWT, deletePatientController);

export default patientRouter;