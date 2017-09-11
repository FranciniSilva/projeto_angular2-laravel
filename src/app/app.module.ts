import { ApiService } from './service/api.service';
import { LayoutComponent } from './layout/layout.component';
import { PagesComponent } from './pages/pages.component';
import { AppRoutingModule } from './app.routing.module';
import { AccountsModule } from './accounts/accounts.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpModule,
    AccountsModule,
    AppRoutingModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
