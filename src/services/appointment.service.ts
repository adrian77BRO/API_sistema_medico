import { db } from '../config/database';
import { Cita } from '../models/appointment';

export const getAllAppointmentsService = async (id_usuario: number): Promise<Cita[]> => {
    const query = `
            SELECT c.id_cita, CONCAT(p.nombre, ' ', p.apellidos) paciente, c.fecha,
            CONCAT(u.nombre, ' ', u.apellidos) usuario, c.estatus
            FROM tbl_cita c JOIN tblc_paciente p ON p.id_paciente = c.id_paciente
            JOIN tblc_usuario u ON u.id_usuario = c.id_usuario
            WHERE c.id_usuario = ? AND c.fecha_eliminado IS NULL
    `;
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Cita[];
};

export const getAppointmentByIdService = async (id: number, id_usuario: number): Promise<Cita | null> => {
    const query = 'SELECT * FROM tbl_cita WHERE id_cita = ? AND fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id, id_usuario]);
    const citas = rows as Cita[];
    return citas.length ? citas[0] : null;
};

export const getAppointmentsByPatientService = async (id_usuario: number, paciente: string): Promise<Cita[]> => {
    const query = `
            SELECT c.id_cita, CONCAT(p.nombre, ' ', p.apellidos) paciente, c.fecha,
            CONCAT(u.nombre, ' ', u.apellidos) usuario, c.estatus
            FROM tbl_cita c JOIN tblc_paciente p ON p.id_paciente = c.id_paciente
            JOIN tblc_usuario u ON u.id_usuario = c.id_usuario
            WHERE c.id_usuario = ? AND c.fecha_eliminado IS NULL
            AND CONCAT(p.nombre, ' ', p.apellidos) LIKE '%${paciente}%'
    `;
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Cita[];
};

export const getAppointmentsByDateService = async (id_usuario: number, fecha: string,): Promise<Cita[]> => {
    const query = `
            SELECT c.id_cita, CONCAT(p.nombre, ' ', p.apellidos) paciente, c.fecha,
            CONCAT(u.nombre, ' ', u.apellidos) usuario, c.estatus
            FROM tbl_cita c JOIN tblc_paciente p ON p.id_paciente = c.id_paciente
            JOIN tblc_usuario u ON u.id_usuario = c.id_usuario
            WHERE c.id_usuario = ? AND c.fecha_eliminado IS NULL
            AND c.fecha LIKE '%${fecha}%'
    `;
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Cita[];
};

export const getAppointmentsByStatusService = async (id_usuario: number, estatus: number): Promise<Cita[]> => {
    const query = `
            SELECT c.id_cita, CONCAT(p.nombre, ' ', p.apellidos) paciente, c.fecha,
            CONCAT(u.nombre, ' ', u.apellidos) usuario, c.estatus
            FROM tbl_cita c JOIN tblc_paciente p ON p.id_paciente = c.id_paciente
            JOIN tblc_usuario u ON u.id_usuario = c.id_usuario
            WHERE c.id_usuario = ? AND c.fecha_eliminado IS NULL AND c.estatus = ?
    `;
    const [rows] = await db.query(query, [id_usuario, estatus]);
    return rows as Cita[];
};

export const getAppointmentCountService = async (id_usuario: number): Promise<number> => {
    const query = 'SELECT COUNT(*) AS count FROM tbl_cita WHERE fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id_usuario]);
    const count = (rows as { count: number }[])[0].count;
    return count;
};

export const createAppointmentService = async (cita: Omit<Cita, 'id'>, id_paciente: number, id_usuario: number): Promise<void> => {
    const query = `
        INSERT INTO tbl_cita (fecha, fecha_registro, id_paciente, id_usuario,
        observaciones, estatus, web) VALUES (?, now(), ?, ?, ?, 0, 0)
    `;
    await db.query(query, [cita.fecha, id_paciente, id_usuario, cita.observaciones]);
};

export const updateAppointmentService = async (id: number, cita: Omit<Cita, 'id'>): Promise<void> => {
    const query = `UPDATE tbl_cita SET fecha = ?, observaciones = ? WHERE id_cita = ?`;
    await db.query(query, [cita.fecha, cita.observaciones, id]);
};

export const deleteAppointmentService = async (id: number): Promise<void> => {
    const query = 'UPDATE tbl_cita SET fecha_eliminado = now() WHERE id_cita = ?';
    await db.query(query, [id]);
};