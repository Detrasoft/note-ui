import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '@detrasoft.com/web-auth';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('@detrasoft.com/web-auth').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
    data: { title: 'Entrar - DutFy Notes' },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'notes',
  },
  {
    path: 'notes',
    canActivate: [authGuard],
    loadChildren: () => import('@detrasoft.com/note').then(m => m.NOTE_ROUTES),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () => import('@detrasoft.com/web-auth').then(m => m.USER_DATA_ROUTES),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadChildren: () => import('@detrasoft.com/web-auth').then(m => m.USERS_ROUTES),
  },
  {
    path: 'access-profiles',
    canActivate: [authGuard],
    loadChildren: () => import('@detrasoft.com/web-auth').then(m => m.ACCESS_PROFILES_ROUTES),
  },
  {
    path: 'billing',
    canActivate: [authGuard],
    loadChildren: () => import('@detrasoft.com/billing').then(m => m.BILLING_ROUTES),
  },
  {
    path: 'support',
    canActivate: [authGuard],
    loadChildren: () => import('@detrasoft.com/support').then(m => m.SUPPORT_ROUTES),
  },
  {
    path: 'legal',
    canActivate: [authGuard],
    loadChildren: () => import('@detrasoft.com/doc-signing').then(m => m.DOC_SIGNING_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'notes',
  },
];
