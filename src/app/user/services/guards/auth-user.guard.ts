import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth.service';
import {Identity} from '../../models/identity';

@Injectable()
export class AuthUserGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.hasToken()) {
            return true;
        }
        this.router.navigate(['user/welcome']);
        return false;
    }
}
