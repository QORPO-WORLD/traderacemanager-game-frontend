import { TeslaCompetitionComponent } from "./pages/tesla-competition/tesla-competition.component";
import { WalletLoginComponent } from "./components/wallet-login/wallet-login.component";
import { HowToComponent } from "./pages/how-to/how-to.component";
import { VerifyauthenticatorComponent } from "./pages/verify-authenticator/verify-authenticator.component";
import { VerifyUserComponent } from "./pages/verify-user/verify-user.component";
import { MetamaskSignupComponent } from "./../others/components/metamask-signup/metamask-signup.component";
import { GoogleService } from "./services/google.service";

import { SocialService } from "./services/social.service";

import { FilterPipe } from "./components/countries/filter.pipe";
import { OthersModule } from "./../others/others.module";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpHandler,
  HttpHeaders,
} from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AuthService } from "./services/auth.service";
import { AuthResource } from "./resources/auth.resource";
import { AutologinGuard } from "./services/guards/autologin.guard";
import { JwtInterceptor } from "./services/interceptors/jwt.interceptor";
import { LoginComponent } from "./components/login/login";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password";
import { CommonModule } from "@angular/common";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Facebook } from "@ionic-native/facebook/ngx";

import { HomeNftDetailComponent } from "./pages/home-nft-detail/home-nft-detail.component";
import { HomeShopComponent } from "./pages/home-shop/home-shop.component";
import { ResetPasswordComponent } from "./components/forgot-password/reset-password";
import { SignupUserComponent } from "./components/signup/signup-user";
import { ReferralLoginComponent } from "./pages/referral/referral.component";
import { ActivationComponent } from "./components/activation/activation.component";
import { EmailCreatedComponent } from "./pages/email-created/email-created.component";
import { UserVerifiedComponent } from "./pages/user-verified/user-verified.component";
import { HomeBundlesComponent } from "./pages/home-bundles/home-bundles.component";
import { HomeAffiliateComponent } from "./pages/home-affiliate/home-affiliate.component";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule as ninja } from "../common/common.module";
import { AuthUserGuard } from "./services/guards/auth-user.guard";
//import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
//import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { IonicModule } from "@ionic/angular";
import { IonicSelectableModule } from "ionic-selectable";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { WloginComponent } from "./components/wlogin/wlogin";
import { CompetitionComponent } from "./components/competition/competition.component";
import { CreditSystemComponent } from "./components/credit-system/credit-system.component";
import { PrivacyPolicyComponent } from "./components/privacy-policy/privacy-policy.component";
import { TermsConditionsComponent } from "./components/terms-conditions/terms-conditions.component";
import { WelcomePageComponent } from "./components/welcome-page/welcome-page.component";
import { HomepageLayoutComponent } from "../common/components/layout/homepage-layout/homepage-layout.component";
import { HomeBundleDetailComponent } from "./pages/home-bundle-detail/home-bundle-detail.component";
import { WelcomePageTRM2Component } from "./components/welcome-page-trm2/welcome-page-trm2.component";

