import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
/**
 * @Author: open-source GPL
 * @Date: 03.09.2018 21:18
 */
@Pipe({
    name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

    constructor(private currencyPipe: CurrencyPipe) {
    }

    transform(value: any): string {

        if (value != null) {

        } else {
            value = 0;
        }
        let result = this.currencyPipe.transform(value / 100, 'EUR', 'symbol', '1.2-2');
        if (result) {
            result = result.substr(1) + ' ' + result.substr(0, 1);
        }
        return result;
    }

}
