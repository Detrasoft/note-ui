import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('@detrasoft.com/web-auth').then((m) => m.LoginComponent),
    data: { title: 'Entrar - DutFy Notes' },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'notes',
  },
  {
    path: 'notes',
    loadComponent: () =>
      import('./features/notes/notes-dashboard.component').then(m => m.NotesDashboardComponent),
  },
  {
    path: 'profile',
    loadChildren: () => import('@detrasoft.com/web-auth').then(m => m.USER_DATA_ROUTES),
  },
  {
    path: 'users',
    loadChildren: () => import('@detrasoft.com/web-auth').then(m => m.USERS_ROUTES),
  },
  {
    path: 'access-profiles',
    loadChildren: () => import('@detrasoft.com/web-auth').then(m => m.ACCESS_PROFILES_ROUTES),
  },
  {
    path: 'billing',
    loadChildren: () => import('@detrasoft.com/billing').then(m => m.BILLING_ROUTES),
  },
  {
    path: 'support',
    loadChildren: () => import('@detrasoft.com/support').then(m => m.SUPPORT_ROUTES),
  },
  {
    path: 'legal',
    loadChildren: () => import('@detrasoft.com/doc-signing').then(m => m.DOC_SIGNING_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'notes',
  },
];
