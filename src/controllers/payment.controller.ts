import { Request, Response } from 'express';
import {
    getAllPaymentsService,
    getPaymentByIdService,
    getPaymentCountService,
    createPaymentService,
    updatePaymentService,
    deletePaymentService
} from '../services/payment.service';

export const getAllPaymentsController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const pagos = await getAllPaymentsService(parseInt(req.params.paciente), id_usuario);

        res.status(200).json({
            status: 'success',
            message: 'Todos los pagos del paciente',
            pagos
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getPaymentByIdController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const pago = await getPaymentByIdService(
            parseInt(req.params.id),
            parseInt(req.params.paciente),
            id_usuario
        );

        if (pago) {
            res.status(200).json({
                status: 'success',
                message: 'Pago encontrado exitosamente',
                pago
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Pago no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getPaymentCountController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const count = await getPaymentCountService(parseInt(req.params.paciente), id_usuario);

        res.status(200).json({
            status: 'success',
            count
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};


export const createPaymentController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const nuevoPago = req.body;
        await createPaymentService(nuevoPago, parseInt(req.params.paciente), id_usuario);

        res.status(201).json({
            status: 'success',
            message: 'Pago registrado exitosamente',
            pago: nuevoPago
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar',
            error
        });
    }
};

export const updatePaymentController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const pago = await getPaymentByIdService(
            parseInt(req.params.id),
            parseInt(req.params.paciente),
            id_usuario
        );

        if (pago) {
            const pagoEditado = req.body;
            await updatePaymentService(parseInt(req.params.id), pagoEditado);
            res.status(201).json({
                status: 'success',
                message: 'Pago actualizado exitosamente',
                pago: pagoEditado
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Pago no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar',
            error
        });
    }
};

export const deletePaymentController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const pago = await getPaymentByIdService(
            parseInt(req.params.id),
            parseInt(req.params.paciente),
            id_usuario
        );

        if (pago) {
            await deletePaymentService(parseInt(req.params.id));
            res.status(201).json({
                status: 'success',
                message: 'Pago eliminado exitosamente'
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Pago no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar',
            error
        });
    }
};