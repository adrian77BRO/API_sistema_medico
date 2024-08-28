import express from 'express';
import {
    getAllPaymentsController,
    getPaymentByIdController,
    getPaymentCountController,
    createPaymentController,
    updatePaymentController,
    deletePaymentController
} from '../controllers/payment.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const paymentRouter = express.Router();

paymentRouter.get('/:paciente', authenticateJWT, getAllPaymentsController);
paymentRouter.get('/:paciente/count', authenticateJWT, getPaymentCountController);
paymentRouter.get('/:paciente/:id', authenticateJWT, getPaymentByIdController);
paymentRouter.post('/:paciente', authenticateJWT, createPaymentController);
paymentRouter.put('/:paciente/:id', authenticateJWT, updatePaymentController);
paymentRouter.delete('/:paciente/:id', authenticateJWT, deletePaymentController);

export default paymentRouter;