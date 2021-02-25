import {Injectable} from '@angular/core';
import {AbstractService} from './abstract.service';
import {environment} from '../../../environments/environment';
/**
 * @Author: MIT
 * @Date: 03.06.2016 21:27
 */
@Injectable()
export class CacheService extends AbstractService {

    private _data: { [key: string]: any } = {};
    public maxAge = 0;

    constructor() {
        super();

        if (this.isCacheEnabled()) {
            this.cacheDebug('cache enabled');
        } else {
            this.cacheDebug('cache disabled');
        }
    }

    public put(key: string, value: any, options?: any) {

        if (!this.isCacheEnabled()) {
            return;
        }

        // calculate max age for item
        this._data[key + '|@|options'] = ((options && options.maxAge) ? Date.now() + (options.maxAge * 1000) : Date.now() + (environment.cache.max_age * 1000));
        this._data[key] = value;

        this.cacheDebug('cache item added \'key=' + key + '\'');
    }

    public get(key: string) {

        if (!this.isCacheEnabled()) {
            return undefined;
        }

        let value = this._data[key] ? this._data[key] : null;
        const expire = this._data[key + '|@|options']; // get max age

        if (value) {
            if (expire > Date.now()) {
                this.cacheDebug('cache hit \'key=' + key + '\'');
                // value is valid do nothing
            } else {
                // value expired do remove value
                this.cacheDebug('cache miss \'key=' + key + '\'');
                this.remove(key);
                value = undefined;
            }
        }
        return value;
    }

    public remove(key: string) {

        if (!this.isCacheEnabled()) {
            return;
        }

        delete this._data[key + '|@|options'];
        delete this._data[key];
        this.cacheDebug('cache item removed \'key=' + key + '\'');
    }

    public clear() {

        if (!this.isCacheEnabled()) {
            return;
        }

        this._data = [];
        this.cacheDebug('cache cleared');
    }

    //

    private isCacheEnabled(): boolean {
        if (environment.cache.enabled) {
            return true;
        } else {
            return false;
        }
    }

    private cacheDebug(message: string) {
        if (environment.cache.debug) {
            console.warn(message);
        }
    }

}
