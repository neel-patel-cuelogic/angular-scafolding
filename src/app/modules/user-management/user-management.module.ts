import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserManagementService } from "./services/user-management.service";
import { MaterialModule } from "../material/material.module";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [],
  providers: [UserManagementService],
})
export class UserManagementModule {}
