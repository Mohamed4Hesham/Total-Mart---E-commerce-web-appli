import { TestBed } from '@angular/core/testing';

import { ProductsDetailsService } from './products-details.service';

describe('ProductsDetailsService', () => {
  let service: ProductsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
