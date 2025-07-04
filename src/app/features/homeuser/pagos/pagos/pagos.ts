import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../../../core/services/pagos/pago-service';
import { SessionService } from '../../../../core/services/session/session-service';
import { Pago } from '../../../../models/pago.model';
import { Usuario } from '../../../../models/usuario.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Plan } from '../../../../models/plan.model';
import { PlanService } from '../../../../core/services/plan/plan-service';
import { UsuarioService } from '../../../../core/services/usuario/usuarioService';
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
  tipospago:any[] = ['Perro','Gato']; //Falta armarle el modelo y el servicio

  formCrearPago!:FormGroup;
  formEditarPago!:FormGroup;

  pagoSelccionado:any = null;
  
  
  constructor(
    private pagoService:PagoService,
    private planesService:PlanService,
    private usuarioService:UsuarioService,
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


  initModalForm():void{
    this.formCrearPago = this.fb.group({
      usuario:['',Validators.required],
      plan:['',Validators.required],
      tipopago:['',Validators.required],
      fechaPago:[this.getTodayDate(),Validators.required],
      activo:[true,Validators.required]
    });
  }

  getTodayDate(): string {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  }

  abrirModalCrearPago():void{
    const modal = new bootstrap.Modal(document.getElementById('crearPagoModalLabel')!);
    modal.show();
  }

  abrirModalEditarPago(pago:Pago):void{

  }

  abrirModalEliminarPago(pago:Pago):void{

  }

  crearNuevoPago():void{

  }

  guardarCambiosPago():void{

  }

  eliminarPago():void{

  }
}
