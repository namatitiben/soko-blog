import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './blog-list/blog-list.component';



@NgModule({
  declarations: [BlogListComponent],
  imports: [
    CommonModule
  ],
  exports: [BlogListComponent]
})
export class BlogModule { }
