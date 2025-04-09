import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Replace these with your real product IDs
      const productIds = ['1', '2', '3'];
      return productIds.map(id => ({ id }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
