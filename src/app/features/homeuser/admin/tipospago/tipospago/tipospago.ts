import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tipopago } from '../../../../../models/tipopago.model';
import { TipopagoService } from '../../../../../core/services/tipopago/tipopago-service';
import { ToastrService } from 'ngx-toastr';
import { group } from '@angular/animations';
declare var bootstrap:any;

@Component({
  selector: 'app-tipospago',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './tipospago.html',
  styleUrl: './tipospago.css'
})
export class Tipospago implements OnInit {

  tiposPago:Tipopago[] = [];
  tipoPagoSeleccionado:any = null;

  formCrearTipoPago!:FormGroup;
  formeEditarTipoPago!:FormGroup;

  constructor(
    private tipoPagoService:TipopagoService,
    private fb:FormBuilder,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.loadTiposPago();
    this. initModalForm();
  }

  loadTiposPago():void{
    this.tipoPagoService.getAllTiposPago().subscribe({
      next:(data) => {
        this.tiposPago = data;
      },
      error: (err) => {
        this.toastr.error('Error al cargar Tipos de Pago');
        console.log(err);
      },
    });
  }

  initModalForm():void{
    this.formCrearTipoPago = this.fb.group({
      nombre:['',Validators.required]
    });

    this.formeEditarTipoPago = this.fb.group({
      nombre:['',Validators.required],
      activo:['']
    });
  }

  abrirModalCreaTipoPago():void{
    const modal = new bootstrap.Modal(document.getElementById('crearTipoPagoModalLabel')!);
    modal.show();
  }

  abrirModalEditarTipoPago(tipoPago:Tipopago):void{
    this.tipoPagoSeleccionado = tipoPago;

    this.formeEditarTipoPago.patchValue({
      nombre: tipoPago.nombre,
      activo: tipoPago.activo
    });

    const modal = new bootstrap.Modal(document.getElementById('editarTipoPagoModalLabel')!);
    modal.show();
  }

  abrirModalEliminarTipoPago(tipoPago:Tipopago):void{
    this.tipoPagoSeleccionado = tipoPago;
    const modal = new bootstrap.Modal(document.getElementById('eliminarTipoPagoModalLabel')!);
    modal.show();
  }

  crearNuevoTipoPago():void{
    if(!this.formCrearTipoPago.valid){
      this.toastr.warning('Llene correctamente el formulario');
      return;
    }

    this.tipoPagoService.addTipoPago(this.formCrearTipoPago.value).subscribe({
      next:() => {
        this.toastr.success('Tipo de Pago creado correctamente');
        this.loadTiposPago();
      },
      error:(err) => {
        this.toastr.error('Error al crear el Tipo de Pago');
        console.log(err);
      }
    });
  }

  guardarCambiosTipoPago():void{
    
    if(this.formeEditarTipoPago.valid && this.tipoPagoSeleccionado){

      const datosActualizados = { ... this.tipoPagoSeleccionado, ... this.formeEditarTipoPago.value }

      this.tipoPagoService.updateTipoPago(this.tipoPagoSeleccionado.id, datosActualizados).subscribe({
        next:() => {
          this.toastr.success('Tipo Pago actualizado correctamente');   
          this.loadTiposPago();
        },
        error:(err) => {
          this.toastr.error('Error al actualizar el Tipo Pago');  
          console.log(err);
        },
      });
    }
  }
  
  eliminarTipoPago():void{
    
    if(this.tipoPagoSeleccionado){

      this.tipoPagoService.changeStateTipoPago(this.tipoPagoSeleccionado.id, false).subscribe({
        next:() => {
          this.toastr.success(`Tipo Pago ${this.tipoPagoSeleccionado?.nombre} anulado correctamente`);
          this.loadTiposPago();

          const modal = bootstrap.Modal.getInstance(document.getElementById('eliminarTipoPagoModalLabel')!);
          modal?.hide();

          this.tipoPagoSeleccionado = null;
        },
        error: (err) => {
          this.toastr.error('Error al anular el Tipo Pago');
          console.log(err);
        }
      });
    }
  }
}
