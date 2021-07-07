import { AffilateComponent } from "./pages/affilate/affilate.component";
//import { RewardsComponent } from "./pages/rewards/rewards.component";
//import { DailyTasksComponent } from "./components/daily-tasks/daily-tasks.component";

import { AuthUserGuard } from "../user/services/guards/auth-user.guard";
import { RouterModule, Routes } from "@angular/router";
import { SiteLayoutComponent } from "../common/components/layout/default/site-layout/site-layout.component";
import { ModuleWithProviders } from "@angular/core";

const routes: Routes = [
  {
    canActivate: [AuthUserGuard],
    component: SiteLayoutComponent,
    path: "other",
    children: [
      { path: "", redirectTo: "affilate", pathMatch: "prefix" },
      //{ path: "rewards", component: RewardsComponent },
      { path: "affilate", component: AffilateComponent },
      //{ path: "tasks", component: DailyTasksComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
