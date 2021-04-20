import { StatsProfileComponent } from "./pages/stats-profile/stats-profile.component";
import { MyProfileComponent } from "./pages/my-profile/my-profile.component";
import { TransactionsComponent } from "./../yours/pages/transactions/transactions.component";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpHandler,
  HttpHeaders,
} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AuthService } from "../user/services/auth.service";

import { AuthUserGuard } from "../user/services/guards/auth-user.guard";
import { CommonModule as ninja } from "@angular/common";
import { CommonModule } from "../common/common.module";
import { AuthStatusGuard } from "../user/services/guards/auth-status.guard";
import { environment } from "../../environments/environment";
import { MyRacesComponent } from "./pages/my-races/my-races.component";
import { SiteLayoutComponent } from "../common/components/layout/default/site-layout/site-layout.component";
import { OthersModule } from "../others/others.module";

const routes: Routes = [
  {
    path: "",
    component: SiteLayoutComponent,
    canActivate: [AuthUserGuard],
    children: [
      {
        path: "transactions",
        component: TransactionsComponent,
      },
      {
        path: "transactions/my-races",
        component: MyRacesComponent,
      },
      {
        path: "my-profile",
        component: MyProfileComponent,
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    ninja,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    OthersModule,
  ],
  declarations: [
    TransactionsComponent,
    MyRacesComponent,
    MyProfileComponent,
    StatsProfileComponent,
  ],
  providers: [AuthUserGuard, AuthStatusGuard, AuthService],
  exports: [],
})
export class YoursModule {}
