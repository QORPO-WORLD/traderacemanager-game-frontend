import { NotifyService } from './../../common/services/notify.service';
import { AuthService } from './../../user/services/auth.service';
import { BalanceService } from './../../common/services/balance.service';
import { Subscription } from 'rxjs';
import { NotifiqService } from './../../common/services/notifiq.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarsService, DriversService } from '../../api/services';

@Component({
  selector: 'app-buy-cars',
  templateUrl: './buy-cars.component.html',
  styleUrls: ['./buy-cars.component.scss']
})
export class BuyCarsComponent implements OnInit, OnDestroy {
  cars: any;
  buyedCar: any;
  editionIndex = 1;
  myCars: any;
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
  myCar: any;
  ed1Cars = 0;
  ed2Cars = 0;
  ed3Cars = 0;
  ed4Cars = 0;
  dataReady = false;
  actualCarIndex = 0;
  bestIndex = 0;
  availableCars = [];
  remainingCars = [];
  pageOpen = true;
  carsSorted = [];
  myCarsObserver: Subscription;
  vrecoObserver: Subscription;
  myDriverOldObserver: Subscription;
  balanceOldObserver: Subscription;
  sortingDone = false;
  myDriverOld: any;
  slideStylePx = 0;
  editionStylePx = 0;
  editionLvlIndex = 0;
  luckyCar: any;
  myBalance: any;
  carSum: string;
  unlocked: number;
  gotRare = false;
  constructor(protected api: CarsService, private notifiq: NotifiqService, private drvrsrvc: DriversService,
    private balanceService: BalanceService, private identityService: AuthService, private notify: NotifyService) {
    this.getMyCars();
    this.getShowroomCars();
  }

  get balanceHasChanged(): boolean {
    return this.balanceService.balanceChanged;

  }

  notifyChangedBalance() {
    this.identityService.updateBalance();
    this.balanceService.balanceHasbeenChanged();
  }

  ngOnInit(): void {

    const that = this;
    this.getMyOldDriver();
    this.getMyBalance();
  }

  ngOnDestroy() {
    this.pageOpen = false;
    if (this.myCarsObserver) {
      this.myCarsObserver.unsubscribe();
    }
    if (this.myDriverOldObserver) {
      this.myDriverOldObserver.unsubscribe();
    }
    if (this.vrecoObserver) {
      this.vrecoObserver.unsubscribe();
    }
    if (this.balanceOldObserver) {
      this.balanceOldObserver.unsubscribe();
    }
  }

  buyCarFromGarage(index: string) {
    this.api.carsBuyList(index).
      subscribe(datax => {
        const data: any = datax;
        setTimeout(() => {

          this.notifyChangedBalance();
          // this.notifiq.success('great', 'bought_car');
          this.notify.error('You have bought a new car!');
          this.getMyCars();
          this.getShowroomCars();
          if (data.unlocked_limited_car > 0) {
            this.unlocked = data.unlocked_limited_car;
            this.gotRare = true;
          }
        }, 1000);
      });
  }


  getMyCars() {
    this.clearSortedCars();
    this.myCarsObserver = this.api.carsMineList().subscribe(data => {
      if (data.length === 0) {
        this.getFreeCar();
      } else {
        const objs: any = data;
        for (let x = 0; x < objs.cars.length; x++) {
          if (objs.cars[x].car_id === 0) {
            this.myCarsSorted.car0.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 1) {
            this.myCarsSorted.car1.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 2) {
            this.myCarsSorted.car2.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 3) {
            this.myCarsSorted.car3.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 4) {
            this.myCarsSorted.car4.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 5) {
            this.myCarsSorted.car5.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 6) {
            this.myCarsSorted.car6.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 7) {
            this.myCarsSorted.car7.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 8) {
            this.myCarsSorted.car8.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 9) {
            this.myCarsSorted.car9.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 10) {
            this.myCarsSorted.car10.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 11) {
            this.myCarsSorted.car11.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 12) {
            this.myCarsSorted.car12.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 13) {
            this.myCarsSorted.car13.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 14) {
            this.myCarsSorted.car14.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 15) {
            this.myCarsSorted.car15.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 16) {
            this.myCarsSorted.car16.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 17) {
            this.myCarsSorted.car17.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 18) {
            this.myCarsSorted.car18.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 19) {
            this.myCarsSorted.car19.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 20) {
            this.myCarsSorted.car20.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 21) {
            this.myCarsSorted.car21.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 22) {
            this.myCarsSorted.car22.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 23) {
            this.myCarsSorted.car23.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 24) {
            this.myCarsSorted.car24.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 25) {
            this.myCarsSorted.car25.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 26) {
            this.myCarsSorted.car26.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 27) {
            this.myCarsSorted.car27.push(objs.cars[x]);
          }
          if (objs.cars[x].car_id === 28) {
            this.myCarsSorted.car28.push(objs.cars[x]);
          }
        }
        this.calcEditionNum();
        this.selectCar(objs);
        this.sortingDone = true;
      }
    });
  }

