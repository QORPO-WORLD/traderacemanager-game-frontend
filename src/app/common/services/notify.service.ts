import { NotifiqService } from './notifiq.service';
import { AbstractService } from './abstract.service';
/**
 * @Author: open-source GPL
 * @Date: 07.09.2018 21:48
 */
import { Injectable } from '@angular/core';
@Injectable()
export class NotifyService extends AbstractService {

    static NOTIFY_DURATION = 3000;
    panelClass: string | string[];

    constructor(protected notifiq: NotifiqService) {
        super();
    }

    private getConfig(cl) {
        // let extraClasses;
        const config: any = new Object;
        config.duration = NotifyService.NOTIFY_DURATION;
        config.verticalPosition = 'top';
        config.panelClass = cl;
        return config;
    }

    formSuccess() {
        this.notifiq.success('success', this.getConfig('success'));
    }

    formValidationError() {
        this.notifiq.error('error', this.getConfig('error'));
    }

    formError() {
        this.notifiq.error('error', this.getConfig('error'));
    }

    success(message: string) {
        this.notifiq.success('success', this.getConfig('success'));
    }

    error(message: any) {
        if (message) {
            this.notifiq.error('error', message);
        }
    }
    errornext(message: any) {
        this.notifiq.error('error', message.error);
    }

}
