import { CommonModule } from '@angular/common';
import { AppPaginateComponent } from './app-paginate.component';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppPaginateComponent
  ],
  exports: [
    AppPaginateComponent
  ]
})
export class AppSharedComponentsModule { }
