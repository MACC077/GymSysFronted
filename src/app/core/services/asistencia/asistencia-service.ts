import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asistencia } from '../../../models/asistencia.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private apiUrlBase = 'https://localhost:7136/Asistencia/';
  
  constructor(private http:HttpClient) { }

  getAllAsistencias():Observable<Asistencia[]>{
    return this.http.get<Asistencia[]>(`${this.apiUrlBase}GetAllAsistencias`);
  }

  getAsistencia(id:number):Observable<Asistencia>{
    return this.http.get<Asistencia>(`${this.apiUrlBase}GetAsistenciaById/${id}`);
  }

  addAsistencia(asistencia:Asistencia):Observable<Asistencia>{
    return this.http.post<Asistencia>(`${this.apiUrlBase}AddAsistencia`,asistencia);
  }

  updateAsistencia(id:number,asistencia:Asistencia):Observable<Asistencia>{
    return this.http.put<Asistencia>(`${this.apiUrlBase}UpdateAsistencia/${id}`, asistencia);
  }

  changeStateAsistencia(id:number, estado:boolean):Observable<Asistencia>{
    return this.http.patch<any>(`${this.apiUrlBase}ChangeStateAsistencia/${id}`, {estado});
  }

  deleteAsistencia(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrlBase}DeleteAsistencia/${id}`);
  }

}
