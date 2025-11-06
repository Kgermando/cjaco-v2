import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'organisation',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'activities',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'activities/:slug',
    renderMode: RenderMode.Server // Routes dynamiques en mode Server
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'donate',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Server // Routes admin en mode Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
