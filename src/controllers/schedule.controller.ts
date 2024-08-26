import { Request, Response } from 'express';
import {
    getAllSchedulesService,
    getScheduleByIdService,
    getScheduleCountService,
    createScheduleService,
    updateScheduleService,
    deleteScheduleService
} from '../services/schedule.service';

export const getAllSchedulesController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const horarios = await getAllSchedulesService(id_usuario);

        res.status(200).json({
            status: 'success',
            message: 'Todos los horarios',
            horarios
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getScheduleByIdController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const horario = await getScheduleByIdService(parseInt(req.params.id), id_usuario);

        if (horario) {
            res.status(200).json({
                status: 'success',
                message: 'Horario encontrado exitosamente',
                horario
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Horario no encontrado'
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

export const getScheduleCountController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const count = await getScheduleCountService(id_usuario);

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


export const createScheduleController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const nuevoHorario = req.body;
        await createScheduleService(nuevoHorario, id_usuario);

        res.status(201).json({
            status: 'success',
            message: 'Horario registrado exitosamente',
            horario: nuevoHorario
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar',
            error
        });
    }
};

export const updateScheduleController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const horario = await getScheduleByIdService(parseInt(req.params.id), id_usuario);

        if (horario) {
            const horarioEditado = req.body;
            await updateScheduleService(parseInt(req.params.id), horarioEditado);
            res.status(201).json({
                status: 'success',
                message: 'Horario actualizado exitosamente',
                horario: horarioEditado
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Horario no encontrado'
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

export const deleteScheduleController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const horario = await getScheduleByIdService(parseInt(req.params.id), id_usuario);

        if (horario) {
            await deleteScheduleService(parseInt(req.params.id));
            res.status(201).json({
                status: 'success',
                message: 'Horario eliminado exitosamente'
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Horario no encontrado'
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