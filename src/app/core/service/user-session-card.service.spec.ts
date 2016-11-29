/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserSessionCardService } from './user-session-card.service';

describe('Service: UserSessionCard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSessionCardService]
    });
  });

  it('should ...', inject([UserSessionCardService], (service: UserSessionCardService) => {
    expect(service).toBeTruthy();
  }));
});
