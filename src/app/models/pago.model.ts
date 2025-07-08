export interface Pago {
    id: number; 
    fechaPago: string; 
    tipoPagoId: number; 
    tipoPagoNombre: string; 
    activo: boolean; 
    fechaFin: string;
    usuarioId: number; 
    usuarioNombre: string; 
    planId?: number; 
    planNombre: string;
}

