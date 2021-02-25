
import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../../user/services/auth.service';

@Injectable()
export class PresentTeamGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.hasToken()) {
            this.router.navigate(['sign-up-brand']);
        }
        return true;
    }
}
