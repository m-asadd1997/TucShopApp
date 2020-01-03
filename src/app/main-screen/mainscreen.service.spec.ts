import { TestBed } from '@angular/core/testing';

import { MainscreenService } from './mainscreen.service';

describe('MainscreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainscreenService = TestBed.get(MainscreenService);
    expect(service).toBeTruthy();
  });
});
