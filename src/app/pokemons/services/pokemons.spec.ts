import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Pokemons } from './pokemons';

describe('PokemonsService', () => {
  let service: Pokemons;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Pokemons);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of pokemons', () => {
    // todo:
  });

  it('should load page 5 of pokemons', () => {
    // todo:
  });

  it('should load a pokemon by ID', () => {
    // todo:
  });

  it('should load a pokemon by Name', () => {
    // todo:
  });

  it('should catch error if API fails', () => {
    // todo:
  });
});
