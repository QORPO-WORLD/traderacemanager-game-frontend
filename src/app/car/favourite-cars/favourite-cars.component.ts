import { Subscription } from 'rxjs';
import { FavFuel } from './../../api/models/fav-fuel';
import { Car } from './../../api/models/car';
import { Component, OnInit } from '@angular/core';
import { DriversService, CarsService, LeaderboardService } from 'src/app/api/services';

@Component({
  selector: 'app-favourite-cars',
  templateUrl: './favourite-cars.component.html',
  styleUrls: ['./favourite-cars.component.scss'],
})
export class FavouriteCarsComponent implements OnInit {
  showEditModal = false;
  showCreateModal = false;
  showMySettings = false;
  editionIndex = 1;
  myCarsSorted = {
    car0: [],
    car1: [],
    car2: [],
    car3: [],
    car4: [],
    car5: [],
    car6: [],
    car7: [],
    car8: [],
    car9: [],
    car10: [],
    car11: [],
    car12: [],
    car13: [],
    car14: [],
    car15: [],
    car16: [],
    car17: [],
    car18: [],
    car19: [],
    car20: [],
    car21: [],
    car22: [],
    car23: [],
    car24: [],
    car25: [],
    car26: [],
    car27: [],
    car28: []
  };
  myCars = [];
  myFavFuels = [];
  createFavCar = false;
  editFavCar = false;
  favCarId: number;
  favEditCarId: number;
  editCar: any;
  teamreward: number;
  rsubsciption: Subscription;
  constructor(private api: DriversService, private carService: CarsService, private rapi: LeaderboardService) { }

  ngOnInit() {
    this.getCars();
    this.getRewards();
  }

  getCars() {
    this.carService.carsMineList().subscribe(
      data => {
        const datax: any = data;
        this.myCars = datax.cars;

        this.getFavCars();
      }
    );
  }

  getFavCars() {
    this.api.driversFavFuelList().subscribe(
      data => {
        const datax: any = data;
        this.myFavFuels = datax;

        this.doMagic();
      }
    );
  }

  doMagic() {
    for (let x = 0; x < this.myCars.length; x++) {
      for (let y = 0; y < this.myFavFuels.length; y++) {
        this.myFavFuels[y].custom_index = y;
        if (this.myCars[x].pk === this.myFavFuels[y].car) {
          this.myCars[x].favourite = true;
          this.myCars[x].custom_index = this.myFavFuels[y].custom_index;
          this.myCars[x].bet = this.myFavFuels[y].bet_coins;
        }
      }
    }
  }



  deleteCar(index: number) {
    const serializeRequest = this.myFavFuels;
    serializeRequest.splice(index, 1);

    this.api.driversFavFuelUpdate(serializeRequest).subscribe(data => {
      this.getCars();
    });
  }


  getRewards() {
    this.rsubsciption = this.rapi.leaderboardTeamInternalList()
      .subscribe(data => {
        this.teamreward = data.team_bonus;
      });
  }

}
