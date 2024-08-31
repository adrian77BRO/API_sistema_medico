import { db } from '../config/database';
import { Usuario } from '../models/user';

export const findUserByUsername = async (usuario: string): Promise<Usuario | null> => {
    const [rows] = await db.query('SELECT * FROM tblc_usuario WHERE usuario = ?', [usuario]);
    const usuarios = rows as Usuario[];
    return usuarios.length ? usuarios[0] : null;
};

export const getProfileService = async (id_usuario: number): Promise<Usuario | null> => {
    const query = `
        SELECT m.nombre municipio, e.nombre estado, u.nombre, u.apellidos, u.correo,
        u.telefono, u.cedula, u.cedula_especialidad, u.cedula_subespecialidad,
        s.nombre especialidad, u.telefono_urgencias, u.whatsapp, u.direccion,
        u.facebook, u.twitter, u.instagram, u.web, u.sobre_mi, u.experiencia, u.foto
        FROM tblc_usuario u
        JOIN tblc_especialidad s ON s.id_especialidad = u.id_especialidad
        JOIN tblc_municipio m ON m.id_municipio = u.id_municipio
        JOIN tblc_estado e ON e.id_estado = m.id_estado
        WHERE u.id_usuario = ? AND u.fecha_eliminado IS NULL
    `;
    const [rows] = await db.query(query, [id_usuario]);
    const usuarios = rows as Usuario[];
    return usuarios.length ? usuarios[0] : null;
};

export const updateProfileService = async (id: number, usuario: Omit<Usuario, 'id'>): Promise<void> => {
    const query = `
        UPDATE tblc_usuario SET correo = ?, telefono = ?, telefono_urgencias = ?,
        whatsapp = ?, direccion = ?, facebook = ?, twitter = ?, instagram = ?, web = ?,
        sobre_mi = ?, experiencia = ? WHERE id_usuario = ?
    `;
    await db.query(query, [
        usuario.correo, usuario.telefono, usuario.telefono_urgencias,
        usuario.whatsapp, usuario.direccion, usuario.facebook, usuario.twitter,
        usuario.instagram, usuario.web, usuario.sobre_mi, usuario.experiencia, id
    ]);
};