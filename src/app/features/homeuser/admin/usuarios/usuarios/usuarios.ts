import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../core/services/usuario/usuarioService';
import { PlanService } from '../../../../../core/services/plan/plan-service';
import { Usuario } from '../../../../../models/usuario.model';
import { Plan } from '../../../../../models/plan.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})

export class Usuarios implements OnInit {

  usuarios:Usuario[] = [];
  planes:Plan[] = [];

  formEditarUsuario!: FormGroup;
  usuarioSeleccionado: any = null;

  constructor(
    private usuarioServices: UsuarioService, 
    private planServices: PlanService,
    private fb: FormBuilder, 
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.loadUsuarios();
    this.cargarPlanes();
    this.initModalForm();
  }

  loadUsuarios(): void{
    this.usuarioServices.getAllUsuarios().subscribe({
      next:(data) => {
        this.usuarios = data;
        //console.log(this.usuarios);
      },
      error: (err) => {
        console.log('Error al cargar usuarios', err);
        this.toastr.error('Error al cargar usuarios');
      }
    });
  }

  cargarPlanes(): void {
    this.planServices.getAllPlanes().subscribe({
      next:(data) => {
        this.planes = data;
        //console.log(this.planes);
      },
      error:(err) => { 
        console.log('Error al cargar Planes', err);
        this.toastr.error('Error al cargar Planes');
      }
    });
  }

  initModalForm():void{
    this.formEditarUsuario = this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      correo:['',Validators.required],
      telefono:['',Validators.required],
      direccion:['',Validators.required],
      activo:[true],
      planId: ['', Validators.required]  
    });
  }

 
  editarUsuario(usuario:Usuario): void{
    this.usuarioSeleccionado = usuario;

    this.formEditarUsuario.patchValue({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      telefono: usuario.telefono,
      direccion: usuario.direccion,
      activo: usuario.activo,
      planId: usuario.planId
    });

    const modal = new bootstrap.Modal(document.getElementById('editarUsuarioModal')!);
    modal.show();
  }

  eliminarUsuario(id:number):void{

  }

  guardarCambiosUsuario():void{
    
    if (this.formEditarUsuario.valid && this.usuarioSeleccionado) {

      const datosActualizados = { ...this.usuarioSeleccionado, ...this.formEditarUsuario.value };

      console.log(datosActualizados);

      this.usuarioServices.updateUsuario(this.usuarioSeleccionado.id, datosActualizados).subscribe({
        next: () => {
          this.toastr.success('Usuario actualizado correctamente');
          //const modal = bootstrap.Modal.getInstance(document.getElementById('editarUsuarioModal')!);
          //modal?.hide();
          this.loadUsuarios(); // refresca tabla
        },
        error: () => {
          this.toastr.error('Error al actualizar usuario');
        }
      });
    }
  }
}
