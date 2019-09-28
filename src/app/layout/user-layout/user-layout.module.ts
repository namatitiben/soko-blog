import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { UserMainComponent } from './user-main/user-main.component';


@NgModule({
  declarations: [UserHeaderComponent, UserFooterComponent, UserMainComponent],
  imports: [
    CommonModule,
    UserLayoutRoutingModule
  ]
})
export class UserLayoutModule { }
