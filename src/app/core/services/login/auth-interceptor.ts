import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,  HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from './login-service';


@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {

  //constructor(private loginser:LoginService) { }
  private loginser = inject(LoginService);

  @Injectable()
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    
    const token = this.loginser.getToken();

    const cloned = token 
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`)})
    : req;

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401 || error.status === 403){
          // Token expirado o inválido
          this.loginser.Logout(); // elimina el token del localStorage y redirige al login        
        }
        return throwError(() => error);
      })
    );
  }
}
