/**
 * @Author: open-source GPL
 * @Date: 09.09.2018 21:45
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'noComma'
})
export class NoCommaPipe implements PipeTransform {

    transform(val: number): string {
        if (val !== undefined && val !== null) {
            // here we just remove the commas from value
            // return val.toString().replace(',', ' ');
            return val.toString().replace(/,/g, ' ');
        } else {
            return '';
        }
    }
}
