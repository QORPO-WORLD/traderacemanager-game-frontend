import {AbstractModel} from './abstract.model';
/**
 * @Author: open-source GPL
 * @Date: 20.09.2018 21:13
 */
export class ApiError extends AbstractModel {

    status: number;
    url: string;
    name: string;
    message: string;
    hasErrorDetail = false;
    eId: string;
    eTitle: string;
    eCode: string;
    eDetail: string;
    eMetadata: any;

    constructor(data) {
        super();
        this.status = data.status;
        this.url = data.url;
        this.name = data.name;
        this.message = data.message;
        this.hasErrorDetail = (data.error && data.error.error) ? true : false;

        if (this.hasErrorDetail) {
            const errorObject = data.error.error;
            this.eId = errorObject.id;
            this.eTitle = errorObject.title;
            this.eCode = errorObject.code;
            this.eDetail = errorObject.detail;
            this.eMetadata = errorObject.metadata;
        }
    }

    public getUserMessage(): string {
        if (this.hasErrorDetail) {
            // parse validation errors from api object
            if (this.eMetadata && this.eMetadata.validation) {
                let validationString = '';
                for (const variable in this.eMetadata.validation) {
                    if (this.eMetadata.validation[variable]) {
                        const variableMessages = this.eMetadata.validation[variable];
                        if (variableMessages instanceof Array) {
                            for (let i = 0; i < variableMessages.length; i++) {
                                validationString += variableMessages[i] + '\n';
                            }
                        }
                    }
                }
                return this.eTitle + ' -> ' + validationString;
            } else {
                return this.eTitle;
            }
        } else {
            return this.name + ' ' + this.url;
        }
    }

}
