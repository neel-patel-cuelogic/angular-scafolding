import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/login/components/login.component";

const routes: Routes = [
  { path: "", redirectTo: "/theming-preview", pathMatch: "full" },
  {
    path: "user-management",
    redirectTo: "/user-management",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
    data: { role: "user" },
  },
  { path: "**", redirectTo: "/theming-preview", pathMatch: "full" },
];

// , canActivate: [LoggedInGuardService]
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
