import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './pokemon-card';
import { provideRouter, RouterLink } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { By } from '@angular/platform-browser';

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

  it('Should render pokemon name and image correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nameElement = compiled.querySelector('h1');
    const imgElement = compiled.querySelector('img');
    const expectedURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;

    expect(nameElement?.textContent.trim()).toBe(mockPokemon.name);
    expect(imgElement?.src).toBe(expectedURL);
    expect(imgElement?.alt).toBe(mockPokemon.name);
  });

  it('Should have the correct routerLink cofiguration', () => {
    /**
     * Verifies the RouterLink binding points to the expected detail route for the mock Pokémon,
     * ensuring the generated URL matches `/pokemon-detail/${mockPokemon.name}`.
     */
    const debugElement = fixture.debugElement.query(By.directive(RouterLink));
    const routerLinkInstance = debugElement.injector.get(RouterLink);
    const expectedUrl = `/pokemon-detail/${mockPokemon.name}`;

    expect(routerLinkInstance.urlTree?.toString()).toBe(expectedUrl);
  });
});
