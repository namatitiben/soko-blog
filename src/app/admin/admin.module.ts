import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatSidenavModule } from '@angular/material';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BlogFormComponent } from './blog-form/blog-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    BlogListComponent,
    BlogFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class AdminModule {}
