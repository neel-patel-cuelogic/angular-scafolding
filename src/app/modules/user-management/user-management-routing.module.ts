import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { UserManagementComponent } from "./user-management.component";

const routes: Routes = [
  {
    path: "user-management",
    component: UserManagementComponent,
    children: [
      { path: "", component: UserListComponent },
      { path: "**", redirectTo: "/user-management", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
