export type Pago = {
    id_pago: number;
    id_paciente: number;
    id_usuario: number;
    monto: number;
    fecha: string;
    fecha_registro: string;
    fecha_eliminado: string;
}