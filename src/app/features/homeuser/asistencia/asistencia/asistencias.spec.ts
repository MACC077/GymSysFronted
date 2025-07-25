import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Asistencias } from './asistencias';

describe('Asistencia', () => {
  let component: Asistencias;
  let fixture: ComponentFixture<Asistencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Asistencias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Asistencias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
