import { PlayerProfileComponent } from './pages/player-profile/player-profile.component';
import { SiteLayoutComponent } from '../common/components/layout/default/site-layout/site-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthUserGuard } from '../user/services/guards/auth-user.guard';

const routes: Routes = [
    {
        path: 'player',
        component: SiteLayoutComponent,
        canActivate: [AuthUserGuard],
        children: [
            {
                path: 'profile',
                component: PlayerProfileComponent
            }
        ]
    }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
