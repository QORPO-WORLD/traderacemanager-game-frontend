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
    this.countSum = 0;
    let tempArray = [];
    console.log(data);
    for (let x = 0; x < data.length; x++) {
      if (data[x].event === 'race_end' || data[x].event === 'balance_deposit' || data[x].event === 'balance_withdrawal'
      || data[x].event === 'game_daily_task' || data[x].event === 'game_buy_car' || data[x].event === 'game_team_join' || data[x].event === 'race_signup' || data[x].event === 'game_buy_car') {
        this.countSum = this.countSum + 1;
        tempArray.push(data[x]);
      }
    }

    this.notifications = tempArray;

  }

  clearNotifications() {
    this.api.driversNotificationsDelete().subscribe(data => {
      this.notifications.length = 0;
    });
  }

}
