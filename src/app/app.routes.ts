import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page'),
  },
  {
    path: 'pokemons-grid/page/:page',
    loadComponent: () => import('./pages/pokemon-grid/pokemons-grid-page'),
  },
  {
    path: 'pokemon-detail/:id',
    loadComponent: () => import('./pages/pokemon-detail/pokemon-detail-page'),
  },
  {
    path: '**',
    redirectTo: 'pokemons-grid/page/1',
  },
];
