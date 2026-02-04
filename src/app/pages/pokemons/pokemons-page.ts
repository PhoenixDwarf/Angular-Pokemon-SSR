import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  styles: ``,
})
export default class PokemonsPage implements OnInit, OnDestroy {
  private pokemonService = inject(Pokemons);
  public pokemons = signal<SimplePokemon[]>([]);
  // public loading = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => console.log(isStable));

  ngOnInit(): void {
    // setTimeout(() => this.loading.set(false), 1500);
    this.loadPokemons();
  }

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }

  public loadPokemons(page = 0) {
    this.pokemonService.loadPage(page).subscribe({
      next: this.pokemons.set,
    });
  }
}
