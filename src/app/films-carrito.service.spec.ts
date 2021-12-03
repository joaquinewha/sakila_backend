import { TestBed } from '@angular/core/testing';

import { FilmsCarritoService } from './films-carrito.service';

describe('FilmsCarritoService', () => {
  let service: FilmsCarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmsCarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
