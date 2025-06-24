import { Component } from '@angular/core';
import { LoginService } from '../../../core/services/login/login-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgForm,FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';//Modales pequeños

@Component({
  selector: 'app-login',
  imports: [CommonModule,RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  //Objeto FormGroup inicializado
  loginForm: FormGroup;
  
  constructor(private services:LoginService,private router: Router,private fb: FormBuilder, private toastr: ToastrService){
    //Crear y setear campos del formulario reactivo
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }
  
  login(): void{

    //Validar que el formulario sea valido para continuar y solicitar el Token
    if(!this.loginForm.valid){
      this.toastr.error('Ingrese todos los datos', 'Error');
      return;
    }

    //Asignamos los datos del formuario para usarlo
    //Nota: El formulario con ReactiveFormsModule detecta automaticamente los cambios
    //Ademas todo se asigna a los  cambos que se setearon en el constructor usuario.. password..
    const formData = this.loginForm.value;

    this.services.login(formData).subscribe({
      next:(res) => {
        //console.log(res);
        this.services.saveToken(res);
        this.router.navigate(['/homeuser']);
      },
      error:(err) =>{

        if(err.status === 0){
          this.toastr.error('Servidor no disponible. Intente más tarde.', 'Error de conexión');
          return;
        }
        
        if(err.status === 401 || err.status === 400){
          this.toastr.error('Usuario y/o contraseña invalido', 'Error');
          return;
        }

        this.toastr.error('Ocurrió un error inesperado', 'Error');
        console.error('Login error', err);
      }
    });
  }
}
