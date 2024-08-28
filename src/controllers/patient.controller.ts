import { Request, Response } from 'express';
import {
    getAllPatientsService,
    getPatientByIdService,
    getPatientInfoByIdService,
    getPatientCountService,
    createPatientService,
    updatePatientService,
    deletePatientService
} from '../services/patient.service';

export const getAllPatientsController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const pacientes = await getAllPatientsService(id_usuario);

        res.status(200).json({
            status: 'success',
            message: 'Todos los pacientes',
            pacientes
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
    }
};

export const getPatientByIdController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const paciente = await getPatientByIdService(parseInt(req.params.id), id_usuario);

        if (paciente) {
            res.status(200).json({
                status: 'success',
                message: 'Paciente encontrado exitosamente',
                paciente
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Paciente no encontrado'
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

export const getPatientInfoByIdController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const paciente = await getPatientInfoByIdService(parseInt(req.params.id), id_usuario);

        if (paciente) {
            res.status(200).json({
                status: 'success',
                message: 'Información general del paciente',
                paciente
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Paciente no encontrado'
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

export const getPatientCountController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const count = await getPatientCountService(id_usuario);

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


export const createPatientController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const nuevoPaciente = req.body;
        await createPatientService(nuevoPaciente, id_usuario);

        res.status(201).json({
            status: 'success',
            message: 'Paciente registrado exitosamente',
            paciente: nuevoPaciente
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar',
            error
        });
    }
};

export const updatePatientController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const paciente = await getPatientByIdService(parseInt(req.params.id), id_usuario);

        if (paciente) {
            const pacienteEditado = req.body;
            await updatePatientService(parseInt(req.params.id), pacienteEditado);
            res.status(201).json({
                status: 'success',
                message: 'Paciente actualizado exitosamente',
                paciente: pacienteEditado
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Paciente no encontrado'
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

export const deletePatientController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const paciente = await getPatientByIdService(parseInt(req.params.id), id_usuario);

        if (paciente) {
            await deletePatientService(parseInt(req.params.id));
            res.status(201).json({
                status: 'success',
                message: 'Paciente eliminado exitosamente'
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Paciente no encontrado'
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