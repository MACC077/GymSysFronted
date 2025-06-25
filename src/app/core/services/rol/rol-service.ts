import { Injectable } from '@angular/core';
import { Rol } from '../../../models/rol.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrlBase = 'https://localhost:7136/Rol/'; // URL Base

  constructor(private http:HttpClient) { }

  getAllRoles():Observable<Rol[]>{
    return this.http.get<Rol[]>(`${this.apiUrlBase}GetAllRoles`);
  }

  getRol(id:number):Observable<Rol>{
    return this.http.get<Rol>(`${this.apiUrlBase}GetRolById/${id}`);
  }

  addRol(rol:Rol):Observable<Rol>{
    return this.http.post<Rol>(`${this.apiUrlBase}Addrol`, rol);
  }

  updateRol(id:number, rol:Rol):Observable<Rol>{
    return this.http.put<Rol>(`${this.apiUrlBase}UpdateRol/${id}`, rol);
  }

  changeStateRol(id:number, estado:boolean):Observable<Rol>{
    return this.http.put<Rol>(`${this.apiUrlBase}UpdateRolStatus/${id}`, estado);
  }

  deleteRol(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrlBase}DeleteRol/${id}`);
  }
}
