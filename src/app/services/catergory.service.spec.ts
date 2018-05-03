import { TestBed, inject } from '@angular/core/testing';

import { CatergoryService } from './catergory.service';

describe('CatergoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatergoryService]
    });
  });

  it('should be created', inject([CatergoryService], (service: CatergoryService) => {
    expect(service).toBeTruthy();
  }));
});
