import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserManagementService } from "./services/user-management.service";
import { MaterialModule } from "../material/material.module";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ViewUserDialogBoxComponent } from "./components/view-user-dialog-box/view-user-dialog-box.component";
import { HistoryDialogBoxComponent } from "./components/history-dialog-box/history-dialog-box.component";
import { UserDialogBoxComponent } from "./components/user-dialog-box/user-dialog-box.component";

@NgModule({
  declarations: [
    UserListComponent,
    ViewUserDialogBoxComponent,
    HistoryDialogBoxComponent,
    UserDialogBoxComponent,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [],
  providers: [UserManagementService],
  entryComponents: [
    ViewUserDialogBoxComponent,
    HistoryDialogBoxComponent,
    UserDialogBoxComponent,
  ],
})
export class UserManagementModule {}
