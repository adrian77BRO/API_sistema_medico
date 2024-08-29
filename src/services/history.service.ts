import { db } from '../config/database';
import { Historial } from '../models/history';
import { Sangre } from '../models/blood';

export const getAllHistoriesService = async (id_usuario: number): Promise<Historial[]> => {
    const query = `
        SELECT hc.id_paciente, ts.nombre tipo_sangre, hc.antecedentes_heredofamiliares,
        hc.alergias, hc.patologias, hc.intervencion_quirurgica,
        hc.transfucion_sanguinea, hc.donacion_sanguinea, hc.observaciones
        FROM tbl_historial_clinico hc JOIN tblc_tipo_sangre ts
        ON ts.id_tipo_sangre = hc.id_tipo_sangre WHERE hc.id_usuario = ?
    `;
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Historial[];
};

export const getHistoryByIdService = async (id: number, id_usuario: number): Promise<Historial | null> => {
    const query = `
        SELECT hc.id_historial_clinico, hc.id_paciente, ts.nombre tipo_sangre,
        hc.antecedentes_heredofamiliares, hc.alergias, hc.patologias, hc.intervencion_quirurgica,
        hc.transfucion_sanguinea, hc.donacion_sanguinea, hc.observaciones
        FROM tbl_historial_clinico hc JOIN tblc_tipo_sangre ts ON ts.id_tipo_sangre = hc.id_tipo_sangre
        WHERE hc.id_paciente = ? AND hc.id_usuario = ?
    `;
    const [rows] = await db.query(query, [id, id_usuario]);
    const historiales = rows as Historial[];
    return historiales.length ? historiales[0] : null;
};

export const getAllBloodsService = async (): Promise<Sangre[]> => {
    const query = 'SELECT * FROM tblc_tipo_sangre WHERE fecha_eliminado IS NULL';
    const [rows] = await db.query(query);
    return rows as Sangre[];
};

export const createHistoryService = async (historial: Omit<Historial, 'id'>, id_usuario: number): Promise<void> => {
    const query = `
        INSERT INTO tbl_historial_clinico (id_paciente, id_tipo_sangre, id_usuario, antecedentes_heredofamiliares,
        alergias, patologias, intervencion_quirurgica, transfucion_sanguinea, donacion_sanguinea, observaciones,
        fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())
    `;
    await db.query(query, [
        historial.id_paciente, historial.id_tipo_sangre, id_usuario,
        historial.antecedentes_heredofamiliares, historial.alergias,
        historial.patologias, historial.intervencion_quirurgica,
        historial.transfucion_sanguinea, historial.donacion_sanguinea,
        historial.observaciones]);
};

export const updateHistoryService = async (id: number, historial: Omit<Historial, 'id'>): Promise<void> => {
    const query = `
        UPDATE tbl_historial_clinico SET id_tipo_sangre = ?, antecedentes_heredofamiliares = ?,
        alergias = ?, patologias = ?, intervencion_quirurgica = ?, transfucion_sanguinea = ?,
        donacion_sanguinea = ?, observaciones = ? WHERE id_paciente = ?
    `;
    await db.query(query, [
        historial.id_tipo_sangre, historial.antecedentes_heredofamiliares,
        historial.alergias, historial.patologias, historial.intervencion_quirurgica,
        historial.transfucion_sanguinea, historial.donacion_sanguinea,
        historial.observaciones, id
    ]);
};

export const deleteHistoryService = async (id: number): Promise<void> => {
    const query = 'DELETE FROM tbl_historial_clinico WHERE id_historial_clinico = ?';
    await db.query(query, [id]);
};