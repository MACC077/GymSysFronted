import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login/login-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  
  const loginService = inject(LoginService);
  const router = inject(Router);

  const token = loginService.getToken();

  if(token && !loginService.isTokenExpired(token)){
    return true;
  }

  return router.createUrlTree(['/login']);
};
