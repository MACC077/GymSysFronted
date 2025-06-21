import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../../models/usuario.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../../../core/services/session/session-service';
import { UsuarioService } from '../../../../core/services/usuario/usuarioService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {

  private fb = inject(FormBuilder);
  perfilForm!: FormGroup;
  userData!: Usuario;
  showPassword: boolean = false;

  constructor(private usarioser:UsuarioService, private sessionser:SessionService, private toast:ToastrService){}

  ngOnInit(): void {
    
    this.sessionser.getUserObservable().subscribe(user => {
      if (user) {
        this.userData = user;

        this.perfilForm = this.fb.group({
          nombre: [user.nombre, [Validators.required]],
          apellido: [user.apellido, [Validators.required]],
          correo: [user.correo, [Validators.required, Validators.email]],
          telefono: [user.telefono],
          direccion: [user.direccion],
          contrasena: []
        });
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  guardarCambios():void{
    if(this.perfilForm.valid){
      const dataUsuario = this.perfilForm.value;
      //Data del form al modelo
      this.userData.nombre = dataUsuario.nombre;
      this.userData.apellido = dataUsuario.apellido;
      this.userData.correo = dataUsuario.correo;
      this.userData.telefono = dataUsuario.telefono;
      this.userData.direccion = dataUsuario.direccion;
      //Solicitud al servicio
      this.usarioser.updateUsuario(this.userData.id,this.userData).subscribe({
        next:(res) => {
          this.toast.success("Datos actualizados exitosamente","");
        },
        error:(err) => {
          this.toast.error("Error al actualizar los datos","");
          console.log(err);   
        }
      });
    }
  }
}
