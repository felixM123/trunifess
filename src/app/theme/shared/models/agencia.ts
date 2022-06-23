export interface Agencia {
    acronimo: string;
    actividad: string;
    alcaldia: string;
    autorizacion: string;
    cod: string;
    created_at: any;
    direccion: string;
    empr_id: number;
    fecha_limite_emision: string;
    guia: number;
    id: number;
    leyenda: string;
    llave: string;
    nombre: string;
    numero_ceros: number,
    numero_factura_e: number,
    telefonos: string;
    updated_at: any;
}
export interface Agencias {
  cod:string;
  nombre:string;
  direccion:string;
  telefonos:string;
  acronimo:string;
  guia:number;
  numero_ceros:number;
  alcaldia:string
}
