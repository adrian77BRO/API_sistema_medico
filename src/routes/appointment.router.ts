import express from 'express';
import {
    getAllAppointmentsController,
    getAppointmentByIdController,
    getAppointmentCountController,
    getAppointmentsByPatientController,
    getAppointmentsByDateController,
    getAppointmentsByStatusController,
    createAppointmentController,
    updateAppointmentController,
    deleteAppointmentController,
    cancelAppointmentController
} from '../controllers/appointment.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const appointmentRouter = express.Router();

appointmentRouter.get('/', authenticateJWT, getAllAppointmentsController);
appointmentRouter.get('/count', authenticateJWT, getAppointmentCountController);
appointmentRouter.get('/paciente/:paciente', authenticateJWT, getAppointmentsByPatientController);
appointmentRouter.get('/fecha/:fecha', authenticateJWT, getAppointmentsByDateController);
appointmentRouter.get('/estatus/:estatus', authenticateJWT, getAppointmentsByStatusController);
appointmentRouter.get('/:id', authenticateJWT, getAppointmentByIdController);
appointmentRouter.post('/', authenticateJWT, createAppointmentController);
appointmentRouter.put('/:id', authenticateJWT, updateAppointmentController);
appointmentRouter.delete('/cancel/:id', authenticateJWT, cancelAppointmentController)
appointmentRouter.delete('/:id', authenticateJWT, deleteAppointmentController);

export default appointmentRouter;