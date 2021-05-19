import { AuthService } from 'src/app/user/services/auth.service';
import { PlayerLeaderboard } from './../../api/models/player-leaderboard';
import { InternalTeamLeaderboard } from './../../api/models/internal-team-leaderboard';
import { AffiliatesService, DriversService, LeaderboardService, RewardsService } from 'src/app/api/services';
import { NotifiqService } from './../../common/services/notifiq.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TeamsService } from '../../api/services/teams.service';
import { Chart } from 'chart.js';
import { DateTime, Settings } from 'luxon';
@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss'],
})
export class MyTeamComponent implements OnInit, OnDestroy {
  tickInterval: any;
  TeamManagerSlide = 1;
  activeRate = 1;
  teamSubscription: Subscription;
  ldbrdSubscription: Subscription;
  drSubscription: Subscription;
  afSubscription: Subscription;
  graphType = 'Turnover';
  myTeam: any;
  myLdrbrd: any;
  is24race = false;
  isLastMonth = false;
  showDayTipModal = false;
  editTips = true;
  mydrvr: any;
  teamreward: any;
  myAffilate: any;
  myTeamData: any;
  myTeamName: any;
  myTeamStats: any;
  bestRacer: any;
  myuser: any;
  teams: any;
  isOwner = true;
  teamColor: string;
  @ViewChild('showTip') showTip: any;
  teamId: number;
  managers = [];
  selectedmanager = 0;
  myId: string;
  meManager = false;
  meRated = false;
  myRating: number;
  teamChart = [];
  turnoverData = [10, 15, 20, 10, 13, 2, 5];
  chart: any;
  chartColors = {
    red: '#52c0e4',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };
  color = Chart.helpers.color;
  config: any;
  colorNames = Object.keys(this.chartColors);
  constructor(private api: LeaderboardService, private drvrsrvc: DriversService, protected teams_service: TeamsService, private affisrvc: AffiliatesService,
    private router: Router, protected notify: NotifiqService, private identityService: AuthService, private rapi: RewardsService) { }

