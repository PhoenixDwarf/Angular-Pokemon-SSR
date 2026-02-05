import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonList } from './pokemon-list';
import { SimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';
import { Component, input } from '@angular/core';
import { PokemonCard } from '../pokemon-card/pokemon-card';

const mockPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'pikachu',
  },
  {
    id: '2',
    name: 'charmander',
  },
];

@Component({ selector: 'pokemon-card', template: `[pokemon card]` })
class MockPokemonCard {
  pokemon = input.required();
}

describe('PokemonCard', () => {
  let component: PokemonList;
  let fixture: ComponentFixture<PokemonList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideRouter([])],
    }).overrideComponent(PokemonList, {
      add: {
        imports: [MockPokemonCard],
      },
      remove: {
        imports: [PokemonCard],
      },
    });

    fixture = TestBed.createComponent(PokemonList);
    component = fixture.componentInstance;

    // Input values
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
  });

  it('Should create component', () => {
    // console.log(fixture.elementRef.nativeElement.innerHTML);
    expect(component).toBeTruthy();
  });

  it('Should render the pokemon list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardElements = compiled.querySelectorAll('pokemon-card');

    console.log(compiled.innerHTML);
    expect(cardElements.length).toBe(mockPokemons.length);
  });

  it('Should render "There are no pokemons" when list is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    const messageElement = compiled.querySelector('[data-test-empty]');

    expect(messageElement?.textContent.trim()).toBe('There are no pokemons');
  });
});
