import { Location } from '@angular/common';
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { routes } from './app.routes';
import AboutPage from './pages/about/about-page';
import PricingPage from './pages/pricing/pricing-page';
import PokemonsGridPage from './pages/pokemon-grid/pokemons-grid-page';

describe('App Routes', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should be defined', () => {
    expect(routes).toBeDefined();
  });

  it('should contain all defined routes', () => {
    expect(routes.length).toBe(6);
  });

  it('should render AboutPage when path is /about', async () => {
    const route = routes.find((route) => route.path === 'about');

    expect(route).toBeDefined();

    const component = (await route!.loadComponent!()) as any;

    expect(component.default).toBe(AboutPage);
  });

  it('should navigate to "/pokemons-grid/page/1" when default path is set', async () => {
    await router.navigate(['/']);

    expect(location.path()).toBe('/pokemons-grid/page/1');
  });

  it('should render PricingPage when path is /pricing', async () => {
    const route = routes.find((route) => route.path === 'pricing');

    expect(route).toBeDefined();

    const component = (await route!.loadComponent!()) as any;

    expect(component.default).toBe(PricingPage);
  });

  it('should navigate to "/pokemons-grid/page/1"', async () => {
    await router.navigate(['/pokemons-grid/page/1']);
    expect(location.path()).toBe('/pokemons-grid/page/1');
  });

  it('should render PokemonsGridPage when path is /pokemons-grid/page/:page', async () => {
    const route = routes.find((route) => route.path === 'pokemons-grid/page/:page');

    expect(route).toBeDefined();

    const component = (await route!.loadComponent!()) as any;

    expect(component.default).toBe(PokemonsGridPage);
  });

  it('should redirect to /pokemons-grid/page/1 when path is unknown', async () => {
    await router.navigate(['/234tedgdfge4rt45d']);

    expect(location.path()).toBe('/pokemons-grid/page/1');
  });
});
