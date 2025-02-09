import { Routes } from '@angular/router';
import { noAuthGuard } from './core/auth/guards/no-auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/pages/home/home.routes'),
      },
    ],
  },
  {
    path: '',
    canActivate: [noAuthGuard],
    canActivateChild: [noAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-in',
        loadChildren: () => import('./modules/auth/sign-in/sign-in.routes'),
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./modules/auth/sign-up/sign-up.routes'),
      },
    ],
  },
];
