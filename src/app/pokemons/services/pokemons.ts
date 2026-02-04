import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PokemonDetailAPIResponse, PokemonListAPIResponse, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Pokemons {
  private http = inject(HttpClient);

  public getPage(page: number): Observable<SimplePokemon[]> {
    // 1 = 0
    if (page !== 0) --page;
    page = Math.max(0, page);

    return this.http
      .get<PokemonListAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon/?offset=${page * 20}&limit=20`,
      )
      .pipe(
        map((resp) => {
          const simplePokemons = resp.results.map((pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));

          return simplePokemons;
        }),
      );
  }

  public getPokemon(id: number) {
    return this.http.get<PokemonDetailAPIResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
