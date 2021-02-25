import { Notifiq, NotifiqType } from './../../../models/notifiq';
import { NotifiqService } from './../../../services/notifiq.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractComponent } from '../../abstract.component';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { Feed } from 'src/app/common/models/feed';

@Component({
  selector: 'app-notifiq',
  templateUrl: './notifiq.component.html',
  styleUrls: ['./notifiq.component.scss']
})
export class NotifiqComponent extends AbstractComponent {

  notifiqs: Notifiq[] = [];
  private subsqription: Subscription;
  pushering: any;

  public feeds: Feed[] = [];

  private feedSubscription: Subscription;

  constructor(private notifiqSvc: NotifiqService, protected notify: NotificationService) {
    super();
    this.feedSubscription = this.notify
      .getFeedItems()
      .subscribe((feed: Feed) => {
        this.feeds.push(feed);
      });
  }

  private _addnotifiq(notification: any) {
    this.notifiqs.push(notification);

    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);

    }
  }

  ngOnInit() {
    this.subsqription = this.notifiqSvc.getObservable().subscribe(data => this._addnotifiq(data));
  }

  ngOnDestroy() {
    if (this.subsqription) {
      this.subsqription.unsubscribe();
    }

    if (this.feedSubscription) {
      this.feedSubscription.unsubscribe();
    }
  }

  close(notifiq: Notifiq) {
    this.notifiqs = this.notifiqs.filter(notif => notif.id !== notifiq.id);
  }


  className(notifiq: Notifiq): string {

    let style: string;

    switch (notifiq.type) {

      case NotifiqType.success:
        style = 'success';
        break;

      case NotifiqType.warning:
        style = 'warning';
        break;

      case NotifiqType.error:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }
}