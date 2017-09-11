import { AppSharedComponentsModule } from './../app-shared-components.module';
import { AppPaginateComponent } from './../app-paginate.component';
import { AccountsVisualizarComponent } from './accounts-visualizar/accounts-visualizar.component';
import { AccountsNovoComponent } from './accounts-novo/accounts-novo.component';
import { AccountsEditarComponent } from './accounts-editar/accounts-editar.component';
import { AccountsListarComponent } from './accounts-listar/accounts-listar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LaddaModule } from 'angular2-ladda';



const routes: Routes = [{
  path: '',
  data: {
    title: 'Contas - Listar',
    urls: [{ title: 'iFinance', url: '/' }, { title: 'Contas - Listar' }]
  },
  component: AccountsListarComponent
},
{
  path: 'new',
  data: {
    title: 'Contas - Adicionar',
    urls: [{ title: 'iFinance', url: '/' }, { title: 'Contas - Adicionar' }]
  },
  component: AccountsNovoComponent
},
{
  path: ':id/view',
  data: {
    title: 'Contas - Visualizar',
    urls: [{ title: 'iFinance', url: '/' }, { title: 'Contas - Visualizar' }]
  },
  component: AccountsVisualizarComponent
},
{
  path: ':id/edit',
  data: {
    title: 'Contas - Editar',
    urls: [{ title: 'iFinance', url: '/' }, { title: 'Contas - Editar' }]
  },
  component: AccountsEditarComponent
}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    LaddaModule,
    AppSharedComponentsModule
  ],
  declarations: [
    AccountsListarComponent,
    AccountsEditarComponent,
    AccountsNovoComponent,
    AccountsVisualizarComponent,

  ]
})
export class AccountsModule { }
