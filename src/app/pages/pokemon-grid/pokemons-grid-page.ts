import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, tap } from 'rxjs';

import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'pokemons-grid-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemons-grid-page.html',
  styles: ``,
})
export default class PokemonsGridPage {
  private pokemonService = inject(Pokemons);
  private route = inject(ActivatedRoute);
  private title = inject(Title);

  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page: string) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
    { initialValue: 1 },
  );

  public pageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  });

  public loadPokemons(page = 0) {
    if (page < 0) return;

    this.pokemonService
      .getPage(page)
      .pipe(tap(() => this.title.setTitle(`Pokemons Grid - Page ${page}`)))
      .subscribe({ next: this.pokemons.set });
  }
}
