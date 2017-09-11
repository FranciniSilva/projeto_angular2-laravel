import { AppSharedComponentsModule } from './../app-shared-components.module';
import { BanksListarComponent } from './banks-listar/banks-listar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LaddaModule } from 'angular2-ladda';


const routes: Routes = [{
  path: '',
  data: {
    title: 'Bancos - Listar',
    urls: [{ title: 'iFinance', url: '/' }, { title: 'Bancos - Listar' }]
  },
  component: BanksListarComponent
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
    BanksListarComponent,
  ]
})
export class BanksModule { }
