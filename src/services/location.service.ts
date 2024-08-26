import { db } from '../config/database';
import { Estado } from '../models/state';
import { Municipio } from '../models/town';

export const getAllStatesService = async (): Promise<Estado[]> => {
    const query = 'SELECT * FROM tblc_estado WHERE fecha_eliminado IS NULL';
    const [rows] = await db.query(query);
    return rows as Estado[];
};

export const getTownsByStateService = async (estado : number): Promise<Municipio[]> => {
    const query = 'SELECT * FROM tblc_municipio WHERE id_estado = ? AND fecha_eliminado IS NULL';
    const [rows] = await db.query(query, [estado]);
    return rows as Municipio[];
};