import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminMainLayoutComponent } from "./admin-main-layout/admin-main-layout.component";
import { LoginComponent } from "src/app/admin/login/login.component";
import { BlogListComponent } from "src/app/admin/blog-list/blog-list.component";

const routes: Routes = [
  { 
    path: "", component: AdminMainLayoutComponent, 
    children: [
      { path: "", component: LoginComponent }
    ]
  },
  {
    path: "blog-list",
    component: AdminMainLayoutComponent,
    children: [
      { path: "", component: BlogListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule {}
