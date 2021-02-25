import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {AuthService} from '../auth.service';
import {Identity} from '../../models/identity';

/**
 * redirect to dahsboard/onboarding based on identity status
 */
@Injectable()
export class AuthStatusGuard implements CanActivateChild {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const identity: Identity = this.authService.getIdentity();
        if (identity) {
            return true;
        }
    }
}
