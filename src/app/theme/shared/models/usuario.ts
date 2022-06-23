

export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    rol: string;
}
export interface Usuarios{
    
    name:string;
    email:string;
    password: string;
    password_confirmation : string;
    rol:string;
    agen_id:number;
}
export interface UsuarioUp{
    id:number;
    name:string;
    email:string;
   
    rol:string;
    agen_id:number;
}