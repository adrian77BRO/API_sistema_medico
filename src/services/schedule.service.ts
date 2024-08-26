import { db } from '../config/database';
import { Horario } from '../models/schedule';

export const getAllSchedulesService = async (id_usuario: number): Promise<Horario[]> => {
    const query = 'SELECT * FROM tbl_horario WHERE id_usuario = ?';
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Horario[];
};

export const getScheduleByIdService = async (id: number, id_usuario: number): Promise<Horario | null> => {
    const query = 'SELECT * FROM tbl_horario WHERE id_horario = ? AND id_usuario = ?';
    const [rows] = await db.query(query, [id, id_usuario]);
    const horarios = rows as Horario[];
    return horarios.length ? horarios[0] : null;
};

export const getScheduleCountService = async (id_usuario: number): Promise<number> => {
    const query = 'SELECT COUNT(*) AS count FROM tbl_horario WHERE id_usuario = ?';
    const [rows] = await db.query(query, [id_usuario]);
    const count = (rows as { count: number }[])[0].count;
    return count;
};

export const createScheduleService = async (horario: Omit<Horario, 'id'>, id_usuario: number): Promise<void> => {
    const query = 'INSERT INTO tbl_horario (id_usuario, dia, hora_inicio, hora_termino) VALUES (?, ?, ?, ?)';
    await db.query(query, [id_usuario, horario.dia, horario.hora_inicio, horario.hora_termino]);
};

export const updateScheduleService = async (id: number, horario: Omit<Horario, 'id'>): Promise<void> => {
    const query = 'UPDATE tbl_horario SET dia = ?, hora_inicio = ?, hora_termino = ? WHERE id_horario = ?';
    await db.query(query, [horario.dia, horario.hora_inicio, horario.hora_termino, id]);
};

export const deleteScheduleService = async (id: number): Promise<void> => {
    const query = 'DELETE FROM tbl_horario WHERE id_horario = ?';
    await db.query(query, [id]);
};