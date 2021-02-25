import { AuthService } from 'src/app/user/services/auth.service';
import { PlayerLeaderboard } from './../../api/models/player-leaderboard';
import { InternalTeamLeaderboard } from './../../api/models/internal-team-leaderboard';
import { AffiliatesService, DriversService, LeaderboardService, RewardsService } from 'src/app/api/services';
import { NotifiqService } from './../../common/services/notifiq.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss'],
})
export class MyTeamComponent implements OnInit, OnDestroy {
  tickInterval:any;
  TeamManagerSlide=1;
  activeRate=1;
  teamSubscription: Subscription;
  ldbrdSubscription: Subscription;
  drSubscription: Subscription;
  afSubscription: Subscription;
  graphType='Turnover';
  myTeam: InternalTeamLeaderboard;
  myLdrbrd: any;
  is24race = false;
  isLastMonth = false;
  showDayTipModal = false;
  editTips = true;
  mydrvr: any;
  teamreward: any;
  myAffilate: any;
  myuser: any;
  constructor(private api: LeaderboardService, private drvrsrvc: DriversService, private affisrvc: AffiliatesService,
    private router: Router, protected notify: NotifiqService, private identityService: AuthService, private rapi: RewardsService) { }

  ngOnInit() {
    this.getMyTem();
    this.getMyLdrbrd();
    this.getMyDriver();
    this.getMyLevel();
    this.getRewards();
    this.changeSlide();
  }

  routerOnDeactivate() {
    clearInterval(this.tickInterval);
  }

  ngOnDestroy() {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
    if (this.ldbrdSubscription) {
      this.ldbrdSubscription.unsubscribe();
    }
    if (this.drSubscription) {
      this.drSubscription.unsubscribe();
    }
    if (this.afSubscription) {
      this.afSubscription.unsubscribe();
    }
    clearInterval(this.tickInterval);
  }

  getMyTem() {
    this.teamSubscription = this.api.leaderboardTeamInternalList().subscribe(
      data => {
        this.myTeam = data;
        this.redirectMe();
        this.myuser = data.me.user_id;
      }
    );
  }

  getMyLdrbrd() {
    this.ldbrdSubscription = this.api.leaderboardMe({
      page: 1, lastMonth: this.isLastMonth
    }).subscribe(
      data => {
        this.myLdrbrd = data;
      }
    );
  }

  getMyDriver() {
    const data = this.identityService.getStorageIdentity();
    this.mydrvr = data.nickname;

  }

  getMyLevel() {
    const data = this.identityService.getDriverMe();
    this.myAffilate = data;

  }

  redirectMe() {
    if (this.myTeam === null) {
      this.router.navigate(['/teams/join-teams']);
      this.notify.success('', 'first_join', 3000);
    }
  }

  changeSlide(){
    this.tickInterval = setInterval(() => { 
      if(this.TeamManagerSlide==1) this.TeamManagerSlide=2;
      else this.TeamManagerSlide=1;
    }, 16000);
  }

  manualChange(to_slide: number) {
    clearInterval(this.tickInterval);
    this.TeamManagerSlide=to_slide;
  }


  getRewards() {
    this.rapi.rewardsList()
      .subscribe(data => {
        this.teamreward = data.team_bonus;
      });
  }

  tipsSaved(myBool: boolean){
    this.editTips = myBool;
  }
}
