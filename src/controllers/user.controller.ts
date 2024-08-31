import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import {
    findUserByUsername,
    getProfileService,
    updateProfileService
} from '../services/user.service';

const JWT_SECRET = process.env.JWT_SECRET || '';

export const loginController = async (req: Request, res: Response) => {
    try {
        const { usuario, pass } = req.body;
        const user = await findUserByUsername(usuario);

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Usuario incorrecto',
            });
        }
        if (user.tipo != 2 || user.acceso_app == 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Acceso denegado',
            });
        }

        /*const isMatch = bcrypt.compare(pass, user.pass);
        if (!isMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Contraseña incorrecta',
                isMatch,
            });
        }*/

        const token = jwt.sign({ id: user.id_usuario }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            status: 'success',
            message: 'Acceso exitoso al sistema',
            usuario: user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error logging in user',
            error,
        });
        console.error(error);
    }
};

export const getProfileController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const perfil = await getProfileService(id_usuario);

        if (perfil) {
            res.status(200).json({
                status: 'success',
                message: 'Perfil del usuario',
                perfil
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener',
            error
        });
        console.log(error);
    }
};

export const updateProfileController = async (req: Request, res: Response) => {
    try {
        const id_usuario = (req as any).user.id;
        const perfilEditado = req.body;
        await updateProfileService(id_usuario, perfilEditado);
        res.status(201).json({
            status: 'success',
            message: 'Datos actualizados exitosamente',
            perfil: perfilEditado
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar',
            error
        });
    }
};