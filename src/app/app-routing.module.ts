import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/theming-preview", pathMatch: "full" },
  {
    path: "user-management",
    loadChildren: () =>
      import("./modules/user-management/user-management.module").then(
        (m) => m.UserManagementModule
      ),
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./modules/login/login.module").then((m) => m.LoginModule),
  },
  { path: "**", redirectTo: "/theming-preview", pathMatch: "full" },
];

// , canActivate: [LoggedInGuardService]
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
