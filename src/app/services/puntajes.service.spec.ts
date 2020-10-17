import { TestBed } from '@angular/core/testing';

import { PuntajesService } from './puntajes.service';

describe('PuntajesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuntajesService = TestBed.get(PuntajesService);
    expect(service).toBeTruthy();
  });
});
