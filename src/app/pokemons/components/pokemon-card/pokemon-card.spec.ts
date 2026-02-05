import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './pokemon-card';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonCard', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;

    // Input values
    fixture.componentRef.setInput('pokemon', { ...mockPokemon });
    fixture.detectChanges();
  });

  it('Should create component', () => {
    // console.log(fixture.elementRef.nativeElement.innerHTML);
    expect(component).toBeTruthy();
  });

  // When asserting on objects it is recommended to use toStricEqual or toEequal
  // so it does not compare references but the actual properties

  it('Should have simplePokemon signal input', () => {
    // expect(component.pokemon()).toBe(mockPokemon);
    expect(component.pokemon()).toStrictEqual(mockPokemon);
  });

  it('Should compute a correct pokemon image URL', () => {
    const expectedURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;

    expect(component.image()).toBe(expectedURL);
  });
});
