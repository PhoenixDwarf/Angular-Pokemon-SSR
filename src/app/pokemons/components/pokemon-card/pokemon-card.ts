import { Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
  styles: ``,
})
export class PokemonCard {
  public pokemon = input.required<SimplePokemon>();

  public image = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`,
  );

  // logEffect = effect(() => {
  //   console.log('Pokemon card: ', this.pokemon());
  // });
}
