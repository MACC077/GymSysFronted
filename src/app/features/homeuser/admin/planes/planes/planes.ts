import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plan } from '../../../../../models/plan.model';
import { PlanService } from '../../../../../core/services/plan/plan-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-planes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './planes.html',
  styleUrl: './planes.css'
})
export class Planes implements OnInit {

  planes:Plan[] = [];

  constructor(
    private planser:PlanService, 
    private fb: FormBuilder,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.loadPlanes();
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

  abrirModalCrearPlan():void{

  }

  editarEstado(plan:Plan):void{

  }

  eliminarEstadoModal(plan:Plan):void{

  }
}
