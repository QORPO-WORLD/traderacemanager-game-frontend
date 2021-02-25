import {AbstractModel} from './abstract.model';
/**
 * @Author: open-source GPL
 * @Date: 03.09.2018 20:51
 */
export class Country extends AbstractModel {

    id: number;
    name: string;

    constructor(data) {
        super();
        this.id = data.id;
        this.name = data.name;
    }

}
