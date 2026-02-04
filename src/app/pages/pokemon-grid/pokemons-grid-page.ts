import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';

import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-grid-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-grid-page.html',
  styles: ``,
})
export default class PokemonsGridPage implements OnInit, OnDestroy {
  private pokemonService = inject(Pokemons);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  // public loading = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => console.log(isStable));

  ngOnInit(): void {
    // setTimeout(() => this.loading.set(false), 1500);

    // this.route.queryParamMap.subscribe();
    this.loadPokemons();
  }

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;
    if (this.currentPage() === 1 && page === -1) return;

    this.pokemonService
      .getPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Pokemons Grid - Page ${pageToLoad}`)),
      )
      .subscribe({ next: this.pokemons.set });
  }
}
