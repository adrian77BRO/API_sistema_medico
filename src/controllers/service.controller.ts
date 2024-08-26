import { Request, Response } from 'express';
import {
    getAllServicesService,
    getServiceByIdService,
    getServiceCountService,
    createServiceService,
    updateServiceService,
    deleteServiceService
} from '../services/service.service';

export const getAllServicesController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const servicios = await getAllServicesService(id_usuario);

        res.status(200).json({
            status: 'success',
            message: 'Todos los servicios',
            servicios
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getServiceByIdController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const servicio = await getServiceByIdService(parseInt(req.params.id), id_usuario);

        if (servicio) {
            res.status(200).json({
                status: 'success',
                message: 'Servicio encontrado exitosamente',
                servicio
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
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

export const getServiceCountController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const count = await getServiceCountService(id_usuario);

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


export const createServiceController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const nuevoServicio = req.body;
        await createServiceService(nuevoServicio, id_usuario);

        res.status(201).json({
            status: 'success',
            message: 'Servicio registrado exitosamente',
            servicio: nuevoServicio
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar',
            error
        });
    }
};

export const updateServiceController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const servicio = await getServiceByIdService(parseInt(req.params.id), id_usuario);

        if (servicio) {
            const servicioEditado = req.body;
            await updateServiceService(parseInt(req.params.id), servicioEditado);
            res.status(201).json({
                status: 'success',
                message: 'Servicio actualizado exitosamente',
                servicio: servicioEditado
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
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

export const deleteServiceController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const servicio = await getServiceByIdService(parseInt(req.params.id), id_usuario);

        if (servicio) {
            await deleteServiceService(parseInt(req.params.id));
            res.status(201).json({
                status: 'success',
                message: 'Servicio eliminado exitosamente'
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
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