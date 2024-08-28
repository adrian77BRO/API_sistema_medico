import { db } from '../config/database';
import { Servicio } from '../models/service';
import { createLink } from '../utils/createLinkService';

export const getAllServicesService = async (id_usuario: number): Promise<Servicio[]> => {
    const query = 'SELECT * FROM tbl_servicio WHERE fecha_eliminado IS NULL AND id_usuario = ? ORDER BY orden';
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Servicio[];
};

export const getServiceByIdService = async (id: number, id_usuario: number): Promise<Servicio | null> => {
    const query = 'SELECT * FROM tbl_servicio WHERE id_servicio = ? AND fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id, id_usuario]);
    const servicios = rows as Servicio[];
    return servicios.length ? servicios[0] : null;
};

export const getServiceCountService = async (id_usuario: number): Promise<number> => {
    const query = 'SELECT COUNT(*) AS count FROM tbl_servicio WHERE fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id_usuario]);
    const count = (rows as { count: number }[])[0].count;
    return count;
};

export const getActiveServicesService = async (id_usuario: number): Promise<Servicio[]> => {
    const query = 'SELECT nombre, costo FROM tbl_servicio WHERE estatus_sistema = 1 AND fecha_eliminado IS NULL AND id_usuario = ?';
    const [rows] = await db.query(query, [id_usuario]);
    return rows as Servicio[];
};

export const createServiceService = async (servicio: Omit<Servicio, 'id'>, id_usuario: number): Promise<void> => {
    const query = `
        INSERT INTO tbl_servicio (id_usuario, nombre, enlace, descripcion, estatus, orden, costo,
        estatus_web, estatus_sistema, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, now())
    `;
    await db.query(query, [
        id_usuario, servicio.nombre, createLink(servicio.nombre), servicio.descripcion,
        servicio.estatus, servicio.orden, servicio.costo,
        servicio.estatus_web, servicio.estatus_sistema]);
};

export const updateServiceService = async (id: number, servicio: Omit<Servicio, 'id'>): Promise<void> => {
    const query = `
        UPDATE tbl_servicio SET nombre = ?, enlace = ?, descripcion = ?, estatus = ?,
        orden = ?, costo = ?, estatus_web = ?, estatus_sistema = ? WHERE id_servicio = ?
    `;
    await db.query(query, [
        servicio.nombre, createLink(servicio.nombre), servicio.descripcion,
        servicio.estatus, servicio.orden, servicio.costo,
        servicio.estatus_web, servicio.estatus_sistema, id
    ]);
};

export const deleteServiceService = async (id: number): Promise<void> => {
    const query = 'UPDATE tbl_servicio SET fecha_eliminado = now() WHERE id_servicio = ?';
    await db.query(query, [id]);
};

//No me gusta tener que poner "service.service" o "createServiceService" :(