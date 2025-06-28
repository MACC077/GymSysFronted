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
        console.log(this.planes);
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
  }

  abrirModalCrearPlan():void{
    this.formCrearPlan.reset({activo:true});
    const modal = new bootstrap.Modal(document.getElementById('crearPlanModalLabel')!);
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

  editarEstado(plan:Plan):void{

  }

  eliminarEstadoModal(plan:Plan):void{

  }


}
