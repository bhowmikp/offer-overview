import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'table', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
