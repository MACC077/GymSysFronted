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
    this.initModalForm();
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

  initModalForm():void{
    this.formCrearRol = this.fb.group({
      nombre:['',Validators.required]
    });

    this.formEditarRol = this.fb.group({
      nombre:['',Validators.required],
      activo:['']
    });
  } 

  abrirModalCrearRol():void{
    const modal = new bootstrap.Modal(document.getElementById('crearRolModalLabel')!);
    modal.show();
  }

  abrirModalEditarRol(rol:Rol):void{
    this.rolSeleccionado = rol;

    this.formEditarRol.patchValue({
      nombre: rol.nombre,
      activo: rol.activo
    });

    const modal = new bootstrap.Modal(document.getElementById('editarRolModalLabel')!);
    modal.show();
  }

  abrirModalEliminarRol(rol:Rol):void{
    this.rolSeleccionado = rol;
    const modal = new bootstrap.Modal(document.getElementById('eliminarRolModalLabel')!);
    modal.show();
  }

  crearNuevoRol():void{

  }

  guardarCambiosRol():void{

  }

  eliminarRol():void{

  }
}
