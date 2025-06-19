import { TestBed } from '@angular/core/testing';

import { HybridAnalyticsService } from './hybrid-analytics.service';

describe('HybridAnalyticsService', () => {
  let service: HybridAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HybridAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
