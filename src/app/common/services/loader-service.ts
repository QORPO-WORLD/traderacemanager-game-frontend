/**
 * @Author: MIT
 * @Date: 18.06.2016 22:58
 */

import {Injectable} from '@angular/core';

@Injectable()
export class LoaderService {

    private static loadingCount = 0;

    constructor() {
    }

    public show(): void {
        if (LoaderService.loadingCount === 0) {
            // todo show preloader
            // console.log('show preloader');
        }
        LoaderService.loadingCount++;
    }

    public hide(): void {
        if (LoaderService.loadingCount === 1) {
            // todo hide preloader
            // console.log('hide preloader');
        }
        LoaderService.loadingCount--;
    }

}
