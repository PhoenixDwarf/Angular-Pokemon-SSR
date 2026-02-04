import { RenderMode, ServerRoute, PrerenderFallback } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemon-detail/:id',
    renderMode: RenderMode.Prerender,
    // Fallback to avoid 404 errors when users land on ids higher than 20
    // Server rendering takes over will correctly render the page
    fallback: PrerenderFallback.Server,
    // Here we add a function to prerender 20 pages on build time since we are using SSG
    getPrerenderParams: async () => {
      // Generate ids from 1 to 20
      return Array.from({ length: 20 }, (_, i) => ({ id: (i + 1).toString() }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
