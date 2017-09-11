import { AccountsListarComponent } from './accounts/accounts-listar/accounts-listar.component';
import { PagesComponent } from './pages/pages.component';

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from "@angular/core";



const appRoutes: Routes = [


  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: 'accounts', loadChildren: './accounts/accounts.module#AccountsModule' },
  { path: 'banks', loadChildren: './banks/banks.module#BanksModule' },
  { path: '404', component: PagesComponent },
  { path: '**', redirectTo: '404' }


]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
