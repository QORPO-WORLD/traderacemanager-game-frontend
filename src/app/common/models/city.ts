import {AbstractModel} from './abstract.model';
/**
 * @Author: open-source GPL
 * @Date: 03.09.2018 20:51
 */
export class City extends AbstractModel {

    id: number;
    name: string;
    latitude: number;
    longitude: number;
    info;

    constructor(data) {
        super();
        this.id = data.id;
        this.name = data.name;
        this.latitude = parseFloat(data.latitude);
        this.longitude = parseFloat(data.longitude);
        this.info = data.info;
    }
}
