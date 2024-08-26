import { Request, Response } from 'express';
import {
    getAllStatesService,
    getTownsByStateService
} from '../services/location.service';

export const getAllStatesController = async (req: Request, res: Response) => {
    try {
        const estados = await getAllStatesService();

        res.status(200).json({
            status: 'success',
            message: 'Todos los estados',
            estados
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getTownsByStateController = async (req: Request, res: Response) => {
    try {
        const municipios = await getTownsByStateService(parseInt(req.params.estado));

        if (municipios.length > 0) {
            res.status(200).json({
                status: 'success',
                message: 'Todos los municipios',
                municipios
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