import { db } from '../config/database';
import { Usuario } from '../models/user';

export const findUserByEmail = async (correo: string): Promise<Usuario | null> => {
    const [rows] = await db.query('SELECT * FROM tblc_usuario WHERE correo = ?', [correo]);
    const usuarios = rows as Usuario[];
    return usuarios.length ? usuarios[0] : null;
};

export const getProfileService = async (id_usuario: number): Promise<Usuario | null> => {
    const query = `SELECT m.nombre municipio, e.nombre estado, u.nombre, u.apellidos, u.correo,
            u.telefono, u.cedula, u.cedula_especialidad, u.cedula_subespecialidad,
            s.nombre especialidad, u.telefono_urgencias, u.whatsapp, u.direccion, u.facebook,
            u.twitter, u.instagram, u.web, u.sobre_mi, u.experiencia
            FROM tblc_usuario u
            JOIN tblc_especialidad s ON s.id_especialidad = u.id_especialidad
            JOIN tblc_municipio m ON m.id_municipio = u.id_municipio
            JOIN tblc_estado e ON e.id_estado = m.id_estado
            WHERE u.id_usuario = ? AND u.tipo = 2 AND u.fecha_eliminado IS NULL;`
    const [rows] = await db.query(query, [id_usuario]);
    const usuarios = rows as Usuario[];
    return usuarios.length ? usuarios[0] : null;
};

/*export const registerUser = async (usuario: Omit<Usuario, 'id'>): Promise<void> => {
    const query = `
    INSERT INTO tblc_usuario (nombre, apellidos, usuario, pass, tipo, estatus,
    acceso_app, fecha_registro, telefono, correo, id_especialidad, id_medico,
    editar, eliminar, direccion, sobre_mi, telefono_urgencias, whatsapp, estatus_web,
    experiencia, facebook, twitter, instagram, web, enlace, estatus_principal,
    id_municipio, estatus_citas_web, estatus_ubicacion, tipo_cita, id_vendedor)
    VALUES (?,?,?,?,2,1,1,now(),?,?,3,0,1,1,?,?,?,?,0,?,'123','123','123','123','123',1,1,1,1,1,0)
    `;

    const encriptado = await bcrypt.hash(usuario.pass, 10);
    await db.query(query, [
        usuario.nombre, usuario.apellidos, usuario.usuario, encriptado, usuario.tipo,
        usuario.estatus, usuario.acceso_app, usuario.fecha_registro, usuario.telefono,
        usuario.correo, usuario.id_especialidad, usuario.id_medico, usuario.editar,
        usuario.eliminar, usuario.direccion, usuario.sobre_mi, usuario.telefono_urgencias,
        usuario.whatsapp, usuario.estatus_web, usuario.experiencia, usuario.facebook,
        usuario.twitter, usuario.instagram, usuario.web, usuario.enlace,
        usuario.estatus_principal, usuario.id_municipio, usuario.estatus_citas_web,
        usuario.estatus_ubicación, usuario.tipo_cita, usuario.id_vendedor]
    );
};*/