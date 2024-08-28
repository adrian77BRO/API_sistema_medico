import { Request, Response } from 'express';
import {
    getAllConsultsService,
    getConsultByIdService,
    getConsultsByPatientService,
    getConsultsByDateService,
    getConsultsByStatusService,
    getConsultCountService,
    createConsultService,
    updateConsultService,
    deleteConsultService
} from '../services/consult.service';

export const getAllConsultsController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const consultas = await getAllConsultsService(id_usuario);

        res.status(200).json({
            status: 'success',
            message: 'Todas las consultas',
            consultas
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getConsultByIdController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const consulta = await getConsultByIdService(parseInt(req.params.id), id_usuario);

        if (consulta) {
            res.status(200).json({
                status: 'success',
                message: 'Consulta encontrada exitosamente',
                consulta
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Consulta no encontrada'
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

export const getConsultsByPatientController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const consultas = await getConsultsByPatientService(id_usuario, req.params.paciente);

        if (consultas.length > 0) {
            res.status(200).json({
                status: 'success',
                message: 'Consultas encontradas',
                consultas
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

export const getConsultsByDateController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const consultas = await getConsultsByDateService(id_usuario, req.params.fecha);

        if (consultas.length > 0) {
            res.status(200).json({
                status: 'success',
                message: 'Consultas encontradas',
                consultas
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

export const getConsultsByStatusController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const consultas = await getConsultsByStatusService(id_usuario, parseInt(req.params.estatus));

        if (consultas.length > 0) {
            res.status(200).json({
                status: 'success',
                message: 'Consultas encontradas',
                consultas
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

export const getConsultCountController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const count = await getConsultCountService(id_usuario);

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


export const createConsultController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const nuevaConsulta = req.body;
        await createConsultService(nuevaConsulta, parseInt(req.params.paciente), id_usuario);

        res.status(201).json({
            status: 'success',
            message: 'Consulta registrada exitosamente',
            consulta: nuevaConsulta
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar',
            error
        });
    }
};

export const updateConsultController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const consulta = await getConsultByIdService(parseInt(req.params.id), id_usuario);

        if (consulta) {
            const consultaEditada = req.body;
            await updateConsultService(parseInt(req.params.id), consultaEditada);
            res.status(201).json({
                status: 'success',
                message: 'Consulta actualizada exitosamente',
                consulta: consultaEditada
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Consulta no encontrada'
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

export const deleteConsultController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const consulta = await getConsultByIdService(parseInt(req.params.id), id_usuario);

        if (consulta) {
            await deleteConsultService(parseInt(req.params.id));
            res.status(201).json({
                status: 'success',
                message: 'Consulta eliminada exitosamente'
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Consulta no encontrada'
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