import { UserVerifiedComponent } from './pages/user-verified/user-verified.component';
import { EmailCreatedComponent } from './pages/email-created/email-created.component';
import { ActivationComponent } from './components/activation/activation.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AutologinGuard } from './services/guards/autologin.guard';
import { LoginComponent } from './components/login/login';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password';
import { ResetPasswordComponent } from './components/forgot-password/reset-password';
import { SignupUserComponent } from './components/signup/signup-user';

const routes: Routes = [
    {
        path: 'user',
        canActivate: [AutologinGuard],
        children: [
            
            { path: 'sign-up', component: SignupUserComponent, data: { title: 'Team Sign Up' } },
            { path: 'sign-in', component: LoginComponent, data: { title: 'Sign In' } },
            { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: 'Forgot Password' } },
            { path: 'reset-password', component: ResetPasswordComponent, data: { title: 'Reset Password' } },
            { path: 'referral/:id', component: SignupUserComponent, data: { title: 'Privacy Policy' } },
            { path: 'activation/:id/:hash', component: ActivationComponent, data: { title: 'Privacy Policy' } },
            { path: 'email-created', component: EmailCreatedComponent, data: { title: 'Privacy Policy' } },
            { path: 'user-verify', component: UserVerifiedComponent, data: { title: 'Privacy Policy' } },
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
