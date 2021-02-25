export class Notifiq {

    constructor(
        public id: number,
        public type: NotifiqType,
        public title: string,
        public message: string,
        public timeout: number,
    ) { }

}

export enum NotifiqType {
    success = 0,
    warning = 1,
    error = 2,
    info = 3
}