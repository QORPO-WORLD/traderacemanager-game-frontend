import { AutologinGuard } from "./user/services/guards/autologin.guard";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '', redirectTo: 'user/sign-up', pathMatch: 'full'
  },
  {
    path: "",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [AutologinGuard],
})
export class AppRoutingModule {}
