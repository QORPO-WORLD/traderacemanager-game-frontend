import { MyProfileComponent } from "./pages/my-profile/my-profile.component";
import { TransactionsComponent } from "./../yours/pages/transactions/transactions.component";
import { SiteLayoutComponent } from "../common/components/layout/default/site-layout/site-layout.component";
import { RouterModule, Routes } from "@angular/router";
//import { RewardsComponent } from "../others/pages/rewards/rewards.component";
import { AffilateComponent } from "../others/pages/affilate/affilate.component";
import { ModuleWithProviders } from "@angular/core";
import { AuthUserGuard } from "../user/services/guards/auth-user.guard";
import { MyRacesComponent } from "./pages/my-races/my-races.component";

const routes: Routes = [
  {
    path: "your-races",
    component: SiteLayoutComponent,
    canActivate: [AuthUserGuard],
    children: [
      {
        path: "transactions",
        component: TransactionsComponent,
      },
      {
        path: "my-races",
        component: MyRacesComponent,
      },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
