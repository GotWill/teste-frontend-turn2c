import { TestBed } from '@angular/core/testing';

import { ApiDogService } from './api-dog.service';

describe('ApiDogService', () => {
  let service: ApiDogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
