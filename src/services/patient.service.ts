import { db } from '../config/database';
import { Paciente } from '../models/patient';

export const getAllPatientsService = async (id_usuario: number): Promise<Paciente[]> => {
    const query = 'SELECT * FROM tblc_paciente WHERE fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Paciente[];
};

export const getPatientByIdService = async (id: number, id_usuario: number): Promise<Paciente | null> => {
    const query = 'SELECT * FROM tblc_paciente WHERE id_paciente = ? AND fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id, id_usuario]);
    const pacientes = rows as Paciente[];
    return pacientes.length ? pacientes[0] : null;
};

export const getPatientInfoByIdService = async (id: number, id_usuario: number): Promise<Paciente | null> => {
    const query = `
        SELECT p.id_paciente, p.nombre, p.apellidos, p.correo, p.telefono, p.fecha_nacimiento,
        p.sexo, ts.nombre tipo_sangre, hc.patologias, hc.alergias, hc.intervencion_quirurgica,
        hc.transfucion_sanguinea, hc.donacion_sanguinea FROM tblc_paciente p
        JOIN tbl_historial_clinico hc ON p.id_paciente = hc.id_paciente
        JOIN tblc_tipo_sangre ts ON ts.id_tipo_sangre = hc.id_tipo_sangre
        WHERE p.id_paciente = ? AND p.fecha_eliminado IS NULL AND p.id_usuario = ?
    `;
    const [rows] = await db.query(query, [id, id_usuario]);
    const pacientes = rows as Paciente[];
    return pacientes.length ? pacientes[0] : null;
};

export const getPatientCountService = async (id_usuario: number): Promise<number> => {
    const query = 'SELECT COUNT(*) AS count FROM tblc_paciente WHERE fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id_usuario]);
    const count = (rows as { count: number }[])[0].count;
    return count;
};

export const getPatientsByNameService = async (nombre: string, id_usuario: number): Promise<Paciente | null> => {
    const query = `
        SELECT * FROM tblc_paciente WHERE CONCAT(nombre, ' ' , apellidos)
        LIKE '%a%' AND fecha_eliminado IS NULL AND id_usuario = 3;
    `;
    const [rows] = await db.query(query, [id_usuario]);
    const pacientes = rows as Paciente[];
    return pacientes.length ? pacientes[0] : null;
};

export const createPatientService = async (paciente: Omit<Paciente, 'id'>, id_usuario: number): Promise<void> => {
    const query = `
        INSERT INTO tblc_paciente (id_usuario, nombre, apellidos,
        fecha_nacimiento, sexo, telefono, correo, direccion, familiar_responsable,
        fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, now())
    `;
    await db.query(query, [
        id_usuario, paciente.nombre, paciente.apellidos,
        paciente.fecha_nacimiento, paciente.sexo,
        paciente.telefono, paciente.correo,
        paciente.direccion, paciente.familiar_responsable
    ]);
};

export const updatePatientService = async (id: number, paciente: Omit<Paciente, 'id'>): Promise<void> => {
    const query = `
        UPDATE tblc_paciente SET nombre = ?, apellidos = ?,
        fecha_nacimiento = ?, sexo = ?, telefono = ?, correo = ?,
        direccion = ?, familiar_responsable = ? WHERE id_paciente = ?
    `;
    await db.query(query, [
        paciente.nombre, paciente.apellidos, paciente.fecha_nacimiento,
        paciente.sexo, paciente.telefono, paciente.correo,
        paciente.direccion, paciente.familiar_responsable, id
    ]);
};

export const deletePatientService = async (id: number): Promise<void> => {
    const query = 'UPDATE tblc_paciente SET fecha_eliminado = now() WHERE id_paciente = ?';
    await db.query(query, [id]);
};