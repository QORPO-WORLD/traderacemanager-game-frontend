/**
 * @Author: open-source GPL
 * @Date: 09.09.2018 21:45
 */
import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe, DecimalPipe} from '@angular/common';

@Pipe({
  name: 'soNumber'
})
export class SoNumberPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe, private decimalPipe: DecimalPipe) {}

  transform(value: any, isCurrency: boolean = false): string {
    if (value === undefined || value === null) {
      return '-';
    }


    if (isCurrency) {
      value = this.currencyPipe.transform(value / 100, 'EUR', 'symbol', '1.2-2');
      value = value.substr(1) + ' ' + value.substr(0, 1);
    } else {
      value = this.decimalPipe.transform(value);
    }

    return value.toString().replace(/,/g, ' ');
  }
}
