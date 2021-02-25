import {AbstractModel} from '../../common/models/abstract.model';
/**
 * @Author: open-source GPL
 * @Date: 03.09.2018 22:23
 */
export class Notification extends AbstractModel {

    id: number;
    type: string;
    title: string;
    description: string;
    seen: boolean;
    user: any;
    created_at: any;

    constructor(data) {
        super();
        this.id = data.id;
        this.type = data.type;
        this.title = data.title;
        this.description = data.description;
        this.seen = data.seen;
        this.user = data.user;
        this.created_at = data.created_at;
    }

}