  ngOnInit() {
    this.getMyTeam();
    this.getMyTem();
    this.getMyLdrbrd();
    this.getMyDriver();
    this.getMyLevel();
    this.getRewards();
    this.changeSlide();
    this.getTeams();
    this.getTeamHistory();
    this.getChart();
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

  getChart() {
    this.chart = new Chart({
      chart: {
        type: 'areaspline',
        backgroundColor: null
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      legend: {
        enabled: false
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      tooltip: {
        shared: true,
        valueSuffix: ' TRX'
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0
        },
        series: {
          enableMouseTracking: false,
          marker: {
            enabled: false
          },
          states: {
            hover: {
              enabled: false
            }
          }
        }
      },
      series: [
        {
          name: '',
          type: 'areaspline',
          data: [this.turnoverData]
        }
      ]
    });
  }

  getMyTem() {
    this.teamSubscription = this.api.leaderboardTeamInternalList().subscribe(
      datax => {
        const data: any = datax;
        this.myTeam = data;
        this.myuser = data.me.user_id;
        this.bestRacer = this.myTeam.top10[0];

        if (data.manager_user_id === this.myTeamData.id) {
          this.meManager = true;
        }
        this.teamColor = data.color;
        data.last_manager_like_value ? this.activeRate = data.last_manager_like_value : null;
        this.recognizeOwnerMe();
      }
    );
  }


  getMyTeam() {
    const data = this.identityService.getDriverMe();
    this.myTeamName = data.team;
    this.myTeamData = data;
    const datax = this.identityService.getLeaderboardMe();
    this.teamId = datax.team_id;
    this.redirectMe();
  }

  getTeams() {
    this.teams_service.teamsList().subscribe(data => {
      const newdata = data.results;
      const resort = newdata.sort((a, b) => {
        return b.dedicated_team_bonus_pool - a.dedicated_team_bonus_pool;
      });
      this.teams = data.results;
      this.myTeamStats = this.teams.find(x => x.name === this.myTeamName);
    });
  }

  becomeManager(id: number) {

    this.teams_service.becomeManager(id, { reason: 'reason is null' }).subscribe
      (data => {
        this.getTeams();
      });
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
    //this.myRating = data.
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

  changeSlide() {
    this.tickInterval = setInterval(() => {
      if (this.isOwner === true && this.managers.length > 0) {
        if (this.TeamManagerSlide === 1) { this.TeamManagerSlide = 2; }
        else { this.TeamManagerSlide = 1; }
      }
      else if (this.managers.length < 1 && this.isOwner === true) {
        this.TeamManagerSlide = 1;
      }
      else {
        if (this.TeamManagerSlide === 1) { this.TeamManagerSlide = 2; }
        else { this.TeamManagerSlide = 1; }
      }
    }, 10000);
  }

  manualChange(to_slide: number) {
    clearInterval(this.tickInterval);
    this.TeamManagerSlide = to_slide;
  }


  getRewards() {
    this.rapi.rewardsList()
      .subscribe(data => {
        this.teamreward = data.team_bonus;
      });
  }

  tipsSaved(myBool: boolean) {
    this.showDayTipModal = myBool;
    this.showTip.getMyLeaderboard();
  }

  getManagerRequests() {
    this.teamSubscription = this.teams_service.getManagerRequests(this.teamId).subscribe(data => {
      console.log(data);
      this.managers = data;
    });
  }


  putManagerRequests(id: number, accept: boolean) {
    this.teamSubscription = this.teams_service.putManagerRequests({
      requestId: id,
      acceptRequest: accept
    }).subscribe(data => {
      this.getManagerRequests();
      this.getMyTeam();
      this.getMyTem();

    });
  }

  suspendManager() {
    this.teamSubscription = this.teams_service.suspendManager(this.teamId).subscribe(data => {
      this.getMyTem();
    });
  }

  recognizeOwnerMe() {
    let sum = 0;
    for (let x = 0; x < this.myTeam.owners.length; x++) {

      if (this.myTeamData.id === this.myTeam.owners[x].user_id) {
        sum = sum + 1;
      }
    }

    if (sum > 0) {
      this.isOwner = true;
      this.getManagerRequests();
    } else {
      this.isOwner = false;
    }
  }


  rateManager() {
    if (this.meRated === false) {
      this.teamSubscription = this.teams_service.rateManager({ 'stars': this.activeRate }).subscribe(
        data => {
          this.meRated = true;
          this.identityService.updateDriverMe();
          setTimeout(() => {
            this.getMyDriver();
          }, 200);
        }
      )
    }
  }

  getTeamHistory() {
    this.teamSubscription = this.teams_service.getTeamHistory().subscribe(data => {
      this.teamChart = data;
      this.config = {
        type: 'line',
        data: {
          datasets: [{
            label: 'Team turnover',
            backgroundColor: this.color(this.chartColors.red).alpha(0.5).rgbString(),
            borderColor: this.chartColors.red,
            fill: false,
            data: []
          }]
        },
        options: {
          scales: {
            x: {
              
            },
            y: {
              title: {
                display: true,
                text: 'value'
              }
            }
          },
          interaction: {
            intersect: false
          },
          plugins: {
            title: {
              display: true,
              text: 'Line chart (hotizontal scroll) sample'
            }
          }
        }
      };
      this.chart = new Chart('canvas', this.config);
      for (let x = 0; x < data.length; x++) {
        this.add(data[x].from, data[x].turnover);
      }
      
    });
  }

  add(curdate, curval) {
    console.log(curval, curdate);
    if (this.chart) {

      this.chart.data.datasets[0].data.push(curval);
      this.chart.data.labels.push(new Date(curdate).toLocaleDateString('en-US'));
      /*      if (this.chart.data.datasets[0].data.length > 20) {
              this.chart.data.datasets[0].data.shift();
              this.chart.data.labels.shift();
            }
        */
      console.log(this.chart.data.datasets[0].data);
      this.chart.update();

    }

  }


}
