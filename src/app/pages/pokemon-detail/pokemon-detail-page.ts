import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonDetailAPIResponse } from '../../pokemons/interfaces';
import { Pokemons } from '../../pokemons/services/pokemons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pokemon-detail-page',
  imports: [],
  templateUrl: './pokemon-detail-page.html',
  styles: ``,
})
export default class PokemonDetailPage implements OnInit {
  private pokemonService = inject(Pokemons);
  private route = inject(ActivatedRoute);

  public pokemon = signal<PokemonDetailAPIResponse | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.pokemonService.getPokemon(id).subscribe(this.pokemon.set);
  }
}
