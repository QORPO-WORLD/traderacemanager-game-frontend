import { NextRaceV2 } from 'src/app/api/models';
import { DriversService, RacesService } from 'src/app/api/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-races-ad',
  templateUrl: './my-races-ad.component.html',
  styleUrls: ['./my-races-ad.component.scss'],
})
export class MyRacesAdComponent implements OnInit, OnDestroy {
  raceObser: Subscription;
  liveObserver: Subscription;
  favObserver: Subscription;
  updateFavCoinsObserver: Subscription;
  mnr = [];
  liveAllRacesData = [];
  mainClosed = false;
  currentIndex = 0;
  myGameBalance = 0;
  bestIndex: number;
  routeId: string;
  liveRacesData: any;
  selectedSum = 0;
  raceFilter = 'next';
  nextRaces: NextRaceV2[];
  refreshing = false;
  baseFavRaces = [
    { type: 'car_race_short_0', fav: false },
    { type: 'car_race_short_10', fav: false },
    { type: 'car_race_short_50', fav: false },
    { type: 'car_race_short_100', fav: false },
    { type: 'car_race_short_500', fav: false },
    { type: 'car_race_short_1000', fav: false },
    { type: 'car_race_24hrs_1000', fav: false },
    { type: 'wednesday_party_race_0', fav: false },
    { type: 'classic_tournament_0', fav: false },
    { type: 'classic_tournament_10', fav: false },
    { type: 'classic_tournament_100', fav: false },
    { type: 'classic_tournament_1000', fav: false },
    { type: 'golden_ticket_0', fav: false },
    { type: 'car_race_ioi_1', fav: false },
    { type: 'car_race_ioi_3', fav: false },
    { type: 'car_race_ioi_5', fav: false },
    { type: 'car_race_enduro_1', fav: false },
    { type: 'car_race_enduro_5', fav: false },
    { type: 'car_race_enduro_10', fav: false },
    { type: 'car_race_enduro_50', fav: false },
    { type: 'car_race_enduro_100', fav: false },
  ];
  myFavRaces = [];
  constructor(private api: RacesService, private actv: Router, private drvrsrvc: DriversService,
    private identityService: AuthService) {

    this.routeId = this.actv.url;
    const res = this.routeId.substring(0, 14);
    if (res === '/car/fuel-car/') {
      this.mainClosed = true;
    }
  }

  ngOnInit() {
    this.getCryptoStats();
    this.getAllNextRaces();
    this.getmyFavRaces();
  }

  ngOnDestroy() {
    if (this.raceObser) {
      this.raceObser.unsubscribe();
    }
    if (this.liveObserver) {
      this.liveObserver.unsubscribe();
    }
  }

  getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  }

  getMine() {
    this.raceObser = this.api.racesNextV2MineList().subscribe(data => {

      this.mnr = this.getUniqueListBy(data, 'race_hash');

      this.bestIndex = data.length - 1;
    });
  }


  nextCar() {
    if (this.bestIndex === this.currentIndex) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }
  prevCar() {
    if (this.currentIndex === 0) {
      this.currentIndex = 0;
    } else {
      this.currentIndex--;
    }
  }

  getLiveRaces() {
    this.liveObserver = this.api.racesCurrentMineList().subscribe(data => {
      const nedata: any = data;
      nedata.sort((a, b) =>
        a.bet_amount - b.bet_amount);
      const live = nedata.filter(word => word.is_canceled === false);
      this.liveRacesData = live;
    });
  }

  getAllLiveRaces() {
    this.liveObserver = this.api.racesCurrentV2List().subscribe(data => {
      const nedata: any = data;
      nedata.sort((a, b) =>
        a.bet_amount - b.bet_amount);

      const live = nedata.filter(word => word.is_canceled === false);
      this.liveAllRacesData = live;
      console.log(data);
    });
  }

  getAllNextRaces() {
    this.liveObserver = this.api.racesNextV2List().subscribe(data => {
      const nedata: any = data;
      nedata.sort((a, b) =>
        a.bet_amount - b.bet_amount);

      const live = nedata.filter(word => word.is_canceled === false);
      this.nextRaces = data;
      this.refreshing = false;
    });
  }

  watchMultiraces() {
    const tempArray = [];
    let routesParams = [];
    for (let x = 0; x < this.mnr.length; x++) {
      if (this.mnr[x].selected) {
        tempArray.push(this.mnr[x].race_hash);
      }
    }

    routesParams = tempArray.filter((data, index) => {
      return tempArray.indexOf(data) === index;
    });

    this.actv.navigate(['/race/watch-multiple-races/', { races: routesParams }]);


  }


  calcSelected() {
    const tempArray = [];
    let routesParams = [];
    for (let x = 0; x < this.mnr.length; x++) {
      if (this.mnr[x].selected) {
        tempArray.push(this.mnr[x].race_hash);
      }
    }

    routesParams = tempArray.filter((data, index) => {
      return tempArray.indexOf(data) === index;
    });

    this.selectedSum = routesParams.length;
  }

  timerCompleted() {
    if (this.refreshing === false) {
      this.refreshing = true;
      setTimeout(() => {
        this.getAllNextRaces();
      }), 2300;
    }
    else {
      this.refreshing = false;
    }

  }


  getmyFavRaces() {
    this.favObserver = this.drvrsrvc.driversFavRacesList().subscribe(data => {
      const nn: any = data;
      this.myFavRaces = nn;  
      this.resortFavRaces();
    });

  }

  resortFavRaces() {
    for (let x = 0; x < this.myFavRaces.length; x++) {

      for (let y = 0; y < this.baseFavRaces.length; y++) {

        if (this.baseFavRaces[y].type === this.myFavRaces[x]) {
          console.log(this.myFavRaces[x]);
          console.log(this.baseFavRaces[y].type);
          this.baseFavRaces[y].fav = true;
        }
        
      }
    }
  }

  getCryptoStats() {
    const data = this.identityService.getBalance();
    this.myGameBalance = data.game_wallet_ioi
  }

  updateFavRaces() {


    const data: any = [];
    for (let y = 0; y < this.baseFavRaces.length; y++) {
      if (this.baseFavRaces[y].fav === true) {
        data.push(this.baseFavRaces[y].type);
      }
    }

    this.updateFavCoinsObserver = this.drvrsrvc.driversFavRacesUpdate(
      { race_identifiers: data }
    ).subscribe(datax => {
      this.getmyFavRaces();
    });
  }


}
