import { NotifyService } from './../../../common/services/notify.service';
import { NotifiqService } from 'src/app/common/services/notifiq.service';
import { DailyTasks } from './../../../api/models/daily-tasks';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriversService, TeamChatService } from 'src/app/api/services';
import { DailyTask } from 'src/app/api/models';
import { AuthService } from 'src/app/user/services/auth.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-daily-tasks',
  templateUrl: './daily-tasks.component.html',
  styleUrls: ['./daily-tasks.component.scss'],
})
export class DailyTasksComponent implements OnInit, OnDestroy {
  dailyObserver: Subscription;
  myDriverOldObserver: Subscription;
  task: DailyTasks;
  task0: DailyTask;
  task1: DailyTask;
  task2: DailyTask;
  task3: DailyTask;
  task4: DailyTask;
  task5: DailyTask;
  task6: DailyTask;
  task7: DailyTask;
  task8: DailyTask;
  endofday: any;
  myDriverOld: any;
  startTutorial = false;
  tutorialStep = 1;
  showShareModal = false;
  affilateSlug: string;
  affilateText: string;
  taskSum: number;
  isPremium = false;
  constructor(private api: DriversService, private tchat: TeamChatService, private notify: NotifyService,
    private identityService: AuthService, private social: SocialSharing) { }

  ngOnInit() {
    this.checkTutorial();
    this.getDailyTasks();
    this.getMyOldDriver();
    this.getMyAffilate();
  }

  ngOnDestroy() {
    if (this.dailyObserver) {
      this.dailyObserver.unsubscribe();
    }
    if (this.myDriverOldObserver) {
      this.myDriverOldObserver.unsubscribe();
    }
  }

  getDailyTasks() {
    this.dailyObserver = this.api.driversDailyTasksList().
      subscribe(datax => {
        const data: any = datax;
        this.task = data;
        this.endofday = data.seconds_to_midnight;
        this.resolveTasks();
      });
  }

  getMyOldDriver() {
    this.myDriverOld = this.identityService.getDriverMe();
    if (this.myDriverOld.is_paid_membership === 'Free' || !this.myDriverOld.is_paid_membership) {
      this.isPremium = false;
    } else {
      this.isPremium = true;
    }
  }

  resolveTasks() {
    const jx = [
      'free_race',
      'make_referrals',
      'play_trx10_race',
      'play_trx100_race',
      'play_trx500_race',
      'play_trx1000_race',
      'deposit',
      'play_golden_race',
      'expert_tournament',
    ];

    for (let x = 0; x < this.task.daily_tasks.length; x++) {
      if (this.task.daily_tasks[x].reward_subtype === jx[0]) {
        this.task0 = this.task.daily_tasks[x];
      }
      if (this.task.daily_tasks[x].reward_subtype === jx[1]) {
        this.task1 = this.task.daily_tasks[x];
      }
      if (this.task.daily_tasks[x].reward_subtype === jx[2]) {
        this.task2 = this.task.daily_tasks[x];
      }
      if (this.task.daily_tasks[x].reward_subtype === jx[3]) {
        this.task3 = this.task.daily_tasks[x];
      }
      if (this.task.daily_tasks[x].reward_subtype === jx[4]) {
        this.task4 = this.task.daily_tasks[x];
      }
      if (this.task.daily_tasks[x].reward_subtype === jx[5]) {
        this.task5 = this.task.daily_tasks[x];
      }
      if (this.task.daily_tasks[x].reward_subtype === jx[6]) {
        this.task6 = this.task.daily_tasks[x];
      }
      if (this.task.daily_tasks[x].reward_subtype === jx[7]) {
        this.task7 = this.task.daily_tasks[x];
      }
      if (this.task.daily_tasks[x].reward_subtype === jx[8]) {
        this.task8 = this.task.daily_tasks[x];
      }


    }
  }



  serializeChatMessage() {
    const message = {
      message: 'Thanks for daily task rewards IOI',
      is_race24: false,
      is_admin_message: false
    };

    return message;
  }

  checkTutorial() {

    const data = this.identityService.getStorageIdentity();

    if (data.is_in_tutorial === true && window.innerWidth > 1024) {
      this.startTutorial = true;
    } else {
      this.tutorialStep = -1;
    }
  }

  skipModal() {
    this.startTutorial = false;
    this.api.driversTutorialPartialUpdate(false).subscribe(data => { this.identityService.meUpdate(); });
  }




  getMyAffilate() {
    const text = "Let's have a look at the TRADE RACE MANAGER presentation. You can look forward to really cool stuff.More to come. https://www.youtube.com/watch?v=isUGa3-AUVk #NFTs #game #playtoearn #Rewards $IOI $MATIC ";
    const data = this.identityService.getStorageAff();
    this.affilateSlug = 'https://traderacemanager.com/user/referral/' + data.affiliate_slug;
    this.affilateText = text + this.affilateSlug;
  }

  share() {
    this.social.share(this.affilateText, null, 'https://traderacemanager.com/assets/base/images/logo.png', null);
  }


  copyInputMessage() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.affilateText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
