import { Routes } from '@angular/router';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: './authentication/auth-signin/auth-signin.module#AuthSigninModule'
  },
  // {
  //   path: 'mantenimiento',
  //   loadChildren: './pages/content-pages/maintenance/maintenance.module#MaintenanceModule'
  // },
  // {
  //   path: '**',
  //   loadChildren: './pages/content-pages/error/error.module#ErrorModule'
  // }
];
