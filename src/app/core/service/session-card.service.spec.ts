/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SessionCardService } from './session-card.service';

describe('Service: SessionCard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionCardService]
    });
  });

  it('should ...', inject([SessionCardService], (service: SessionCardService) => {
    expect(service).toBeTruthy();
  }));
});
