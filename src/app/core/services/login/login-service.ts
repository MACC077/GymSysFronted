import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrlBase = 'https://localhost:7136/Login/'; // URL Base

  constructor(private http:HttpClient, private router:Router) { }

  login(credentials:{ usuario: string, contrasena: string}):Observable<any>{
    return this.http.post<any>(`${this.apiUrlBase}LoginAuth`,credentials);
  }

  getUserInfo():Observable<any>{
    return this.http.get<any>(`${this.apiUrlBase}GetUserInfo`);
  }

  saveToken(response: any){

    const token = response.token;

    if (token) {
      localStorage.setItem('access_token',token);
    } else {
      console.warn('No se encontró el token en la respuesta');
    }
   
  }
  
  getToken():string | null{
    return localStorage.getItem('access_token');
  }

  Logout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  isAuthenticated():boolean{
    return !!this.getToken();
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      return Date.now() >= expiry * 1000;
    } catch {
      return true;
    }
  }
}
