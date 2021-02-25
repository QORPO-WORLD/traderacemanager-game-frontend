import {Injector, OnInit} from '@angular/core';
import {AuthService} from '../../user/services/auth.service';
import {ErrorService} from '../services/error.service';
import {NotifyService} from '../services/notify.service';
import {TitleService} from '../services/title.service';
/**
 * @Author: MIT
 */
export abstract class AbstractComponent implements OnInit {

    private authService: AuthService;
    private errorService: ErrorService;
    private notifyService: NotifyService;
    private titleService: TitleService;

    team: any;

    constructor(protected injector?: Injector) {
        if (this.injector) {
            this.authService = this.injector.get(AuthService);
            this.notifyService = this.injector.get(NotifyService);
            this.errorService = this.injector.get(ErrorService);
            this.titleService = this.injector.get(TitleService);
        }

    }

    ngOnInit() {

    }

    public get displayDummyData(): boolean {
      if (this.team === undefined) {
        return false;
      } else {
        return !['FC International', 'FC National', 'FC Local'].includes(this.team.name);
      }
    }

    protected getAuthService(): AuthService {
        return this.authService;
    }

    protected getNotifyService(): NotifyService {
        return this.notifyService;
    }

    protected getErrorService(): ErrorService {
        return this.errorService;
    }



    protected getTitleService(): TitleService {
        return this.titleService;
    }

    /**
     * get organizationId
     * @returns {number}
     */


}
