export type Paciente = {
    id_paciente: number;
    id_usuario: number;
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
    direccion: string;
    familiar_responsable: string;
    sexo: number;
    fecha_nacimiento: string;
    fecha_registro: string;
    fecha_eliminado: string;
};