//import { NgxCaptchaModule } from 'ngx-captcha';
//import { RecaptchaService } from './services/recaptcha.service';
//import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
const routes: Routes = [
  {
    path: "",
    component: HomepageLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "welcome",
        pathMatch: "full",
      },
      {
        path: "home",
        component: HomePageComponent,
        data: { title: "Home page" },
      },
      {
        path: "shop",
        component: HomeShopComponent,
        data: { title: "Nft shop" },
      },
      {
        path: "nft-detail",
        component: HomeNftDetailComponent,
        data: { title: "Nft detail" },
      },
      {
        path: "affiliate",
        component: HomeAffiliateComponent,
        data: { title: "Affiliate" },
      },
      {
        path: "bundles",
        component: HomeBundlesComponent,
        data: { title: "Bundles" },
      },
      {
        path: "bundle-detail",
        component: HomeBundleDetailComponent,
        data: { title: "Bundle detail" },
      },
      {
        path: "how-to",
        component: HowToComponent,
        data: { title: "How to" },
      },
    ],
  },
  {
    path: "sign-up",
    component: SignupUserComponent,
    data: { title: "Team Sign Up" },
  },
  {
    path: "sign-up-campaign2020a",
    component: SignupUserComponent,
    data: { title: "Team Sign Up", type: "demo" },
  },
  { path: "sign-in", component: LoginComponent, data: { title: "Sign In" } },
  { path: "wsign-in", component: WloginComponent, data: { title: "Sign In" } },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    data: { title: "Forgot Password" },
  },
  {
    path: "password-reset",
    component: ResetPasswordComponent,
    data: { title: "Reset Password" },
  },
  {
    path: "referral/:id",
    component: SignupUserComponent,
    data: { title: "Privacy Policy" },
  },
  {
    path: "activation/:id/:hash",
    component: ActivationComponent,
    data: { title: "Privacy Policy" },
  },
  {
    path: "email-created",
    component: EmailCreatedComponent,
    data: { title: "Privacy Policy" },
  },
  {
    path: "user-verify",
    component: UserVerifiedComponent,
    data: { title: "Privacy Policy" },
  },
  {
    path: "verify-code",
    component: VerifyUserComponent,
    data: { title: "Verify user" },
  },
  {
    path: "verify-authenticator",
    component: VerifyauthenticatorComponent,
    data: { title: "Verify user" },
  },
  {
    path: "terms-conditions",
    component: TermsConditionsComponent,
    data: { title: "Terms and conditions" },
  },
  {
    path: "competition",
    component: CompetitionComponent,
    data: { title: "Statue of competition" },
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
    data: { title: "Privacy policy" },
  },
  {
    path: "credit-system",
    component: CreditSystemComponent,
    data: { title: "Credit system" },
  },
  {
    path: "welcome",
    component: WelcomePageTRM2Component,
    data: { title: "Welcome page" },
  },
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    OthersModule,
    //RecaptchaModule,
    ninja,
    //RecaptchaFormsModule,
    IonicModule,
    IonicSelectableModule,
    //ecaptchaV3Module
  ],
  declarations: [
    LoginComponent,
    SignupUserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ReferralLoginComponent,
    ActivationComponent,
    FilterPipe,
    EmailCreatedComponent,
    UserVerifiedComponent,
    HomePageComponent,
    WloginComponent,
    MetamaskSignupComponent,
    VerifyUserComponent,
    VerifyauthenticatorComponent,
    HomeShopComponent,
    HomeNftDetailComponent,
    CompetitionComponent,
    CreditSystemComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    WelcomePageComponent,
    WelcomePageTRM2Component,
    HomeAffiliateComponent,
    HomeBundlesComponent,
    HomepageLayoutComponent,
    HomeBundleDetailComponent,
    HowToComponent,
    WalletLoginComponent,
    TeslaCompetitionComponent,
  ],
  providers: [
    AutologinGuard,
    AuthService,
    AuthResource,
    AuthUserGuard,
    GooglePlus,
    Facebook,
    SocialService,
    GoogleService,
    //RecaptchaService,
    //{ provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdgmbUaAAAAAEqxCqDgS3MbmPN_Y18URkBaTpNE' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    /* {
            provide: RECAPTCHA_SETTINGS,
            useValue: {
                //siteKey: '6LeDgc8ZAAAAAHDQAzA6qDDBI5ouG6uETBGMtXvf',
                siteKey: '6LcNse0UAAAAAF7Gbd8An-J9sTBFWH03PHpupDgC',
                theme: 'dark'
            } as RecaptchaSettings,
        } */
    // {provide: HTTP_INTERCEPTORS, useClass: ForbiddenInterceptor, multi: true}
  ],
  exports: [
    ReactiveFormsModule,
    //RecaptchaModule,
    //RecaptchaFormsModule
  ],
})
export class UserModule {}
