import { TestBed } from '@angular/core/testing';

import { TipopagoService } from './tipopago-service';

describe('TipopagoService', () => {
  let service: TipopagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipopagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
