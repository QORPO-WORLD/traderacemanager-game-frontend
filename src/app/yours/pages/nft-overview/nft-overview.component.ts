import { MyNftDetailComponent } from "./../my-nft-detail/my-nft-detail.component";
import { MyNftComponent } from "../my-nft/my-nft.component";
import { Component, OnInit } from "@angular/core";
import { Chart } from "angular-highcharts";
import { Options } from "highcharts";
import { CarsService, DriversService } from "../../../api/services";
import { AuthService } from "src/app/user/services/auth.service";
import { AuthService as ninja } from "./../../../user/services/auth.service";
import { BalanceService } from "./../../../common/services/balance.service";
import { bindCallback, Subscription } from "rxjs";
import { setInterval } from "timers";

@Component({
  selector: "app-nft-overview",
  templateUrl: "./nft-overview.component.html",
  styleUrls: ["./nft-overview.component.scss"],
})
export class NftOverviewComponent implements OnInit {
  myCarsObserver: Subscription;
  typeObserver: Subscription;
  display = window.innerWidth;
  allItems;
  allCars;
  racers;
  cars;
  tracks;
  teams;
  carAssets;
  totalStaking: number;
  special;
  donutChart;
  active = "car";
  donutChartOptions: Options = {
    chart: {
      type: "pie",
      plotShadow: false,

      backgroundColor: "none",
    },

    credits: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        innerSize: "88%",
        borderWidth: 7,
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
    protected api: CarsService,
    private auth: AuthService,
    private iservice: ninja
  ) {
    this.pushTo();
  }

  ngOnInit() {
    this.width();
    const data = this.iservice.getDriverMe();
    this.totalStaking = data.total_staking_rewards;
  }

  getMydriver() {
    const data = this.auth.getDriverMe();
  }
  calcItems() {
    this.allItems = this.allCars;
  }
  width() {
    this.display = window.innerWidth;
  }
  changeActive() {}
  pushTo() {
    this.myCarsObserver = this.api.carsMineList().subscribe((data) => {
      const objs: any = data;
      this.allCars = objs.cars.length;
      this.carAssets = data;

      this.racers = { name: "Racers", y: 23, color: "#00f0ff" };
      this.cars = {
        name: "Cars",
        y: this.allCars,
        color: "#fe173f",
      };
      this.tracks = { name: "Tracks", y: 40, color: "#A46100" };
      this.teams = { name: "Teams", y: 35, color: "#00ee91" };
      this.special = { name: "Special", y: 15, color: "gold" };
      this.donutChartOptions.series[0]["data"].push(this.racers);
      this.donutChartOptions.series[0]["data"].push(this.cars);
      this.donutChartOptions.series[0]["data"].push(this.tracks);
      this.donutChartOptions.series[0]["data"].push(this.teams);
      this.donutChartOptions.series[0]["data"].push(this.special);
      this.donutChart = new Chart(this.donutChartOptions);
      this.calcItems();
    });
  }
}
