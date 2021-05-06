import { TeamsService } from "src/app/api/services";

import { Component, OnInit } from "@angular/core";
import { Chart } from "angular-highcharts";
import { Options } from "highcharts";
import { CarsService, DriversService } from "../../../api/services";
import { AuthService } from "src/app/user/services/auth.service";
import { AuthService as ninja } from "./../../../user/services/auth.service";
import { BalanceService } from "./../../../common/services/balance.service";
import { bindCallback, Subscription } from "rxjs";
import { LeaderboardService } from "src/app/api/services";

@Component({
  selector: "app-nft-overview",
  templateUrl: "./nft-overview.component.html",
  styleUrls: ["./nft-overview.component.scss"],
})
export class NftOverviewComponent implements OnInit {
  myCarsObserver: Subscription;
  typeObserver: Subscription;
  teamSubscription: Subscription;
  display: any = window.innerWidth;
  allItemsBalance: number;
  allItems: any;
  allCars: any;
  racers: any;
  cars: any;
  tracks: any;
  teamsCount: number;
  teams: any;
  allTeams: any;
  carAssets: any;
  myTeamAllData: any;
  totalStaking: number;
  special: any;
  donutChart: any;
  accountInfo: any;
  active: number = 1;
  interval: any;
  myTeam: string;
  myTeamData: any;
  donutChartOptions: Options = {
    chart: {
      type: "pie",
      plotShadow: false,
      className: "my-donut-chart",

      backgroundColor: "none",
    },

    credits: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        innerSize: "88%",
        borderWidth: 4,
        borderColor: "#222222",

        dataLabels: {
          connectorWidth: 0,
          enabled: false,
        },
      },
    },
    title: {
      text: "",
    },
    legend: {
      enabled: false,
    },

    series: [
      {
        name: "Amount:",
        type: "pie",
        data: [],
      },
    ],
  };

  constructor(
    protected apit: TeamsService,
    protected api: CarsService,
    private lead: LeaderboardService,
    private auth: AuthService,
    private iservice: ninja,
    private identityService: AuthService
  ) {
    this.getMyTeam();
    this.getMyTem();
    this.pushTo();
    this.accountInfo = this.iservice.getDriverMe();
    this.totalStaking = this.accountInfo.total_staking_rewards;
  }

  ngOnInit() {
    this.changeActive(1);
    this.width();
  }

  getMydriver() {
    this.accountInfo = this.auth.getDriverMe();
  }
  calcItemsBalance() {
    setTimeout(() => {
      if (this.teamsCount > 0) {
        this.allItemsBalance =
          this.carAssets.garage_value + this.myTeamAllData.team_value;
      } else {
        this.allItemsBalance = this.carAssets.garage_value;
      }
    }, 1000);
  }
  calcItems() {
    setTimeout(() => {
      this.allItems = this.allCars + this.teamsCount;
    }, 1000);
  }
  width() {
    this.display = window.innerWidth;
  }

  setInterval() {
    this.interval = window.setInterval(() => {
      if (this.teamsCount > 0) {
        if (this.active <= 4) {
          this.active++;
        }
        if (this.active > 4) {
          this.active = 1;
        }
      }
      if (this.teamsCount === 0) {
        if (this.active <= 3) {
          this.active++;
        }
        if (this.active > 3) {
          this.active = 1;
        }
      }
    }, 5000);
  }
  changeActive(p) {
    this.active = p;
    this.clearActiveInterval();
    this.setInterval();
  }
  clearActiveInterval() {
    clearInterval(this.interval);
  }
  pushTo() {
    this.myCarsObserver = this.api.carsMineList().subscribe((data) => {
      const objs: any = data;
      this.allCars = objs.cars.length;
      this.carAssets = data;
      this.isOwner();
      this.teams = this.racers = { name: "Racers", y: 0, color: "#00f0ff" };
      this.cars = {
        name: "Cars",
        y: this.allCars,
        color: "#fe173f",
      };
      this.tracks = { name: "Tracks", y: 0, color: "#A46100" };
      this.teams = { name: "Teams", y: this.teamsCount, color: "#00ee91" };
      this.special = { name: "Special", y: 0, color: "gold" };
      this.donutChartOptions.series[0]["data"].push(this.racers);
      this.donutChartOptions.series[0]["data"].push(this.cars);
      this.donutChartOptions.series[0]["data"].push(this.tracks);
      this.donutChartOptions.series[0]["data"].push(this.teams);
      this.donutChartOptions.series[0]["data"].push(this.special);
      this.donutChart = new Chart(this.donutChartOptions);
      this.calcItemsBalance();
      this.calcItems();
    });
  }
  isOwner() {
    if (this.myTeamData.is_owner === true) {
      this.teamsCount = 1;
    } else {
      this.teamsCount = 0;
    }
  }
  getTeams() {
    this.apit.teamsList().subscribe((data) => {
      const newdata = data.results;
      const resort = newdata.sort((a, b) => {
        return b.dedicated_team_bonus_pool - a.dedicated_team_bonus_pool;
      });

      this.allTeams = data.results;
    });
  }

  getMyTeam() {
    const data = this.identityService.getDriverMe();
    this.myTeam = data.team;
    this.getTeams();
    this.myTeamData = data;
  }
  getMyTem() {
    this.teamSubscription = this.lead
      .leaderboardTeamInternalList()
      .subscribe((datax) => {
        const data: any = datax;
        this.myTeamAllData = data;
      });
  }
}
