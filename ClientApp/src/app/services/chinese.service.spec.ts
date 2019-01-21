import { TestBed } from '@angular/core/testing';

import { ChineseService } from './chinese.service';

describe('ChineseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChineseService = TestBed.get(ChineseService);
    expect(service).toBeTruthy();
  });
});
