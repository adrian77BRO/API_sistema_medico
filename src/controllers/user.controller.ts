import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
    findUserByEmail,
    getProfileService,
    updateProfileService
} from '../services/user.service';

const JWT_SECRET = process.env.JWT_SECRET || '';

/*export const registerController = async (req: Request, res: Response) => {
    try {
        const nuevoUsuario = req.body;
        const existeCorreo = await findUserByEmail(nuevoUsuario.correo);

        if (existeCorreo) {
            await registerUser(nuevoUsuario);
            return res.status(400).json({
                status: 'error',
                message: 'El correo ingresado ya está en uso',
            });
        }
        await registerUser(nuevoUsuario);
        res.status(201).json({
            status: 'success',
            message: 'Usuario nuevo registrado exitosamente',
            usuario: nuevoUsuario

        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrarse',
            error,
        });
        console.error(error);
    }
};*/

export const loginController = async (req: Request, res: Response) => {
    try {
        const { correo, pass } = req.body;
        const usuario = await findUserByEmail(correo);

        if (!usuario) {
            return res.status(400).json({
                status: 'error',
                message: 'Correo incorrecto',
            });
        }

        let encriptado = usuario.pass;

        if (encriptado.startsWith('$2y$')) {
            encriptado = encriptado.replace('$2y$', '$2a$');
        }

        const isMatch = bcrypt.compare(pass, encriptado);
        if (!isMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Contraseña incorrecta',
                isMatch
            });
        }

        const token = jwt.sign({ id: usuario.id_usuario }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            status: 'success',
            message: 'Acceso exitoso al sistema',
            usuario,
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