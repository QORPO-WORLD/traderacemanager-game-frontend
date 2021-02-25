import { AuthService } from './../user/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriversService } from '../api/services';

@Component({
  selector: 'app-synergizer',
  templateUrl: './synergizer.component.html',
  styleUrls: ['./synergizer.component.scss'],
})
export class SynergizerComponent implements OnInit {
  dateX: number;
  interval: any;
  numOfNotifications = 0;
  notiObserver: Subscription;
  notifications: Notification[];
  constructor(private authService: AuthService, private api: DriversService) { }

  ngOnInit() {
    this.dateX = Date.now();
    //this.checkUser();
  }

  checkUser() {
    if (this.authService.hasToken()) {
      this.interval = setInterval(() => {
        this.getNotifications();
      }, 30000);
    }
  }

  getNotifications() {
    this.notiObserver = this.api.driversNotificationsList().subscribe(data => {
      this.countNotifications(data);
    });
  }

  countNotifications(data) {
    this.numOfNotifications = 0;
    for (let x = 0; x < data.length; x++) {
      if (data[x].event !== 'race_signup') {
        this.numOfNotifications = this.numOfNotifications + 1;
      }
    }

  }

}
