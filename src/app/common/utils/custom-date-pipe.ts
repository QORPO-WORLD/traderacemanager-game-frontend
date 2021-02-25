/**
 * @Author: open-source GPL
 * @Date: 03.09.2018 21:46
 */
import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, 'dd.MM.yyyy');
    }
}
