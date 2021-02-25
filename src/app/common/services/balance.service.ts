import { Subject } from 'rxjs';
import { AbstractService } from './abstract.service';
/**
 * @Author: open-source GPL
 * @Date: 07.09.2018 21:48
 */
import { Injectable } from '@angular/core';
@Injectable()
export class BalanceService extends AbstractService {
    balanceChanged: boolean;

    balanceChange: Subject<boolean> = new Subject<boolean>();

    constructor() {
        super();
        this.balanceChange.subscribe(value => {
            this.balanceChanged = value;
        });
    }

    balanceHasbeenChanged() {
        this.balanceChange.next(!this.balanceChanged);
    }
}
