import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { PokemonDetailAPIResponse } from '../../pokemons/interfaces';
import { Pokemons } from '../../pokemons/services/pokemons';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

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
  private platform = inject(PLATFORM_ID);

  public pokemon = signal<PokemonDetailAPIResponse | null>(null);

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? '');
    if (isNaN(id) || id < 1) {
      if (isPlatformBrowser(this.platform)) {
        alert('Wrong pokemon ID');
        this.router.navigate(['/']);
      }
      return;
    }

    this.pokemonService.getPokemon(id).subscribe(this.pokemon.set);
  }
}
