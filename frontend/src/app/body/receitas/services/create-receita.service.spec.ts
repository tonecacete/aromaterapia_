/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CriarReceitaService } from './criar-receita.service';

describe('Service: CreateReceita', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CriarReceitaService]
    });
  });

  it('should ...', inject([CriarReceitaService], (service: CriarReceitaService) => {
    expect(service).toBeTruthy();
  }));
});
