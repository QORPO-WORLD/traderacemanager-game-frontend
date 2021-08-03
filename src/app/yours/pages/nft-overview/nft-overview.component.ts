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
  ownedCars: any;
  ownedRacers: any;
  myCarsObserver: Subscription;
  typeObserver: Subscription;
  teamSubscription: Subscription;
  display: any = window.innerWidth;
  allItemsBalance: number;
  allItems: any;
  allCars: any;
  allRacers: any;
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
  myAssets: any;
  products: Array<object> = [
    {
      price: 60,
      id: 60,
      collection: "Special",
      name: "TESLA",
      image: "car60",
      type: "car",
      rank: "low",
      amount: [],
      alt: "nft car Tesla",
    },
    //bronze
    {
      id: 20,
      position: 0,
      free: 6000,
      collection: "Common",
      name: "RHINO",
      price: 600,
      image: "car1",
      gif: "car1-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car rhino",
    },
    {
      id: 21,
      position: 1,
      free: 12000,
      collection: "Common",
      name: "PANTHER",
      price: 600,
      image: "car2",
      gif: "car2-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car panther",
    },
    {
      id: 22,
      position: 2,
      free: 24000,
      collection: "Common",
      name: "ONYX",
      price: 600,
      image: "car3",
      gif: "car3-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car onyx",
    },
    {
      id: 23,
      position: 3,
      free: 48000,
      collection: "Common",
      name: "ZANDER",
      price: 600,
      image: "car4",
      gif: "car4-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car zander",
    },
    {
      id: 24,
      position: 4,
      free: 96000,
      collection: "Common",
      name: "CYBORG",
      price: 600,
      image: "car5",
      type: "car",
      gif: "car5-animation",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car cyborg",
    },
    {
      id: 25,
      position: 5,
      free: 192000,
      collection: "Common",
      name: "VULCANIC",
      price: 600,
      image: "car6",
      gif: "car6-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 26,
      position: 24,
      collection: "Common rare",
      name: "LUNA",
      price: 3600,
      image: "car25",
      gif: "car25-animation",
      type: "car",
      rare: true,
      ability1: 0.6,
      ability2: 6,
      amount: [],
      alt: "nft car luna",
    },
    //silver
    {
      id: 27,
      position: 6,
      free: 288000,
      collection: "Super",
      name: "DORIAN",
      price: 1000,
      image: "car7",
      gif: "car7-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car dorian",
    },
    {
      id: 28,
      position: 7,
      free: 432000,
      collection: "Super",
      name: "PANTHER",
      price: 1000,
      image: "car8",
      gif: "car8-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car panther",
    },
    {
      id: 29,
      position: 8,
      free: 648000,
      collection: "Super",
      name: "ONYX",
      price: 1000,
      image: "car9",
      gif: "car9-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car onyx",
    },
    {
      id: 30,
      position: 9,
      free: 972000,
      collection: "Super",
      name: "ZANDER",
      price: 1000,
      image: "car10",
      gif: "car10-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car zander",
    },
    {
      id: 31,
      position: 10,
      free: 1458000,
      collection: "Super",
      name: "PYTHON",
      price: 1000,
      image: "car11",
      gif: "car11-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car python",
    },
    {
      id: 32,
      position: 11,
      free: 2187000,
      collection: "Super",
      name: "VULCANIC",
      price: 1000,
      image: "car12",
      gif: "car12-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 33,
      position: 25,
      collection: "Super rare",
      name: "SILVER KNIGHT",
      price: 6000,
      image: "car26",
      gif: "car26-animation",
      type: "car",
      rare: true,
      ability1: 1.98,
      ability2: 12,
      amount: [],
      alt: "nft car silver knight",
    },
    //gold
    {
      id: 34,
      position: 12,
      free: 3000000,
      collection: "Epic",
      name: "CYBORG",
      price: 1600,
      image: "car13",
      gif: "car13-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car cyborg",
    },
    {
      id: 35,
      position: 13,
      free: 3600000,
      collection: "Epic",
      name: "RHINO",
      price: 1600,
      image: "car14",
      gif: "car14-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car rhino",
    },
    {
      id: 36,
      position: 14,
      free: 4320000,
      collection: "Epic",
      name: "HYPER",
      price: 1600,
      image: "car15",
      gif: "car15-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car hyper",
    },
    {
      id: 37,
      position: 15,
      free: 5184000,
      collection: "Epic",
      name: "BULL",
      price: 1600,
      image: "car16",
      gif: "car16-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car bull",
    },
    {
      id: 38,
      position: 16,
      free: 6220000,
      collection: "Epic",
      name: "PYTHON",
      price: 1600,
      image: "car17",
      gif: "car17-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car python",
    },
    {
      id: 39,
      position: 17,
      free: 7465000,
      collection: "Epic",
      name: "HITMAN",
      price: 1600,
      image: "car18",
      gif: "car18-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car hitman",
    },
    {
      id: 40,
      position: 26,
      collection: "Epic rare",
      name: "MIDAS",
      price: 9600,
      image: "car27",
      gif: "car27-animation",
      type: "car",
      rare: true,
      ability1: 4.74,
      ability2: 18,
      amount: [],
      alt: "nft car midas",
    },
    //platinum
    {
      id: 41,
      position: 18,
      free: 8200000,
      collection: "Legendary",
      name: "HYPER",
      price: 2600,
      image: "car19",
      gif: "car19-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car hyper",
    },
    {
      id: 42,
      position: 19,
      free: 9000000,
      collection: "Legendary",
      name: "DORIAN",
      price: 2600,
      image: "car20",
      gif: "car20-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car dorian",
    },
    {
      id: 43,
      position: 20,
      free: 9900000,
      collection: "Legendary",
      name: "VULCANIC",
      price: 2600,
      image: "car21",
      gif: "car21-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 44,
      position: 21,
      free: 10890000,
      collection: "Legendary",
      name: "BULL",
      price: 2600,
      image: "car22",
      gif: "car22-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car bull",
    },
    {
      id: 45,
      position: 22,
      free: 12000000,
      collection: "Legendary",
      name: "KNOCKOUT",
      price: 2600,
      image: "car23",
      gif: "car23-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car knockout",
    },
    {
      id: 46,
      position: 23,
      free: 13200000,
      collection: "Legendary",
      name: "LARA",
      price: 2600,
      image: "car24",
      gif: "car24-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car lara",
    },
    {
      id: 47,
      position: 27,
      collection: "Legendary rare",
      name: "BLUE STORM",
      price: 15600,
      image: "car28",
      gif: "car28-animation",
      type: "car",
      rare: true,
      ability1: 10.25,
      ability2: 24,
      amount: [],
      alt: "nft car blue storm",
    },

    //RACERS
    {
      id: 1,
      collection: "Super",
      name: "Axle",
      price: 100,
      image: "white-trm",
      gif: "white-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Axle",
    },

    {
      id: 2,
      collection: "Super",
      name: "Flash",
      price: 100,
      image: "red-trm",
      gif: "red-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Flash",
    },
    {
      id: 3,
      collection: "Super",
      name: "Octane",
      price: 100,
      image: "blue-trm",
      gif: "blue-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Octane",
    },
    {
      id: 4,
      collection: "Super",
      name: "Punisher",
      price: 100,
      image: "black-trm",
      gif: "black-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Punisher",
    },
    {
      id: 5,
      collection: "Epic",
      name: "Lady Rich",
      price: 1000,
      image: "lady-rich",
      gif: "lady-rich-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Lady Rich",
    },
    {
      id: 6,
      collection: "Epic",
      name: "Rich Jr.",
      price: 1000,
      image: "bad-boy",
      gif: "bad-boy-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Rich Junior",
    },
    {
      id: 7,
      collection: "Epic",
      name: "Mrs. Rich",
      price: 1000,
      image: "mrs-rich",
      gif: "mrs-rich-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Mrs. Rich",
    },
    {
      id: 8,
      collection: "Legendary",
      name: "Mr. Rich",
      price: 10000,
      image: "mr-rich",
      gif: "mr-rich-animation",
      type: "racer",
      ability1: "2%",
      ability2: "20%",
      ability3: "18% APY staking",
      rank: "height",
      amount: [],
      alt: "nft racer mr. rich",
    },
  ];
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

  driverbalances: any;

  constructor(
    protected apit: TeamsService,
    protected api: CarsService,
    private lead: LeaderboardService,
    private auth: AuthService,
    private iservice: ninja,
    private identityService: AuthService
  ) {
    this.getMyAssets();
    this.getMyTeam();
    this.getMyTem();
    this.pushTo();
    this.accountInfo = this.iservice.getDriverMe();
    this.totalStaking = this.accountInfo.total_staking_rewards;
  }

  ngOnInit() {
    console.log(this.products);
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
          this.carAssets.garage_value +
          this.carAssets.racers_value +
          this.myTeamAllData.team_value;
      } else {
        this.allItemsBalance =
          this.carAssets.garage_value + this.carAssets.racers_value;
      }
    }, 1000);
  }

  calcItems() {
    setTimeout(() => {
      this.allItems = this.allCars + this.teamsCount + this.allRacers;
    }, 1000);
  }
  width() {
    this.display = window.innerWidth;
  }

  setInterval() {
    this.interval = window.setInterval(() => {
      if (this.teamsCount > 0) {
        if (this.active <= 3) {
          this.active++;
        }
        if (this.active > 3) {
          this.active = 1;
        }
      }
      if (this.teamsCount === 0) {
        if (this.active <= 2) {
          this.active++;
        }
        if (this.active > 2) {
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
      this.myAssets = data;
      this.allCars = this.myAssets.total_cars - 1;
      this.allRacers = this.myAssets.total_racers;
      this.carAssets = data;
      this.isOwner();
      this.teams = { name: "Racers", y: 0, color: "#00f0ff" };
      this.racers = {
        name: "Racers",
        y: this.myAssets.total_racers,
        color: "#00f0ff",
      };
      this.cars = {
        name: "Cars",
        y: this.myAssets.total_cars,
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
    this.driverbalances = this.identityService.getBalance();
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
  filterHighestValue() {
    //highest price car
    const maxValueOfCar = Math.max(...this.ownedCars.map((o) => o.price), 0);

    this.ownedCars = this.ownedCars.filter(
      (item) => item["price"] === maxValueOfCar
    );

    //highest price racer
    const maxValueOfRacer = Math.max(
      ...this.ownedRacers.map((o) => o.price),
      0
    );

    this.ownedRacers = this.ownedRacers.filter(
      (item) => item["price"] === maxValueOfRacer
    );
  }
  filterMyAssets() {
    this.ownedCars = this.products.filter(
      (item) => item["amount"].length > 0 && item["type"] === "car"
    );
    this.ownedRacers = this.products.filter(
      (item) => item["amount"].length > 0 && item["type"] === "racer"
    );
  }

  getMyAssets() {
    this.myCarsObserver = this.api.carsMineList().subscribe((data) => {
      if (data.length === 0) {
        null;
      } else {
        const objs: any = data;
        for (let x = 0; x < objs.cars.length; x++) {
          if (objs.cars[x].car_id === 60) {
            this.products[0]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 1) {
            this.products[1]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 2) {
            this.products[2]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 3) {
            this.products[3]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 4) {
            this.products[4]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 5) {
            this.products[5]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 6) {
            this.products[6]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 7) {
            this.products[8]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 8) {
            this.products[9]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 9) {
            this.products[10]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 10) {
            this.products[11]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 11) {
            this.products[12]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 12) {
            this.products[13]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 13) {
            this.products[15]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 14) {
            this.products[16]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 15) {
            this.products[17]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 16) {
            this.products[18]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 17) {
            this.products[19]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 18) {
            this.products[20]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 19) {
            this.products[22]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 20) {
            this.products[23]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 21) {
            this.products[24]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 22) {
            this.products[25]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 23) {
            this.products[26]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 24) {
            this.products[27]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 25) {
            this.products[7]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 26) {
            this.products[14]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 27) {
            this.products[21]["amount"].push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 28) {
            this.products[28]["amount"].push(objs.cars[x]);
          }
        }

        for (let x = 0; x < objs.racers.length; x++) {
          if (objs.racers[x].car_id === 1) {
            this.products[29]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 2) {
            this.products[30]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 3) {
            this.products[31]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 4) {
            this.products[32]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 5) {
            this.products[33]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 6) {
            this.products[34]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 7) {
            this.products[35]["amount"].push(objs.cars[x]);
          }
          if (objs.racers[x].car_id === 8) {
            this.products[36]["amount"].push(objs.cars[x]);
          }
        }
      }
      this.filterMyAssets();
      this.filterHighestValue();
    });
  }
}
