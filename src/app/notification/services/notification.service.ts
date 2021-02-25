import { Injectable } from '@angular/core';
import { AbstractService } from '../../common/services/abstract.service';
import { NotificationResource } from '../resources/notification.resource';

import { Subject, Observable } from 'rxjs';
import { Feed } from 'src/app/common/models/feed';
/**
 * @Author: open-source GPL
 * @Date: 03.09.2018 22:23
 */
@Injectable({
    providedIn: 'root',
})
export class NotificationService extends AbstractService {

    private subject: Subject<Feed> = new Subject<Feed>();
    private subscribed: false;

    constructor(private resource: NotificationResource) {
        super();
        this.subscribe();
    }

    subscribe() {
    }

    getFeedItems(): Observable<Feed> {
        return this.subject.asObservable();
    }

}
