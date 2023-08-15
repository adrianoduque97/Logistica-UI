import { TestBed } from '@angular/core/testing';

import { SatcontrolService } from './satcontrol.service';

describe('SatcontrolService', () => {
  let service: SatcontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SatcontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
