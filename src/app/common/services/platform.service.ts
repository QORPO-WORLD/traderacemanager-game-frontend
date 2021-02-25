import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Platform } from '@ionic/angular';


@Injectable()
export class PlatformService extends AbstractService {

    public static PLATFORM_READY = false;
    public static isWebPlatform = false;

    readySource: string;

    constructor(public platform: Platform) {
        super();
        this.platform.ready().then((readySource) => {
            this.readySource = readySource;
            // console.log(this.readySource);
            this.isWeb();
        });
    }

    public isMobile(): boolean {
        if (this.platform.is('android') || this.platform.is('ios') && !this.isWeb()) {
            return true;
        } else {
            return false;
        }
    }

    public isWeb(): boolean {
        if (this.readySource) {
            if (this.platform.is('desktop') || this.readySource.toLowerCase() !== 'cordova') {
                PlatformService.isWebPlatform = true;
                return true;
            } else {
                return false;
            }
        }

    }

    public isAndroid(): boolean {
        if (this.platform.is('android')) {
            return true;
        } else {
            return false;
        }
    }

    public isIos(): boolean {
        if (this.platform.is('ios')) {
            return true;
        } else {
            return false;
        }
    }


}
