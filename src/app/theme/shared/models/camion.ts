export interface Camion {
    id_empresa?: string;
    id?: number;
    modelo: string;
    placa: string;
}
export interface Camiones{
    id_empr: string;
 
    nombre_comercial: string;
    contacto: string;
    categoria:string;
}
export interface CamionUp{
    id?: number;
    id_empresa?: string;
    nombre_comercial: string;
    contacto: string;
}