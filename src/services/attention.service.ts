import { db } from '../config/database';
import { Atencion } from '../models/attention';

export const getAllAttentionsService = async (id_usuario: number): Promise<Atencion[]> => {
    const query = 'SELECT * FROM tbl_atencion_medica WHERE fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Atencion[];
};

export const getAttentionByIdService = async (id: number, id_usuario: number): Promise<Atencion | null> => {
    const query = 'SELECT * FROM tbl_atencion_medica WHERE id_atencion_medica = ? AND fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id, id_usuario]);
    const atenciones = rows as Atencion[];
    return atenciones.length ? atenciones[0] : null;
};

export const getAttentionCountService = async (id_usuario: number): Promise<number> => {
    const query = 'SELECT COUNT(*) AS count FROM tbl_atencion_medica WHERE fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id_usuario]);
    const count = (rows as { count: number }[])[0].count;
    return count;
};

export const createAttentionService = async (atencion: Omit<Atencion, 'id'>, id_usuario: number): Promise<void> => {
    const query = `
        INSERT INTO tbl_atencion_medica (id_usuario, nombre, descripcion, sintomas,
        causas, estatus, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, now())
    `;
    await db.query(query, [
        id_usuario, atencion.nombre,
        atencion.descripcion, atencion.sintomas,
        atencion.causas, atencion.estatus]);
};

export const updateAttentionService = async (id: number, atencion: Omit<Atencion, 'id'>): Promise<void> => {
    const query = `
        UPDATE tbl_atencion_medica SET nombre = ?, descripcion = ?,
        sintomas = ?, causas = ?, estatus = ? WHERE id_atencion_medica = ?
    `;
    await db.query(query, [
        atencion.nombre, atencion.descripcion,
        atencion.sintomas, atencion.causas,
        atencion.estatus, id
    ]);
};

export const deleteAttentionService = async (id: number): Promise<void> => {
    const query = 'UPDATE tbl_atencion_medica SET fecha_eliminado = now() WHERE id_atencion_medica = ?';
    await db.query(query, [id]);
};