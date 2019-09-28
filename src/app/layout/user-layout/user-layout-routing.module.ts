import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogListComponent } from 'src/app/blog/blog-list/blog-list.component';
import { UserMainComponent } from './user-main/user-main.component';


const routes: Routes = [
  {path: '', component: UserMainComponent, children: [ {path: '', component: BlogListComponent}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
