import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrlBase = 'https://localhost:7136/Usuario/'; // URL Base

  constructor(private http: HttpClient) { }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrlBase}GetAllUsuarios`);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrlBase}GetUsuarioById/${id}`);
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrlBase}AddUsuario`, usuario);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrlBase}UpdateUsuario/${id}`, usuario);
  }

  changeStateUsuario(id: number): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrlBase}UpdateUsuario/${id}`, {});
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlBase}DeleteUsuario/${id}`);
  }
}
