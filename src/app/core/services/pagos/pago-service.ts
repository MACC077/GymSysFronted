import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pago } from '../../../models/pago.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrlBase = "https://localhost:7136/Pago/";

  constructor(private http:HttpClient) { }

  getAllPagos():Observable<Pago[]>{
    return this.http.get<Pago[]>(`${this.apiUrlBase}GetAllPagos`);
  }

  getPago(id:number):Observable<Pago>{
    return this.http.get<Pago>(`${this.apiUrlBase}GetPagosById/${id}`);
  }

  addPago(pago:Pago):Observable<Pago>{
    return this.http.post<Pago>(`${this.apiUrlBase}AddPago`,pago);
  }

  updatePago(id:number,pago:Pago):Observable<Pago>{
    return this.http.put<Pago>(`${this.apiUrlBase}UpdatePago/${id}`, pago);
  }

  chageStatePago(id:number,estado:boolean):Observable<Pago>{
    return this.http.put<Pago>(`${this.apiUrlBase}ChangeStatePago/${id}`, estado);
  }

  deletePago(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrlBase}DeletePago/${id}`);
  }

}
