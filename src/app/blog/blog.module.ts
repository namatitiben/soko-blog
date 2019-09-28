import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './blog-list/blog-list.component';
import { RouterModule } from '@angular/router';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';



@NgModule({
  declarations: [BlogListComponent, BlogItemComponent, BlogDetailsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BlogListComponent]
})
export class BlogModule { }
