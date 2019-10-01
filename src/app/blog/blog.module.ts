import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap/alert';

import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

@NgModule({
  declarations: [BlogListComponent, BlogItemComponent, BlogDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  exports: [BlogListComponent]
})
export class BlogModule {}
