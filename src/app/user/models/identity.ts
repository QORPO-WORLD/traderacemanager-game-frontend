import {AbstractModel} from '../../common/models/abstract.model';
/**
 * @Author: open-source GPL
 * @Date: 06.08.2018 13:52
 */
export class Identity extends AbstractModel {

    id: number;
    email: string;

    constructor(data) {
        super();
        this.id = data.id;
        this.email = data.email;
        // todo permissions
    }
}
export interface Muser {
    id: string;
    hash: string;
    email?: string;
    nickname?: string;
    country?: string;
    affiliate_slug?: string;
    is_locked?: boolean;
    is_using_authenticator?: boolean;
    my_crypto_address?: string;
    nitro_wallet_ioie?: number; bonus_race_tickets?: number; golden_tickets?: number;
    is_first_login?: boolean; is_in_tutorial?: boolean; is_verified?: boolean;
}
