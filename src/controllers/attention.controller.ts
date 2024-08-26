import { Request, Response } from 'express';
import {
    getAllAttentionsService,
    getAttentionByIdService,
    getAttentionCountService,
    createAttentionService,
    updateAttentionService,
    deleteAttentionService
} from '../services/attention.service';

export const getAllAttentionsController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const atenciones = await getAllAttentionsService(id_usuario);

        res.status(200).json({
            status: 'success',
            message: 'Atenciones médicas',
            atenciones
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getAttentionByIdController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const atencion = await getAttentionByIdService(parseInt(req.params.id), id_usuario);

        if (atencion) {
            res.status(200).json({
                status: 'success',
                message: 'Atención médica encontrada exitosamente',
                atencion
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Atención médica no encontrada'
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

export const getAttentionCountController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const count = await getAttentionCountService(id_usuario);

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


export const createAttentionController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const nuevaAtencion = req.body;
        await createAttentionService(nuevaAtencion, id_usuario);

        res.status(201).json({
            status: 'success',
            message: 'Atención médica registrada exitosamente',
            atencion: nuevaAtencion
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar',
            error
        });
    }
};

export const updateAttentionController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const atencion = await getAttentionByIdService(parseInt(req.params.id), id_usuario);

        if (atencion) {
            const atencionEditada = req.body;
            await updateAttentionService(parseInt(req.params.id), atencionEditada);
            res.status(201).json({
                status: 'success',
                message: 'Atención médica actualizada exitosamente',
                atencion: atencionEditada
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Atención médica no encontrada'
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

export const deleteAttentionController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const atencion = await getAttentionByIdService(parseInt(req.params.id), id_usuario);

        if (atencion) {
            await deleteAttentionService(parseInt(req.params.id));
            res.status(201).json({
                status: 'success',
                message: 'Atención médica eliminada exitosamente'
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Atención médica no encontrada'
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