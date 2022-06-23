import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AuthGuard } from '../app/theme/shared/auth/auth-guard.service';


import { Full_ROUTES } from "./theme/shared/routes/full.routes";
import { CONTENT_ROUTES } from "./theme/shared/routes/content-layout.routes";
const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full', canActivate: [AuthGuard]
  },
  { path: '', component: AdminComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: AuthComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES }
];

@NgModule({

  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
