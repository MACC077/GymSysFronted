import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plan } from '../../../../../models/plan.model';
import { PlanService } from '../../../../../core/services/plan/plan-service';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap:any;

@Component({
  selector: 'app-planes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './planes.html',
  styleUrl: './planes.css'
})
export class Planes implements OnInit {

  planes:Plan[] = [];

  formCrearPlan!:FormGroup;
  formEditarPlan!:FormGroup;

  planSeleccionado:any = null;

  constructor(
    private planser:PlanService, 
    private fb: FormBuilder,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.loadPlanes();
    this.initModalForm();
  }

  loadPlanes():void{
    this.planser.getAllPlanes().subscribe({
      next:(data) => {
        this.planes = data;
        //console.log(this.planes);
      },
      error:(err) => {
        this.toastr.error('Error al cargar planes');
      },
    });
  }

  initModalForm():void{
    this.formCrearPlan = this.fb.group({
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      precio:['',[Validators.required, Validators.min(1)]],
      duracionDias:['',[Validators.required, Validators.min(1)]],
      activo:[true]
    });

    this.formEditarPlan = this.fb.group({
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      precio:['',[Validators.required,Validators.min(1)]],
      duracionDias:['',[Validators.required, Validators.min(1)]],
      activo:['']
    });
  }

  abrirModalCrearPlan():void{
    this.formCrearPlan.reset({activo:true});
    const modal = new bootstrap.Modal(document.getElementById('crearPlanModalLabel')!);
    modal.show();
  }

  abrirModalEditarPlan(plan:Plan):void{

    this.planSeleccionado = plan;

    this.formEditarPlan.patchValue({
      nombre: plan.nombre,
      descripcion: plan.descripcion,
      precio: plan.precio,
      duracionDias: plan.duracionDias,
      activo: plan.activo
    });

    const modal = new bootstrap.Modal(document.getElementById('editarPlanModalLabel')!);
    modal.show();
  }

  abrirModalEliminar(plan:Plan):void{
    this.planSeleccionado = plan;
    const modal = new bootstrap.Modal(document.getElementById('eliminarPlanModalLabel')!);
    modal.show();
  }

  crearNuevoPlan():void{

    if(!this.formCrearPlan.valid){
      this.toastr.warning('Llene correctamente el formulario');
      return;
    }

    this.planser.addPlan(this.formCrearPlan.value).subscribe({
      next:() => {
        this.toastr.success('Plan creado correctamente');
        this.loadPlanes();
      },
      error:(err) => {
        this.toastr.error('Error al crear el plan');
        console.log(err);
      },
    });
  }

  guardarCambiosPlan():void{

    if(this.formEditarPlan.valid && this.planSeleccionado) {

      const datosActualizados = {...this.planSeleccionado, ...this.formEditarPlan.value }

      this.planser.updatePlan(this.planSeleccionado.id, datosActualizados).subscribe({
        next:() => {
          this.toastr.success('Plan actualizado correctamente');
          this.loadPlanes();
          this.planSeleccionado = null;
        },
        error:(err) => {
          this.toastr.error('Error al actualizar el Plan');
          console.log(err);
        }
      });
    }
  }

  eliminarPlan():void{

    if(this.planSeleccionado){

      this.planser.changeStatePlan(this.planSeleccionado.id, false).subscribe({

        next:() => {
          this.toastr.success(`Plan ${this.planSeleccionado?.nombre} anulado correctamente`);
          this.loadPlanes();

          const modal = bootstrap.Modal.getInstance(document.getElementById('eliminarPlanModalLabel')!);
          modal?.hide();

          this.planSeleccionado = null;
        },

        error:(err) => {
          this.toastr.error('Error al anular el Plan');
          console.log(err);
        }

      });
    }
  }
}
