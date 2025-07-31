import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tipospago } from './tipospago';

describe('Tipospago', () => {
  let component: Tipospago;
  let fixture: ComponentFixture<Tipospago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tipospago]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tipospago);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
