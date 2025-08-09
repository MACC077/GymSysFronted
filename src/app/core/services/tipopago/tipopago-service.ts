import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipopago } from '../../../models/tipopago.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TipopagoService {

  private apiUrlBase = 'https://localhost:7136/TipoPago/';

  constructor(private http:HttpClient) { }

  getAllTiposPago():Observable<Tipopago[]>{
    return this.http.get<Tipopago[]>(`${this.apiUrlBase}GetAllTipoPagos`);
  }

  getTipoPago(id:number):Observable<Tipopago>{
    return this.http.get<Tipopago>(`${this.apiUrlBase}GetTipoPagoById/${id}`);
  }

  addTipoPago(tipopago: Tipopago): Observable<Tipopago> {
    return this.http.post<Tipopago>(`${this.apiUrlBase}AddTipoPago`, tipopago);
  }

  updateTipoPago(id: number, tipopago: Tipopago): Observable<Tipopago> {
    return this.http.put<Tipopago>(`${this.apiUrlBase}UpdateTipoPago/${id}`, tipopago);
  }

  changeStateTipoPago(id: number, estado: boolean): Observable<Tipopago> {
    return this.http.put<Tipopago>(`${this.apiUrlBase}ChangeStateTipoPago/${id}`, estado);
  }

  deleteTipoPago(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlBase}DeleteTipoPago/${id}`);
  }

}
