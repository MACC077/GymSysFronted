import { Injectable } from '@angular/core';
import { Plan } from '../../../models/plan.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrlBase = "https://localhost:7136/Plan/";

  constructor(private http:HttpClient) { }

  getAllPlanes():Observable<Plan[]>{
    return this.http.get<Plan[]>(`${this.apiUrlBase}GetAllPlanes`);
  }

  getPlan(id:number):Observable<Plan>{
    return this.http.get<Plan>(`${this.apiUrlBase}GetPlanesById/${id}`);
  }

  addPlan(plan:Plan):Observable<Plan>{
    return this.http.post<Plan>(`${this.apiUrlBase}AddPlan`,plan);
  }

  updatePlan(id:number, plan:Plan):Observable<Plan>{
    return this.http.put<Plan>(`${this.apiUrlBase}UpdatePlan/${id}`,plan);
  }

  changeStatePlan(id:number, estado:boolean):Observable<Plan>{
    return this.http.put<Plan>(`${this.apiUrlBase}ChangeStatePlan/${id}`, estado);
  }

  deleteUsuario(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrlBase}DeletePlan/${id}`);
  }
}
