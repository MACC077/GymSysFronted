export interface Pago {
    id: number; //
    fechaPago: Date; //
    tipoPagoId: number; 
    tipoPagoNombre: string; //
    activo: boolean; //
    fechaFin: Date;
    usuarioId: number; 
    usuarioNombre: string; //
    planId?: number; 
    planNombre: string; //
}

