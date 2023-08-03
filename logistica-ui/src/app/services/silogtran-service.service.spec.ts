import { TestBed } from '@angular/core/testing';

import { SilogtranService } from './silogtran-service.service';

describe('SilogtranServiceService', () => {
  let service: SilogtranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilogtranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
