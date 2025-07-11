import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asistencia',
  imports: [CommonModule,FormsModule],
  templateUrl: './asistencia.html',
  styleUrl: './asistencia.css'
})
export class Asistencia implements OnInit {

  currentDate = new Date();
  calendar: number[][] = [];

  selectedMonth!: number;
  selectedYear!: number;

  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  years: number[] = [];

  ngOnInit(): void {
    this.selectedMonth = this.currentDate.getMonth();
    this.selectedYear = this.currentDate.getFullYear();
    this.initYears();
    this.generateCalendar();
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
}

