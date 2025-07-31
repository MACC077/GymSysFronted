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
    if(!this.formCrearRol.valid){
      this.toastr.warning('Llene correctamente el formulario');
      return;
    }

    this.rolService.addRol(this.formCrearRol.value).subscribe({
      next:() => {
        this.toastr.success('Rol creado correctamente');
        this.loadRoles();
      },
      error:(err) => {
        this.toastr.error('Error al crear el rol');
        console.log(err);
      }
    });
  }

  guardarCambiosRol():void{

    if(this.formEditarRol.valid && this.rolSeleccionado) {
      
      const datosActualizados = {...this.rolSeleccionado, ...this.formEditarRol.value }

      this.rolService.updateRol(this.rolSeleccionado.id, datosActualizados).subscribe({
        next:() => {
          this.toastr.success('Rol actualizado correctamente');
          this.loadRoles();
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el Rol');
          console.log(err);
        },
      });
    }
  }

  eliminarRol():void{

    if(this.rolSeleccionado) {

      this.rolService.changeStateRol(this.rolSeleccionado.id, false).subscribe({
        next:() => {
          this.toastr.success(`Rol ${this.rolSeleccionado?.nombre} anulado correctamente`);
          this.loadRoles();

          const modal = bootstrap.Modal.getInstance(document.getElementById('eliminarRolModalLabel')!);
          modal?.hide();

          this.rolSeleccionado = null;
        },

        error:(err) => {
          this.toastr.error('Error al anular el Rol');
          console.log(err);
        }

      });
    }
  }
}
