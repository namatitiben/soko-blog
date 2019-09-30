import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminLayoutRoutingModule } from "./admin-layout-routing.module";
import { AdminMainLayoutComponent } from "./admin-main-layout/admin-main-layout.component";
import { AdminMenuComponent } from "./admin-menu/admin-menu.component";
import { AdminModule } from "src/app/admin/admin.module";
import { MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [AdminMainLayoutComponent, AdminMenuComponent],
  imports: [CommonModule, AdminLayoutRoutingModule, AdminModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule]
})
export class AdminLayoutModule {}
