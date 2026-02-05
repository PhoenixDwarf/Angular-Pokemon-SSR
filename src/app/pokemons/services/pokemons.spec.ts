import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Pokemons } from './pokemons';
import { PokemonListAPIResponse, SimplePokemon } from '../interfaces';
import { PokemonDetailAPIResponse } from '../interfaces/pokemon-detail-api-response';

const mockPokeApiResponse: PokemonListAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: '',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
} as any;

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
    service.getPage(1).subscribe({
      next: (pokemons) => {
        // console.log(pokemons);
        expect(pokemons).toStrictEqual(expectedPokemons);
      },
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`);
    req.flush(mockPokeApiResponse);

    expect(req.request.method).toBe('GET');
  });

  it('should load page 5 of pokemons', () => {
    service.getPage(5).subscribe({
      next: (pokemons) => {
        // console.log(pokemons);
        expect(pokemons).toStrictEqual(expectedPokemons);
      },
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/?offset=80&limit=20`);
    req.flush(mockPokeApiResponse);

    expect(req.request.method).toBe('GET');
  });

  it('should load a pokemon by ID', () => {
    service.getPokemon('1').subscribe({
      next: (pokemon) => {
        // console.log(pokemons);
        expect(pokemon).toEqual(mockPokemon);
      },
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/1`);
    req.flush(mockPokemon);

    expect(req.request.method).toBe('GET');
  });

  it('should load a pokemon by Name', () => {
    service.getPokemon('bulbasaur').subscribe({
      next: (pokemon) => {
        // console.log(pokemons);
        expect(pokemon).toEqual(mockPokemon);
      },
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/bulbasaur`);
    req.flush(mockPokemon);

    expect(req.request.method).toBe('GET');
  });

  it('should catch error if API fails', () => {
    // todo:
  });
});
