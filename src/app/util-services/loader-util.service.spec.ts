import { TestBed } from '@angular/core/testing';

import { LoaderUtilService } from './loader-util.service';

describe('LoaderUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderUtilService = TestBed.get(LoaderUtilService);
    expect(service).toBeTruthy();
  });
});
