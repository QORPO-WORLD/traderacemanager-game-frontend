import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from '../../common/services/abstract.service';
import { Injectable, Injector } from '@angular/core';
import { FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Identity } from '../models/identity';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { PlatformService } from '../../common/services/platform.service';
import { AuthResource } from '../resources/auth.resource';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { Token } from '../models/token';

@Injectable()
export class GoogleService extends AbstractService {
    usinggauth: boolean;
    gauthfired: boolean;

    constructor(protected injector: Injector,
        private router: Router,
        protected resource: AuthResource,
        private googleCordovaService: GooglePlus,
        private platformService: PlatformService,
        private _http: HttpClient,
        private auth: AuthService) {
        super();
    }

    static LOGIN_METHOD_GOOGLE = 'google';
    static LOGIN_METHOD_FACEBOOK = 'facebook';

    socialToken: BehaviorSubject<Token> = new BehaviorSubject<Token>(null);

    /**
     * do oauth token retrieve based on social type
     * @param type
     */
 

    /**
     * do google sign in
     * retrieve token from google and use to social sign in
     */
    googleOauth() {
        this.googleCordovaService.login({})
            .then(user => {
                this.resolveAfterGLogin(user);
                /*
                                const identity: Identity = new Identity({
                                    method: SocialService.LOGIN_METHOD_GOOGLE,
                                    token: user.accessToken
                                });
                                this.signinSocial(identity);
                                */
            })
            .catch(error => {
                console.log('Google Sign In Error');
                console.error(error);
            });
    }

    resolveAfterGLogin(user: any) {
        this.loginAuth(user.idToken).subscribe({
            next: data => data.status === 200 ? this.auth.loginGWithNoSignup(data.body) : this.auth.loginGWithSignup(data.body),
            error: error => error.status === 456 ? this.fireGAuth() : null
          });
    }
    getErrorService() {
        throw new Error('Method not implemented.');
    }

    
  fireGAuth() {
    this.usinggauth = true;
    this.gauthfired = true;
  }


    loginAuth(user: string) {
        return this._http.post('https://dev-backend.ioi-game.com/ioi/auth/users/create-google/', {
            google_token: user
        },
            { observe: 'response' });

    }

    
  

    /**
     * sign in to social networks using social tokens
     * @param identity
     * @returns {Subscription}
     */
    public signinSocial(identity: any) {
        return this.resource.login(identity.username, identity.password, identity.token)
            .subscribe((result) => { // if sucess from API -> do social sign in
                if (result && result.action === 'signin-social') {
                    // notify identity service with new token
                    this.socialToken.next(result.token);
                    return result.token;
                } else { // if 424 error from API -> it means not all data provided, show social sign up form to fill additional data
                    this.router.navigate(['/signup-social'], {
                        queryParams: {
                            method: identity.method,
                            token: identity.token
                        }
                    });
                }
            });
    }

    /**
     * Sign out user from social
     */
    signoutSocial(): void {
        this.googleCordovaService.logout()
            .catch(error => {
                if (error === 'Google Not logged in') {
                    // omit error if not signed in
                }
            });
        /*this.facebookCordovaService.logout()
            .catch(error => {
                if (error === 'Facebook Not logged in') {
                    // omit error if not signed in
                }
            });

            */
    }

}
