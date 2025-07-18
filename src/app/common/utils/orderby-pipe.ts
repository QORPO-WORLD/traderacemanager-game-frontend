/**
 * @Author: open-source GPL
 * @Date: 26.10.2018 21:22
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sortmain'
})
export class ArraySortPipe implements PipeTransform {
    transform(array: any[], field: string): any[] {
        array.sort((a: any, b: any) => {
            if (a[field] > b[field]) {
                return -1;
            } else if (a[field] < b[field]) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}
