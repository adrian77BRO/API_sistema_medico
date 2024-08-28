import { db } from '../config/database';
import { Pago } from '../models/payment';

export const getAllPaymentsService = async (id_paciente: number, id_usuario: number): Promise<Pago[]> => {
    const query = 'SELECT * FROM tbl_pago WHERE fecha_eliminado IS NULL AND id_paciente = ? AND id_usuario = ?';
    const [rows] = await db.query(query, [id_paciente, id_usuario]);
    return rows as Pago[];
};

export const getPaymentByIdService = async (id: number, id_paciente: number, id_usuario: number): Promise<Pago | null> => {
    const query = 'SELECT * FROM tbl_pago WHERE id_pago = ? AND fecha_eliminado IS NULL AND id_paciente = ? AND id_usuario = ?';
    const [rows] = await db.query(query, [id, id_paciente, id_usuario]);
    const pagos = rows as Pago[];
    return pagos.length ? pagos[0] : null;
};

export const getPaymentCountService = async (id_paciente: number, id_usuario: number): Promise<number> => {
    const query = 'SELECT COUNT(*) AS count FROM tbl_pago WHERE fecha_eliminado IS NULL AND id_paciente = ? AND id_usuario = ?';
    const [rows] = await db.query(query, [id_paciente, id_usuario]);
    const count = (rows as { count: number }[])[0].count;
    return count;
};

export const createPaymentService = async (pago: Omit<Pago, 'id'>, id_paciente: number, id_usuario: number): Promise<void> => {
    const query = 'INSERT INTO tbl_pago (monto, fecha, id_paciente, id_usuario, fecha_registro) VALUES (?, ?, ?, ?, now())';
    await db.query(query, [pago.monto, pago.fecha, id_paciente, id_usuario]);
};

export const updatePaymentService = async (id: number, pago: Omit<Pago, 'id'>): Promise<void> => {
    const query = 'UPDATE tbl_pago SET monto = ?, fecha = ? WHERE id_pago = ?';
    await db.query(query, [pago.monto, pago.fecha, id]);
};

export const deletePaymentService = async (id: number): Promise<void> => {
    const query = 'UPDATE tbl_pago SET fecha_eliminado = now() WHERE id_pago = ?';
    await db.query(query, [id]);
};