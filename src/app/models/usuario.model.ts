export interface Usuario {
    id:number;
    nombre:string;
    apellido:string;
    correo:string;
    telefono:string;
    direccion:string;
    fechaRegistro:Date;
    activo:boolean;
    rolId:number,
    rolNombre:string;
    planId:number;
    plan:string;
}


