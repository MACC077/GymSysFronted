import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../core/services/session/session-service';
import { LoginService } from '../../../core/services/login/login-service';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-homeuser',
  imports: [RouterLink,RouterModule],
  templateUrl: './homeuser.html',
  styleUrl: './homeuser.css'
})
export class Homeuser implements OnInit {

  user: any;

  constructor(private sessionser:SessionService, private loginser:LoginService){}

  ngOnInit(): void {
    this.loginser.getUserInfo().subscribe({
      next:(userData) => {
        this.sessionser.setUser(userData);
        this.user = this.sessionser.getUser();
      },
      error(err) {
        console.error('Error al obtener datos del usuario', err);
      },
    });
  }

  logout(): void {
    this.sessionser.clearUser();
    this.loginser.Logout();
  }

}
