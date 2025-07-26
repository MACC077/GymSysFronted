import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from '../../../../../models/rol.model';
import { RolService } from '../../../../../core/services/rol/rol-service';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap:any;

@Component({
  selector: 'app-roles',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './roles.html',
  styleUrl: './roles.css'
})
export class Roles implements OnInit {

  roles:Rol[] = [];

  rolSeleccionado:any = null;

  formCrearRol!:FormGroup;
  formEditarRol!:FormGroup;
  
  constructor(
    private rolService:RolService,
    private fb:FormBuilder,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles():void {  
    this.rolService.getAllRoles().subscribe({
      next:(data) => {
        this.roles = data;
      },
      error: (err) => {
        this.toastr.error('Error al cargar roles');
        console.log(err);
      },
    });
  }

  abrirModalCrearRol():void{

  }

  abrirModalEditarPago(rol:Rol):void{

  }

  abrirModalEliminarPago(rol:Rol):void{

  }
}
