import { Request, Response } from 'express';
import {
    getAllAppointmentsService,
    getAppointmentByIdService,
    getAppointmentsByPatientService,
    getAppointmentsByDateService,
    getAppointmentsByStatusService,
    getAppointmentCountService,
    createAppointmentService,
    updateAppointmentService,
    deleteAppointmentService,
    cancelAppointmentService
} from '../services/appointment.service';

export const getAllAppointmentsController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const citas = await getAllAppointmentsService(id_usuario);

        res.status(200).json({
            status: 'success',
            message: 'Todas las citas',
            citas
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getAppointmentByIdController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const cita = await getAppointmentByIdService(parseInt(req.params.id), id_usuario);

        if (cita) {
            res.status(200).json({
                status: 'success',
                message: 'Cita encontrada exitosamente',
                cita
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Cita no encontrada'
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

export const getAppointmentsByPatientController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const citas = await getAppointmentsByPatientService(id_usuario, req.params.paciente);

        res.status(200).json({
            status: 'success',
            message: 'Citas encontradas',
            citas
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getAppointmentsByDateController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const citas = await getAppointmentsByDateService(id_usuario, req.params.fecha);

        if (citas.length > 0) {
            res.status(200).json({
                status: 'success',
                message: 'Citas encontradas',
                citas
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'No se encontraron resultados'
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

export const getAppointmentsByStatusController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const citas = await getAppointmentsByStatusService(id_usuario, parseInt(req.params.estatus));

        res.status(200).json({
            status: 'success',
            message: 'Citas encontradas',
            citas
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getAppointmentCountController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const count = await getAppointmentCountService(id_usuario);

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


export const createAppointmentController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const nuevaCita = req.body;
        await createAppointmentService(nuevaCita, id_usuario);

        res.status(201).json({
            status: 'success',
            message: 'Cita registrada exitosamente',
            cita: nuevaCita
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar',
            error
        });
    }
};

export const updateAppointmentController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const cita = await getAppointmentByIdService(parseInt(req.params.id), id_usuario);

        if (cita) {
            const citaEditada = req.body;
            await updateAppointmentService(parseInt(req.params.id), citaEditada);
            res.status(201).json({
                status: 'success',
                message: 'Cita actualizada exitosamente',
                cita: citaEditada
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Cita no encontrada'
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

export const deleteAppointmentController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const cita = await getAppointmentByIdService(parseInt(req.params.id), id_usuario);

        if (cita) {
            await deleteAppointmentService(parseInt(req.params.id));
            res.status(201).json({
                status: 'success',
                message: 'Cita eliminada exitosamente'
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Cita no encontrada'
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

export const cancelAppointmentController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const cita = await getAppointmentByIdService(parseInt(req.params.id), id_usuario);

        if (cita) {
            await cancelAppointmentService(parseInt(req.params.id));
            res.status(201).json({
                status: 'success',
                message: 'Cita cancelada exitosamente'
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Cita no encontrada'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al cancelar',
            error
        });
    }
};