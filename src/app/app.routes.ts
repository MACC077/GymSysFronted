import { Routes } from '@angular/router';
import { Home } from './features/home/home/home';
import { Error } from './features/error/error/error';
import { Usuarios } from './features/homeuser/admin/usuarios/usuarios/usuarios';
import { Login } from './features/login/login/login';
import { Homeuser } from './features/homeuser/homeuser/homeuser';
import { Perfil } from './features/homeuser/perfil/perfil/perfil';
import { Servicios } from './features/homeuser/servicios/servicios';
import { Inicio } from './features/homeuser/inicio/inicio/inicio';
import { Planes } from './features/homeuser/admin/planes/planes/planes';
import { Pagos } from './features/homeuser/pagos/pagos/pagos';
import { Asistencias } from './features/homeuser/asistencia/asistencia/asistencias';
import { Roles } from './features/homeuser/admin/roles/roles/roles';
import { Tipospago } from './features/homeuser/admin/tipospago/tipospago/tipospago';
import { authguardGuard } from './core/guards/authguard-guard'; //Guard para proteger el ingreso y validar el TOKEN JWT

export const routes: Routes = [
    //Call components
    { path: 'home', component: Home },
    { path: 'login', component:Login}, 
    //Component with sub-routes
    { path: 'homeuser', component: Homeuser, canActivate:[authguardGuard],
        children:[
            { path:'', redirectTo:'inicio', pathMatch: 'full'},
            { path: 'inicio', component: Inicio},
            { path: 'perfil', component: Perfil },
            { path: 'servicios', component: Servicios },
            { path: 'usuarios', component: Usuarios },
            { path: 'planes', component:Planes },
            { path: 'pagos', component:Pagos },
            { path: 'asistencias', component:Asistencias },
            { path: 'roles', component:Roles },
            { path: 'tipospago', component:Tipospago }
        ]
    },
    //Set default page 
    { path: '', redirectTo:'/home', pathMatch:'full'},
    //Set error page if the user try to get on wrong URI
    { path: '**', component: Error },
];
