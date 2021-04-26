import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserManagementService } from "./services/user-management.service";
import { MaterialModule } from "../material/material.module";
import { UserManagementRoutingModule } from "./user-management-routing.module";

import { UserListComponent } from "./pages/user-list/user-list.component";

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, UserManagementRoutingModule, MaterialModule],
  exports: [],
  providers: [UserManagementService],
})
export class UserManagementModule {}