  clearSortedCars() {
    this.myCarsSorted.car0.length = 0;
    this.myCarsSorted.car1.length = 0;
    this.myCarsSorted.car2.length = 0;
    this.myCarsSorted.car3.length = 0;
    this.myCarsSorted.car4.length = 0;
    this.myCarsSorted.car5.length = 0;
    this.myCarsSorted.car6.length = 0;
    this.myCarsSorted.car7.length = 0;
    this.myCarsSorted.car8.length = 0;
    this.myCarsSorted.car9.length = 0;
    this.myCarsSorted.car10.length = 0;
    this.myCarsSorted.car11.length = 0;
    this.myCarsSorted.car12.length = 0;
    this.myCarsSorted.car13.length = 0;
    this.myCarsSorted.car14.length = 0;
    this.myCarsSorted.car15.length = 0;
    this.myCarsSorted.car16.length = 0;
    this.myCarsSorted.car17.length = 0;
    this.myCarsSorted.car18.length = 0;
    this.myCarsSorted.car19.length = 0;
    this.myCarsSorted.car20.length = 0;
    this.myCarsSorted.car21.length = 0;
    this.myCarsSorted.car22.length = 0;
    this.myCarsSorted.car23.length = 0;
    this.myCarsSorted.car24.length = 0;
    this.myCarsSorted.car25.length = 0;
    this.myCarsSorted.car26.length = 0;
    this.myCarsSorted.car27.length = 0;
    this.myCarsSorted.car28.length = 0;
  }

  calcEditionNum(){
    if (this.myCarsSorted.car1.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car2.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car3.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car4.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car5.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car6.length > 0) {
      this.ed1Cars += 1;
    }
    if (this.myCarsSorted.car7.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car8.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car9.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car10.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car11.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car12.length > 0) {
      this.ed2Cars += 1;
    }
    if (this.myCarsSorted.car13.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car14.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car15.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car16.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car17.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car18.length > 0) {
      this.ed3Cars += 1;
    }
    if (this.myCarsSorted.car19.length > 0) {
      this.ed4Cars += 1;
    }
    if (this.myCarsSorted.car20.length > 0) {
      this.ed4Cars += 1;
    }
    if (this.myCarsSorted.car21.length > 0) {
      this.ed4Cars += 1;
    }
    if (this.myCarsSorted.car22.length > 0) {
      this.ed4Cars += 1;
    }
    if (this.myCarsSorted.car23.length > 0) {
      this.ed4Cars += 1;
    }
    if (this.myCarsSorted.car24.length > 0) {
      this.ed4Cars += 1;
    }
  }

  selectCar(data) {
    this.bestIndex = data.cars.length - 1;
    this.myCars = data.cars;
    this.myCar = this.myCars[this.bestIndex];
    this.dataReady = true;
  }

  selectMyCarSPecial(index) {
    this.myCar = this.myCars[index];
  }

  getFreeCar() {
    this.api.carsBuyList('0').subscribe(mycar => {
      this.getMyCars();
    });
  }
  nextEdition() {
    this.editionLvlIndex++;
    if (this.editionLvlIndex > 3) {
      this.editionLvlIndex = 0;
    }
    this.editionStylePx = this.editionLvlIndex * 650;
  }

  prevEdition() {
    this.editionLvlIndex -= 1;
    if (this.editionLvlIndex < 0) {
      this.editionLvlIndex = 3;
    }
    this.editionStylePx = this.editionLvlIndex * 650;
  }

  getEdition() {
    this.editionStylePx = this.editionLvlIndex * 650;

  }

  getShowroomCars() {
    this.api.carsShowroomList().subscribe(data => {
      const objs: any = data;
      this.remainingCars = objs.remaining_cars_by_tier;
      this.carSum = objs.remaining_cars.toString();
      this.availableCars = objs.cars;
    });
  }


  getMyOldDriver() {

    this.myDriverOld = this.identityService.getDriverMe();

  }


  checkSum(val: number, by: number) {
    if (val >= by) {
      return 100;
    } else {
      return (val / by) * 100;
    }
  }

  getMyBalance() {
    const data = this.identityService.driverBalance;
    this.myBalance = data;
  }

  resetLucky() {
    this.luckyCar = null;
  }

}

