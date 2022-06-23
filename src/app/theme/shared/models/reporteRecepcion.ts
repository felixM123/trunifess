export interface Reporterecepcion {
   
    fecha_del: any;
    fecha_al: any;
    agen_id: string;
    cliente_id: string;
    tipo:string;
    agen_id_destino:string;
}
export interface Reportetransaccion{
    fecha_del:any,
    fecha_al:any,
    agen_id:number,
    tipo_transaccion:string,
    tipo:string,
    usuario_id:number
}