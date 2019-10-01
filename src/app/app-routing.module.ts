import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/user-layout/user-layout.module').then(
        mod => mod.UserLayoutModule
      )
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./layout/admin-layout/admin-layout.module').then(
        mod => mod.AdminLayoutModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
