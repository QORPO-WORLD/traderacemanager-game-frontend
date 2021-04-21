import { Notification } from './../../api/models/notification';
import { Component, OnInit, OnDestroy, Output, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriversService } from 'src/app/api/services';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit, OnDestroy, AfterViewInit {
  notiObserver: Subscription;
  notifications = [];
  showMore = false;
  sliceNum = 3;
  @Output() countSum = 0;
  constructor(private api: DriversService) { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    
    if (this.notiObserver) {
      this.notiObserver.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.notiObserver = this.api.driversNotificationsList().subscribe(data => {
      this.countNotifications(data);
    });
  }

  countNotifications(data) {
    this.countSum = data.length;
    this.notifications = data;
    console.log(data);
  }

  clearNotifications() {
    this.api.driversNotificationsDelete().subscribe(data => {
      this.notifications.length = 0;
    });
  }

}
