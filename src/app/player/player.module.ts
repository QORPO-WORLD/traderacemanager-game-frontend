import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpHandler, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { AuthService } from '../user/services/auth.service';



import { AuthUserGuard } from '../user/services/guards/auth-user.guard';
import { CommonModule } from '@angular/common';
import { CommonModule as ninja } from '../common/common.module';
import { AuthStatusGuard } from '../user/services/guards/auth-status.guard';
import { GauthComponent } from './gauth/gauth.component';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { GauthrComponent } from '../user/pages/gauthr/gauthr.component';
import { DisGauthrComponent } from '../user/pages/disgauthr/disgauthr.component';


const routes: Routes = [
    { path: 'setup-auth', component: GauthrComponent },
    { path: 'disable-auth', component: DisGauthrComponent },
];
@NgModule({
    imports: [
        CommonModule,
        ninja,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild(routes),
        IonicModule,
        IonicSelectableModule
    ],
    declarations: [
        GauthrComponent, DisGauthrComponent, GauthComponent],
    providers: [
        AuthUserGuard,
        AuthStatusGuard,
        AuthService
    ],
    exports: []
})

export class PlayerModule {
}
