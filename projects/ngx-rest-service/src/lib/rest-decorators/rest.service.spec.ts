import { TestBed } from '@angular/core/testing';

import { RestService } from './rest.service';
import { HttpClientModule } from '@angular/common/http';
import { REST_CONFIG } from '../ngx-rest.config';

describe('RestService', () => {
  let service: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientModule, {
        provide: REST_CONFIG, useValue: {}
      }],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(RestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
