import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../core/services/session/session-service';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-inicio',
  imports: [RouterModule,CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {

  user: any;
  diasSemana: { nombre: string; fecha: string }[] = [];
  diaActual: string = '';

  constructor(private sessionser:SessionService){}

  ngOnInit(): void {
    this.sessionser.getUserObservable().subscribe(userData => {
      if (userData) {
        this.user = userData;
        //console.log(this.user);
      }
    });

    this.getCalendar();
  }

  showData():void{
    this.user = this.sessionser.getUser();
    console.log(this.sessionser.getUser());
  }

  getCalendar():void{
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hoy = new Date();
    const primerDiaSemana = new Date(hoy);
    primerDiaSemana.setDate(hoy.getDate() - hoy.getDay()); // Domingo

    this.diasSemana = Array.from({ length: 7 }).map((_, i) => {
      const fecha = new Date(primerDiaSemana);
      fecha.setDate(fecha.getDate() + i);
      return {
        nombre: dias[fecha.getDay()],
        fecha: fecha.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit' })
      };
    });

    this.diaActual = dias[hoy.getDay()];
  }
}
