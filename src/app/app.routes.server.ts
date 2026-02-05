import { RenderMode, ServerRoute, PrerenderFallback } from '@angular/ssr';
import { PokemonListAPIResponse } from './pokemons/interfaces';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemon-detail/:id',
    renderMode: RenderMode.Prerender,
    // Fallback to avoid 404 errors when users land on ids higher than 20
    // Server rendering takes over will correctly render the page
    fallback: PrerenderFallback.Server,
    // Here we add a function to prerender 20 pages on build time since we are using SSG
    async getPrerenderParams() {
      // Fetch pokeAPi to gather first 60 results
      const apiResp: PokemonListAPIResponse = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=60',
      ).then((resp) => resp.json());
      // Map the results array to return a valid array with the mapped name in the id property
      return apiResp.results.map((pokemon) => ({ id: pokemon.name }));

      // Another way to do it:
      // return Array.from({ length: apiResp.results.length }, (_, i) => ({
      //   id: apiResp.results[i].name,
      // }));
    },
  },
  {
    path: 'pokemons-grid/page/:page',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,

    async getPrerenderParams() {
      return Array.from({ length: 20 }, (_, i) => ({ page: (i + 1).toString() }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
