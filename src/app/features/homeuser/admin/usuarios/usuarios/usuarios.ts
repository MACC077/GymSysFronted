import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../core/services/usuario/usuarioService';
import { PlanService } from '../../../../../core/services/plan/plan-service';
import { RolService } from '../../../../../core/services/rol/rol-service';
import { Usuario } from '../../../../../models/usuario.model';
import { Plan } from '../../../../../models/plan.model';
import { Rol } from '../../../../../models/rol.model';
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
  roles:Rol[] = [];

  formEditarUsuario!: FormGroup;
  formCrearUsuario!: FormGroup;

  usuarioSeleccionado: any = null;
  mostrarPassword: boolean = false;

  constructor(
    private usuarioServices: UsuarioService, 
    private planServices: PlanService,
    private rolServices: RolService,
    private fb: FormBuilder, 
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadPlanes();
    this.loadRoles();
    this.initModalForm();
  }

  loadUsuarios(): void{
    this.usuarioServices.getAllUsuarios().subscribe({
      next:(data) => {
        this.usuarios = data;
        //console.log(this.usuarios);
      },
      error: (err) => {
        this.toastr.error('Error al cargar usuarios');
        console.log('Error al cargar usuarios', err);
      }
    });
  }

  loadPlanes(): void {
    this.planServices.getAllPlanes().subscribe({
      next:(data) => {
        this.planes = data;
        //console.log(this.planes);
      },
      error:(err) => { 
        this.toastr.error('Error al cargar Planes');
        console.log('Error al cargar Planes', err);
      }
    });
  }

  loadRoles():void{
    this.rolServices.getAllRoles().subscribe({
      next:(data) => {
        this.roles = data;
        //console.log(this.roles);
      },
      error:(err) => {
        this.toastr.error('Error al cargar Roles');
        console.log('Error al cargar Roles', err);
      }
    });
  }

  initModalForm():void{

    //Create Form
    this.formCrearUsuario = this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      correo:['',[Validators.required,Validators.email]],
      telefono:['',Validators.required],
      direccion:['',Validators.required],
      activo:[true],
      planId:['',Validators.required],
      rolId:['', Validators.required],
      contrasena:['',[Validators.required,Validators.minLength(6)]],
      confirmarContrasena:['',Validators.required]
    }, { validator: this.validarContrasenasIguales });

    //Edit Form
    this.formEditarUsuario = this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      correo:['',[Validators.required,Validators.email]],
      telefono:['',Validators.required],
      direccion:['',Validators.required],
      activo:[true],
      planId: ['', Validators.required],
      rolId:['', Validators.required]
    });
  }

  abrirModalCrearUsuario():void {
    this.formCrearUsuario.reset({activo:true}); //Resetear el formulario
    const modal = new bootstrap.Modal(document.getElementById("crearUsuarioModal")!);
    modal.show();
  }

  crearNuevoUsuario():void{

    if(this.formCrearUsuario.valid){

      this.usuarioServices.addUsuario(this.formCrearUsuario.value).subscribe({
        next:() => {
          this.toastr.success('Usuario creado correctamente');
          this.loadUsuarios();
        },
        error:(err) => {
          this.toastr.error('Error al crear el usuario');
          console.log(err);
        },
      });
    }
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
      planId: usuario.planId,
      rolId: usuario.rolId
    });

    const modal = new bootstrap.Modal(document.getElementById('editarUsuarioModal')!);
    modal.show();
  }
  
  eliminarUsuarioModal(usuario:Usuario):void{
    this.usuarioSeleccionado = usuario;

    const modal = new bootstrap.Modal(document.getElementById('confirmarEliminarModal'));
    modal.show();
  }

  guardarCambiosUsuario():void{
    
    if (this.formEditarUsuario.valid && this.usuarioSeleccionado) {

      const datosActualizados = { ...this.usuarioSeleccionado, ...this.formEditarUsuario.value };

      console.log(datosActualizados);

      this.usuarioServices.updateUsuario(this.usuarioSeleccionado.id, datosActualizados).subscribe({
        next: () => {
          this.toastr.success('Usuario actualizado correctamente');
          this.loadUsuarios(); // refresca tabla
          this.usuarioSeleccionado = null;
        },
        error: (err) => {
          this.toastr.error('Error al actualizar usuario');
          console.log(err);
        }
      });
    }
  }

  eliminarUsuario():void{

    if(this.usuarioSeleccionado){
      
      this.usuarioServices.changeStateUsuario(this.usuarioSeleccionado.id, false).subscribe({

        next: (data) => {
          this.toastr.success(`Usuario ${this.usuarioSeleccionado?.nombre} anulado correctamente`);
          this.loadUsuarios();

          const modal = bootstrap.Modal.getInstance(document.getElementById('confirmarEliminarModal')!);
          modal?.hide();

          this.usuarioSeleccionado = null;
        },

        error: (err) => {
          this.toastr.error('Error al anular el usuario');
          console.log(err);
        }

      });
    }
  }

  validarContrasenasIguales(group: FormGroup) {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { noCoincide: true };
  }

  togglePasswordVisibility(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

}
