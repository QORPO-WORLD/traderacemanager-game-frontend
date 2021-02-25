import {AbstractModel} from '../../common/models/abstract.model';
/**
 * @Author: MIT
 * @Date: 06.09.2016 12:54
 */

export class Token extends AbstractModel {
    access: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;

    constructor(data) {
        super();
        this.access = data.access;
        this.expires_in = data.expires_in;
        this.refresh_token = data.refresh_token;
        this.scope = data.scope;
        this.token_type = data.token_type;
    }
}
