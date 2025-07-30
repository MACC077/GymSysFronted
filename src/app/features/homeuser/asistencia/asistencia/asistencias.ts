import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asistencia } from '../../../../models/asistencia.model';
import { AsistenciaService } from '../../../../core/services/asistencia/asistencia-service';
import { SessionService } from '../../../../core/services/session/session-service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-asistencias',
  imports: [CommonModule,FormsModule],
  templateUrl: './asistencias.html',
  styleUrl: './asistencias.css'
})
export class Asistencias implements OnInit {

  constructor(
    private asistenciaService:AsistenciaService,
    private sessionService:SessionService, 
    private toastr:ToastrService
  ){}
  
  user:Usuario | any
  currentDate = new Date();
  calendar: number[][] = [];
  asistencias:Asistencia[] = [];
  asistenciasSet: Set<string> = new Set();


  selectedMonth!: number;
  selectedYear!: number;

  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  years: number[] = [];

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.selectedMonth = this.currentDate.getMonth();
    this.selectedYear = this.currentDate.getFullYear();
    this.initYears();
    this.generateCalendar();

    if(!this.user){
      this.toastr.error('No hay usuario en sesión');
      return;
    }

    this.loadAsistencias(this.user.id);
  }

  loadAsistencias(id:number):void{
    this.asistenciaService.getAsistencia(id).subscribe({
      next:(data) => {
        //Valido primero que sea un array valido, ya que el backend retorna un mensaje o un arreglo
        if (!Array.isArray(this.asistencias) || this.asistencias.length === 0){
          this.toastr.warning('No se encontraron asistencias');
          return;
        }

        this.asistencias = data;

        this.asistenciasSet = new Set(
          this.asistencias.map(a => this.formatDateToKey(a.fechaRegistro))
        );

      },
      error: (err) => {
        this.toastr.error('Error al cargar asistencias');
        console.log(err);
      },
    })
  }

  initYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }

  generateCalendar(): void {
    const firstDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();

    const weeks: number[][] = [];
    let week: number[] = Array(firstDay).fill(0);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(0);
      }
      weeks.push(week);
    }

    this.calendar = weeks;
  }

  onMonthYearChange(): void {
    this.generateCalendar();
  }

  resetToToday(): void {
    const today = new Date();
    this.selectedMonth = today.getMonth();
    this.selectedYear = today.getFullYear();
    this.generateCalendar();
  }

  highlightDate(day:number):boolean{

    if (day === 0) return false;
    const fecha = new Date(this.selectedYear, this.selectedMonth, day);
    const key = this.formatDateToKey(fecha);
    return this.asistenciasSet.has(key);
  }

  formatDateToKey(fecha: Date | string): string {
    const d = new Date(fecha);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }

}

