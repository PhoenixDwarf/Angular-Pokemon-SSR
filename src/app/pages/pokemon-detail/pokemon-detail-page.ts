import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonDetailAPIResponse } from '../../pokemons/interfaces';
import { Pokemons } from '../../pokemons/services/pokemons';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-detail-page',
  imports: [],
  templateUrl: './pokemon-detail-page.html',
  styles: ``,
})
export default class PokemonDetailPage implements OnInit {
  private pokemonService = inject(Pokemons);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<PokemonDetailAPIResponse | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id') ?? '';

    this.pokemonService
      .getPokemon(idParam)
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Page of pokemon ${name}`;

          this.title.setTitle(pageTitle);
          this.meta.updateTag({ name: 'description', content: pageDescription });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({ name: 'og:description', content: pageDescription });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        }),
      )
      .subscribe({
        next: this.pokemon.set,
        error: async () => this.router.navigate(['/pokemons-grid/page/1']),
      });
  }
}
