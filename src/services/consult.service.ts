import { db } from '../config/database';
import { Consulta } from '../models/consult';

export const getAllConsultsService = async (id_usuario: number): Promise<Consulta[]> => {
    const query = `
            SELECT c.id_consulta, CONCAT(p.nombre, ' ', p.apellidos) paciente,
            p.telefono, c.fecha_consulta, CONCAT(u.nombre, ' ', u.apellidos) medico,
            c.padecimientos, c.diagnostico, c.peso, c.estatura, c.temperatura,
            c.presion, c.masa_corporal, c.saturacion, c.costo, c.monto_pagado,
            (c.costo - c.monto_pagado) monto_restante FROM tbl_consulta c
            JOIN tblc_paciente p ON p.id_paciente = c.id_paciente
            JOIN tblc_usuario u ON u.id_usuario = c.id_usuario
            WHERE c.id_usuario = ? AND c.fecha_eliminado IS NULL
    `;
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Consulta[];
};

export const getConsultByIdService = async (id: number, id_usuario: number): Promise<Consulta | null> => {
    const query = 'SELECT * FROM tbl_consulta WHERE id_consulta = ? AND fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id, id_usuario]);
    const consultas = rows as Consulta[];
    return consultas.length ? consultas[0] : null;
};

export const getConsultsByPatientService = async (id_usuario: number, paciente: string): Promise<Consulta[]> => {
    const query = `
            SELECT c.id_consulta, CONCAT(p.nombre, ' ', p.apellidos) paciente,
            p.telefono, c.fecha_consulta, CONCAT(u.nombre, ' ', u.apellidos) medico,
            c.padecimientos, c.diagnostico, c.peso, c.estatura, c.temperatura,
            c.presion, c.masa_corporal, c.saturacion, c.costo, c.monto_pagado,
            (c.costo - c.monto_pagado) monto_restante FROM tbl_consulta c
            JOIN tblc_paciente p ON p.id_paciente = c.id_paciente
            JOIN tblc_usuario u ON u.id_usuario = c.id_usuario
            WHERE c.id_usuario = ? AND c.fecha_eliminado IS NULL
            AND CONCAT(p.nombre, ' ', p.apellidos) LIKE '%${paciente}%'
    `;
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Consulta[];
};

export const getConsultsByDateService = async (id_usuario: number, fecha: string,): Promise<Consulta[]> => {
    const query = `
            SELECT c.id_consulta, CONCAT(p.nombre, ' ', p.apellidos) paciente,
            p.telefono, c.fecha_consulta, CONCAT(u.nombre, ' ', u.apellidos) medico,
            c.padecimientos, c.diagnostico, c.peso, c.estatura, c.temperatura,
            c.presion, c.masa_corporal, c.saturacion, c.costo, c.monto_pagado,
            (c.costo - c.monto_pagado) monto_restante FROM tbl_consulta c
            JOIN tblc_paciente p ON p.id_paciente = c.id_paciente
            JOIN tblc_usuario u ON u.id_usuario = c.id_usuario
            WHERE c.id_usuario = ? AND c.fecha_eliminado IS NULL
            AND c.fecha_consulta LIKE '%${fecha}%'
    `;
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Consulta[];
};

export const getConsultsByStatusService = async (id_usuario: number, estatus: number): Promise<Consulta[]> => {
    const query = `
            SELECT c.id_consulta, CONCAT(p.nombre, ' ', p.apellidos) paciente,
            p.telefono, c.fecha_consulta, CONCAT(u.nombre, ' ', u.apellidos) medico,
            c.padecimientos, c.diagnostico, c.peso, c.estatura, c.temperatura,
            c.presion, c.masa_corporal, c.saturacion, c.costo, c.monto_pagado,
            (c.costo - c.monto_pagado) monto_restante FROM tbl_consulta c
            JOIN tblc_paciente p ON p.id_paciente = c.id_paciente
            JOIN tblc_usuario u ON u.id_usuario = c.id_usuario
            WHERE c.id_usuario = ? AND c.fecha_eliminado IS NULL AND c.estatus_pago = ?
    `;
    const [rows] = await db.query(query, [id_usuario, estatus]);
    return rows as Consulta[];
};

export const getConsultCountService = async (id_usuario: number): Promise<number> => {
    const query = 'SELECT COUNT(*) AS count FROM tbl_consulta WHERE fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id_usuario]);
    const count = (rows as { count: number }[])[0].count;
    return count;
};

export const createConsultService = async (consulta: Omit<Consulta, 'id'>, id_paciente: number, id_usuario: number): Promise<void> => {
    const query = `
        INSERT INTO tbl_consulta (id_usuario, id_paciente, peso, estatura, temperatura, presion, masa_corporal,
        saturacion, padecimientos, diagnostico, observaciones, costo, monto_medicamentos, monto_servicios,
        fecha_cita, fecha_registro, monto_pagado, estatus_pago, estatus_consulta, web, confirmado) VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, now(), now(), ?, ?, 1, 0, 1)
    `;
    await db.query(query, [
        id_usuario, id_paciente, consulta.peso, consulta.estatura, consulta.temperatura, consulta.presion,
        consulta.masa_corporal, consulta.saturacion, consulta.padecimientos, consulta.diagnostico, consulta.observaciones,
        consulta.costo, consulta.monto_pagado, consulta.estatus_pago
    ]);
};

export const updateConsultService = async (id: number, consulta: Omit<Consulta, 'id'>): Promise<void> => {
    const query = `
        UPDATE tbl_consulta SET peso = ?, estatura = ?, temperatura = ?, presion = ?,
        masa_corporal = ?, saturacion = ?, padecimientos = ?, diagnostico = ?, observaciones = ?,
        costo = ?, monto_pagado = ?, estatus_pago = ? WHERE id_consulta = ?
    `;
    await db.query(query, [
        consulta.peso, consulta.estatura, consulta.temperatura, consulta.presion, consulta.masa_corporal,
        consulta.saturacion, consulta.padecimientos, consulta.diagnostico, consulta.observaciones,
        consulta.costo, consulta.monto_pagado, consulta.estatus_pago, id
    ]);
};

export const deleteConsultService = async (id: number): Promise<void> => {
    const query = 'UPDATE tbl_consulta SET fecha_eliminado = now() WHERE id_consulta = ?';
    await db.query(query, [id]);
};