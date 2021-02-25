import {AbstractModel} from './abstract.model';
/**
 * @Author: open-source GPL
 * @Date: 21.08.2018 11:45
 */
export class Industry extends AbstractModel {
    id: number;
    name: string;

    constructor(data) {
        super();
        this.id = data.id;
        this.name = data.name;
    }
}
