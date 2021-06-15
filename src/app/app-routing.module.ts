import { AutologinGuard } from "./user/services/guards/autologin.guard";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  /*{
    path: '', redirectTo: 'race/start-race', pathMatch: 'full',
    canActivate: [AutologinGuard]
  },*/
  {
    path: "",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "home",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "other",
    loadChildren: () =>
      import("./others/others.module").then((m) => m.OthersModule),
  },
  {
    path: "car",
    loadChildren: () => import("./car/car.module").then((m) => m.CarModule),
  },
  {
    path: "player",
    loadChildren: () =>
      import("./player/player.module").then((m) => m.PlayerModule),
  },
  {
    path: "race",
    loadChildren: () => import("./race/race.module").then((m) => m.RaceModule),
  },
  {
    path: "teams",
    loadChildren: () =>
      import("./teams/teams.module").then((m) => m.TeamsModule),
  },
  {
    path: "your-races",
    loadChildren: () =>
      import("./yours/yours.module").then((m) => m.YoursModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./yours/yours.module").then((m) => m.YoursModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [AutologinGuard],
})
export class AppRoutingModule {}
