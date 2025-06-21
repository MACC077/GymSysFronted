import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../core/services/usuario/usuarioService';
import { Usuario } from '../../../../../models/usuario.model';
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
  planes:any[] = ["Gato", "Perro", "Etc", "Llename con un Endpoint"];

  formEditarUsuario!: FormGroup;
  usuarioSeleccionado: any = null;

  constructor(private services: UsuarioService, private fb: FormBuilder, private toastr: ToastrService){}

  ngOnInit(): void {
    this.loadUsuarios();
    this.initModalForm();
    this.cargarPlanes();
  }

  loadUsuarios(): void{
    this.services.getAllUsuarios().subscribe({
      next:(data) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      error: (err) => console.log('Error al cargar usuarios', err)
    });
  }

  cargarPlanes(): void {
    // this.planService.getPlanes().subscribe({
    //   next: (data) => this.planes = data,
    //   error: (err) => console.error('Error al cargar planes', err)
    // });
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
    this.formEditarUsuario.patchValue(usuario);
    const modal = new bootstrap.Modal(document.getElementById('editarUsuarioModal')!);
    modal.show();
  }

  eliminarUsuario(id:number):void{

  }

  guardarCambiosUsuario():void{
    
    if (this.formEditarUsuario.valid && this.usuarioSeleccionado) {

      const datosActualizados = { ...this.usuarioSeleccionado, ...this.formEditarUsuario.value };

      this.services.updateUsuario(this.usuarioSeleccionado.id, datosActualizados).subscribe({
        next: () => {
          this.toastr.success('Usuario actualizado correctamente');
          const modal = bootstrap.Modal.getInstance(document.getElementById('editarUsuarioModal')!);
          modal?.hide();
          this.loadUsuarios(); // refresca tabla
        },
        error: () => {
          this.toastr.error('Error al actualizar usuario');
        }
      });
    }
  }
}
