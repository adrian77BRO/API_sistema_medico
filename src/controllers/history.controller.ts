import { Request, Response } from 'express';
import {
    getAllHistoriesService,
    getHistoryByIdService,
    getAllBloodsService,
    createHistoryService,
    updateHistoryService,
    deleteHistoryService
} from '../services/history.service';

export const getAllHistoriesController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const historiales = await getAllHistoriesService(id_usuario);

        res.status(200).json({
            status: 'success',
            message: 'Historial médico',
            historiales
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getHistoryByIdController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const historial = await getHistoryByIdService(parseInt(req.params.id), id_usuario);

        if (historial) {
            res.status(200).json({
                status: 'success',
                message: 'Historial médico encontrado exitosamente',
                historial
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Historial médico no encontrado'
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

export const getAllBloodsController = async (req: Request, res: Response) => {
    try {
        const tipos_sangre = await getAllBloodsService();

        res.status(200).json({
            status: 'success',
            message: 'Tipos de sangre',
            tipos_sangre
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};


export const createHistoryController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const nuevoHistorial = req.body;
        await createHistoryService(nuevoHistorial, id_usuario);

        res.status(201).json({
            status: 'success',
            message: 'Historial médico registrado exitosamente',
            historial: nuevoHistorial
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar',
            error
        });
    }
};

export const updateHistoryController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const historial = await getHistoryByIdService(parseInt(req.params.id), id_usuario);

        if (historial) {
            const historialEditado = req.body;
            await updateHistoryService(parseInt(req.params.id), historialEditado);
            res.status(201).json({
                status: 'success',
                message: 'Historial actualizado exitosamente',
                historial: historialEditado
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Historial no encontrado'
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

export const deleteHistoryController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const historial = await getHistoryByIdService(parseInt(req.params.id), id_usuario);

        if (historial) {
            await deleteHistoryService(parseInt(req.params.id));
            res.status(201).json({
                status: 'success',
                message: 'Historial eliminado exitosamente'
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Historial no encontrado'
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