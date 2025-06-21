import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homeuser } from './homeuser';

describe('Homeuser', () => {
  let component: Homeuser;
  let fixture: ComponentFixture<Homeuser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homeuser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homeuser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
