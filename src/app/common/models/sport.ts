import {AbstractModel} from './abstract.model';
/**
 * @Author: open-source GPL
 * @Date: 03.09.2018 20:55
 */
export class Sport extends AbstractModel {

    id: number;
    name: string;

    constructor(data) {
        super();
        this.id = data.id;
        this.name = data.name;
    }
}
