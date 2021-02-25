import {AbstractService} from './abstract.service';
import {HttpService} from './http.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {forkJoin} from 'rxjs/index';

/**
 * @Author: open-source GPL
 * @Date: 12.08.2018 22:54
 */
@Injectable()
export class EnumService extends AbstractService {

    static SPORTS_ENUM = 'sportsEnum';
    static COUNTRIES_ENUM = 'countriesEnum';
    static LANGUAGES_ENUM = 'languagesEnum';
    static CATEGORIES_ENUM = 'categoriesEnum';
    static PACKAGE_CATEGORIES_ENUM = 'packageCategoriesEnum';
    static INDUSTRIES_ENUM = 'industriesEnum';
    static INVENTORY_TYPE_ENUM = 'inventoryTypeEnum';
    static LEAGUES_ENUM = 'inventoryTypeEnum';

    initialized = false;

    sportsEnum: any = [];
    countriesEnum: any = [];
    languagesEnum: any = [];
    categoriesEnum: any = [];
    packageCategoriesEnum: any = [];
    industriesEnum: any = [];
    inventoryTypeEnum: any = [];
    leaguesEnum: any = [];

    constructor(private httpService: HttpService) {
        super();
    }

    /**
     * initialize enum data
     * - called from initialize.observer before each route
     * @returns {OperatorFunction<T, R>}
     */
    public initializeEnums(): Observable<any> {

        if (this.initialized) {
            return;
        }



        return Observable.forkJoin([])
            .map(results => {

                return results;
            });
    }

    public isInitialized(): boolean {
        return this.initialized;
    }

    


}
