import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pago } from '../../../../models/pago.model';
import { Usuario } from '../../../../models/usuario.model';
import { Tipopago } from '../../../../models/tipopago.model';
import { Plan } from '../../../../models/plan.model';
import { TipopagoService } from '../../../../core/services/tipopago/tipopago-service';
import { PlanService } from '../../../../core/services/plan/plan-service';
import { UsuarioService } from '../../../../core/services/usuario/usuarioService';
import { PagoService } from '../../../../core/services/pagos/pago-service';
import { SessionService } from '../../../../core/services/session/session-service';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap:any;

@Component({
  selector: 'app-pagos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class Pagos implements OnInit {

  user:Usuario | any

  pagos:Pago[] = [];
  planes:Plan[] = [];
  usuarios:Usuario[] = [];
  tipospago:Tipopago[] = [];

  formCrearPago!:FormGroup;
  formEditarPago!:FormGroup;

  pagoSelccionado:any = null;

  constructor(
    private pagoService:PagoService,
    private planesService:PlanService,
    private usuarioService:UsuarioService,
    private tipoPagoService:TipopagoService,
    private sessionService: SessionService, 
    private fb:FormBuilder, 
    private toastr:ToastrService) {

  }

  ngOnInit(): void {
    this.user = this.sessionService.getUser();

    if(!this.user){
      this.toastr.error('No hay usuario en sesión');
      return;
    }

    this.loadPagos();
  
    if(this.user.rolId === 1){
      this.initModalForm();
      this.loadPlanes();
      this.loadUsuarios();
      this.loadTipoPagos();
    }
  }

  loadPagos():void{

    if(this.user?.rolId === 1){

      this.pagoService.getAllPagos().subscribe({
        next: (data) => {
          this.pagos = data;
          console.log(this.pagos);
        },
        error: (err) => {
          this.toastr.error('Error al cargar pagos');
          console.log(err);
        }
      });

      return;
    }

    this.pagoService.getPago(this.user?.id).subscribe({
      next: (data) => {
        this.pagos = [data];
        console.log(this.pagos);
      },
      error: (err) => {
        this.toastr.error('Error al cargar Pagos');
        console.log(err);
      }
    });
  }
  
  loadPlanes():void{
    this.planesService.getAllPlanes().subscribe({
      next:(data) => {
        this.planes = data;
      },
      error:(err) => {
        this.toastr.error('Error al cargar Planes');
        console.log(err);
      },
    });
  }

  loadUsuarios():void{
    this.usuarioService.getAllUsuarios().subscribe({
      next:(data) => {
        this.usuarios = data;
      },
      error:(err) => {
        this.toastr.error('Error al cargar Usuarios');
        console.log(err);
      }
    });
  }

  loadTipoPagos():void{
    this.tipoPagoService.getAllTiposPago().subscribe({
      next:(data) => {
        this.tipospago = data;
      },
      error:(err) => {
        this.toastr.error('Error al cargar Tipos de Pago');
        console.log(err);
      }
    });
  }

  initModalForm():void{
    this.formCrearPago = this.fb.group({
      usuarioId:['',Validators.required],
      planId:['',Validators.required],
      tipopagoId:['',Validators.required],
      fechaPago:[this.getTodayDate(),Validators.required],
      activo:[true,Validators.required]
    });

    this.formEditarPago = this.fb.group({
      usuarioId:['',Validators.required],
      planId:['',Validators.required],
      tipopagoId:['',Validators.required],
      fechaPago:[this.getTodayDate(),Validators.required],
      activo:[true,Validators.required]
    });
  }

  getTodayDate(): string {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  }

  formatDateForInput(fechaIso: string): string {
    const fecha = new Date(fechaIso);
    const localDate = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  }

  abrirModalCrearPago():void{
    const modal = new bootstrap.Modal(document.getElementById('crearPagoModalLabel')!);
    modal.show();
  }

  abrirModalEditarPago(pago:Pago):void{

    this.pagoSelccionado = pago;
    
    this.formEditarPago.patchValue({
      usuarioId:pago.usuarioId,
      planId:pago.planId,
      tipopagoId:pago.tipoPagoId,
      fechaPago:this.formatDateForInput(pago.fechaPago),
      activo:pago.activo
    });

    const modal = new bootstrap.Modal(document.getElementById('editarPagoModalLabel')!);
    modal.show();
  }

  abrirModalEliminarPago(pago:Pago):void{
    this.pagoSelccionado = pago;
    const modal = new bootstrap.Modal(document.getElementById('eliminarPagoModalLabel')!);
    modal.show();
  }

  crearNuevoPago():void{

    if(!this.formCrearPago.valid){
      this.toastr.warning('Llene correctamente el formulario');
      return;
    }

    this.pagoService.addPago(this.formCrearPago.value).subscribe({
      next: () => {
        this.toastr.success('Pago creado correctamente');
        this.loadPagos();
      },
      error: (err) => {
        this.toastr.error('Error al crear Pago');
        console.log(err);
      },
    });
  }

  guardarCambiosPago():void{

    if(this.formEditarPago.valid && this.pagoSelccionado){

      const datosActualizados = { ...this.pagoSelccionado, ...this.formEditarPago.value}

      this.pagoService.updatePago(this.pagoSelccionado.id, datosActualizados).subscribe({
        next: () => {
          this.toastr.success('Pago actualizado correctamente');
          this.loadPagos();
          this.pagoSelccionado = null;
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el Pago');
          console.log(err);
        },
      });
    }
  }

  eliminarPago():void{

    if(this.pagoSelccionado) {

      this.pagoService.chageStatePago(this.pagoSelccionado.id, false).subscribe({
        next:() => {
          this.toastr.success(`Pago ${this.pagoSelccionado?.id} anulado correctamente`);
          this.loadPagos();

          const modal = bootstrap.Modal.getInstance(document.getElementById('eliminarPagoModalLabel')!);
          modal?.hide();

          this.pagoSelccionado = null;
        },

        error:(err) => {
          this.toastr.error('Error al anular el Pago');
          console.log(err);
        }

      });
    }
  }
}
