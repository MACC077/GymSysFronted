import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-servicios',
  imports: [RouterModule,CommonModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class Servicios {
  servicios = [
    {
      titulo: 'Entrenamiento Personalizado',
      descripcion: 'Planes diseñados a tu medida con entrenadores certificados.',
      imagen: 'assets/img/servicio1.jpg',
      icono: 'bi bi-person-arms-up'
    },
    {
      titulo: 'Clases Grupales',
      descripcion: 'Zumba, yoga, spinning y más para que entrenes en grupo.',
      imagen: 'assets/img/servicio2.jpg',
      icono: 'bi bi-people-fill'
    },
    {
      titulo: 'Zona de Pesas',
      descripcion: 'Equipos de fuerza modernos y seguros para todo nivel.',
      imagen: 'assets/img/servicio3.jpg',
      icono: 'bi bi-barbell'
    },
    {
      titulo: 'Área Cardiovascular',
      descripcion: 'Caminadoras, bicicletas, elípticas y más.',
      imagen: 'assets/img/servicio4.jpg',
      icono: 'bi bi-heart-pulse-fill'
    },
    {
      titulo: 'Nutrición y Bienestar',
      descripcion: 'Asesorías con nutricionistas para mejorar tus resultados.',
      imagen: 'assets/img/servicio5.jpg',
      icono: 'bi bi-clipboard-pulse'
    },
    {
      titulo: 'Spa y Recuperación',
      descripcion: 'Masajes, sauna y más para tu recuperación y descanso.',
      imagen: 'assets/img/servicio6.jpg',
      icono: 'bi bi-droplet-half'
    }
  ];
}
