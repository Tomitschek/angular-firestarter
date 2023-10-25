import { TestBed } from '@angular/core/testing';

import { PumpDialogService } from './pump-dialog.service';

describe('PumpDialogService', () => {
  let service: PumpDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PumpDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
