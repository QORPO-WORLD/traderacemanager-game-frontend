import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CarsService } from "src/app/api/services";
import { NotifiqService } from "src/app/common/services/notifiq.service";
import { AuthService } from "src/app/user/services/auth.service";

@Component({
  selector: "app-my-cars",
  templateUrl: "./my-cars.component.html",
  styleUrls: ["./my-cars.component.scss"],
})
export class MyCarsComponent implements OnInit, OnDestroy {
  myCars = [];
  carIndex = 1;
  editionIndex = 1;
  shiftIndex = 0;
  cars: any;
  boughtCar: any;
  owning: boolean;
  hasNoCars = false;
  i = 0;

  carsNames: Array<object> = [
    //bronze
    {
      name: "RHINO",
    },
    {
      name: "PANTHER",
    },
    {
      name: "ONYX",
    },
    {
      name: "ZANDER",
    },
    {
      name: "CYBORG",
    },
    {
      name: "VULCANIC",
    },
    {
      name: "LUNA",
    },
    //silver
    {
      name: "DORIAN",
    },
    {
      name: "PANTHER",
    },
    {
      name: "ONYX",
    },
    {
      name: "ZANDER",
    },
    {
      name: "PYTHON",
    },
    {
      name: "VULCANIC",
    },
    {
      name: "SILVER KNIGHT",
    },
    //gold
    {
      name: "CYBORG",
    },
    {
      name: "RHINO",
    },
    {
      name: "HYPER",
    },
    {
      name: "BULL",
    },
    {
      name: "PYTHON",
    },
    {
      name: "HITMAN",
    },
    {
      name: "MIDAS",
    },
    //platinum
    {
      name: "HYPER",
    },
    {
      name: "DORIAN",
    },
    {
      name: "VULCANIC",
    },
    {
      name: "BULL",
    },
    {
      name: "KNOCKOUT",
    },
    {
      name: "LARA",
    },
    {
      name: "BLUE STORM",
    },
  ];
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
    car28: [],
  };
  myCar: any;
  dataReady = false;
  actualCarIndex = 0;
  bestIndex = 0;
  availableCars = [];
  pageOpen = true;
  carsSorted = [];
  myCarsObserver: Subscription;
  myDriverOldObserver: Subscription;
  sortingDone = false;
  myDriverOld: any;
  myCarsvals = 0;
  carBonus = 0;
  tick: number;
  tickInterval: any;
  myTeam: string;
  constructor(
    protected api: CarsService,
    private notifiq: NotifiqService,
    private identityService: AuthService
  ) {
    this.getMyCars();
  }

  ngOnInit() {
    const tick = JSON.parse(localStorage.getItem("trxusdt"));

    if (tick) {
      this.tick = tick;
      this.tickInterval = setInterval(() => {
        const tickn = JSON.parse(localStorage.getItem("trxusdt"));
        this.tick = tickn;
      }, 3000);
    }

    this.getTeam();
  }
  ngOnDestroy() {
    this.pageOpen = false;
    if (this.myCarsObserver) {
      this.myCarsObserver.unsubscribe();
    }
    if (this.myDriverOldObserver) {
      this.myDriverOldObserver.unsubscribe();
    }
  }

  selectCar(data) {
    this.bestIndex = data.length - 1;
    this.myCars = data;
    this.myCar = this.myCars[this.actualCarIndex];
    this.selectMyCar(1);
    this.calcCarsValue();
  }

  getFreeCar() {
    this.api.carsBuyList("0").subscribe((mycar) => {
      this.getMyCars();
    });
  }

  getMyCars() {
    this.clearSortedCars();
    this.myCarsObserver = this.api.carsMineList().subscribe((data) => {
      const objsx: any = data;
      const objs: any = objsx.cars;
      if (objs.length === 0) {
        this.getFreeCar();
      } else {
        if (objs.length < 2) {
          this.hasNoCars = true;
        }
        for (let x = 0; x < objs.length; x++) {
          if (objs[x].car_id === 0) {
            this.myCarsSorted.car0.push(objs[x]);
          }
          if (objs[x].car_id === 1) {
            this.myCarsSorted.car1.push(objs[x]);
          }
          if (objs[x].car_id === 2) {
            this.myCarsSorted.car2.push(objs[x]);
          }
          if (objs[x].car_id === 3) {
            this.myCarsSorted.car3.push(objs[x]);
          }
          if (objs[x].car_id === 4) {
            this.myCarsSorted.car4.push(objs[x]);
          }
          if (objs[x].car_id === 5) {
            this.myCarsSorted.car5.push(objs[x]);
          }
          if (objs[x].car_id === 6) {
            this.myCarsSorted.car6.push(objs[x]);
          }
          if (objs[x].car_id === 7) {
            this.myCarsSorted.car7.push(objs[x]);
          }
          if (objs[x].car_id === 8) {
            this.myCarsSorted.car8.push(objs[x]);
          }
          if (objs[x].car_id === 9) {
            this.myCarsSorted.car9.push(objs[x]);
          }
          if (objs[x].car_id === 10) {
            this.myCarsSorted.car10.push(objs[x]);
          }
          if (objs[x].car_id === 11) {
            this.myCarsSorted.car11.push(objs[x]);
          }
          if (objs[x].car_id === 12) {
            this.myCarsSorted.car12.push(objs[x]);
          }
          if (objs[x].car_id === 13) {
            this.myCarsSorted.car13.push(objs[x]);
          }
          if (objs[x].car_id === 14) {
            this.myCarsSorted.car14.push(objs[x]);
          }
          if (objs[x].car_id === 15) {
            this.myCarsSorted.car15.push(objs[x]);
          }
          if (objs[x].car_id === 16) {
            this.myCarsSorted.car16.push(objs[x]);
          }
          if (objs[x].car_id === 17) {
            this.myCarsSorted.car17.push(objs[x]);
          }
          if (objs[x].car_id === 18) {
            this.myCarsSorted.car18.push(objs[x]);
          }
          if (objs[x].car_id === 19) {
            this.myCarsSorted.car19.push(objs[x]);
          }
          if (objs[x].car_id === 20) {
            this.myCarsSorted.car20.push(objs[x]);
          }
          if (objs[x].car_id === 21) {
            this.myCarsSorted.car21.push(objs[x]);
          }
          if (objs[x].car_id === 22) {
            this.myCarsSorted.car22.push(objs[x]);
          }
          if (objs[x].car_id === 23) {
            this.myCarsSorted.car23.push(objs[x]);
          }
          if (objs[x].car_id === 24) {
            this.myCarsSorted.car24.push(objs[x]);
          }
          if (objs[x].car_id === 25) {
            this.myCarsSorted.car25.push(objs[x]);
          }
          if (objs[x].car_id === 26) {
            this.myCarsSorted.car26.push(objs[x]);
          }
          if (objs[x].car_id === 27) {
            this.myCarsSorted.car27.push(objs[x]);
          }
          if (objs[x].car_id === 28) {
            this.myCarsSorted.car28.push(objs[x]);
          }
        }
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

  selectMyCarSPecial(index) {
    this.myCar = this.myCars[index];
  }

  calcCarsValue() {
    for (let x = 0; x < this.myCars.length; x++) {
      if (this.myCars[x].car_id < 7 && this.myCars[x].car_id > 0) {
        this.myCarsvals += 600;
      }
      if (this.myCars[x].car_id >= 7 && this.myCars[x].car_id < 13) {
        this.myCarsvals += 1000;
      }
      if (this.myCars[x].car_id >= 13 && this.myCars[x].car_id < 19) {
        this.myCarsvals += 1600;
      }
      if (this.myCars[x].car_id >= 19 && this.myCars[x].car_id < 25) {
        this.myCarsvals += 2600;
      }
      if (this.myCars[x].car_id === 25) {
        this.myCarsvals += 3600;
      }
      if (this.myCars[x].car_id === 26) {
        this.myCarsvals += 6000;
      }
      if (this.myCars[x].car_id === 27) {
        this.myCarsvals += 9600;
      }
      if (this.myCars[x].car_id === 28) {
        this.myCarsvals += 15600;
      }
    }

    this.getCarBonus();
  }

  getCarBonus() {
    if (this.myCarsvals > 0 && this.myCarsvals < 1000) {
      this.carBonus = 6;
    }
    if (this.myCarsvals > 1000 && this.myCarsvals < 5000) {
      this.carBonus = 12;
    }
    if (this.myCarsvals > 5000 && this.myCarsvals < 10000) {
      this.carBonus = 18;
    }
    if (this.myCarsvals > 10000) {
      this.carBonus = 24;
    }
  }

  selectMyCar(id: number) {
    this.carIndex = id;
    this.shiftIndex = (id - 1) % 6;
    if (id > 24) {
      this.shiftIndex = 6;
    }
    let key = Object.values(this.myCarsSorted)[id];
    if (key.length > 0) {
      this.boughtCar = true;
    } else {
      this.boughtCar = false;
    }
  }

  changeEdition(edNum: number) {
    this.editionIndex = edNum;
    this.carIndex = this.shiftIndex + 1 + 6 * (edNum - 1);
    if (this.shiftIndex === 6) {
      this.carIndex = 24 + edNum;
    }
    let key = Object.values(this.myCarsSorted)[this.carIndex];
    if (key.length > 0) {
      this.boughtCar = true;
    } else {
      this.boughtCar = false;
    }
  }

  getTeam() {
    const data = this.identityService.getStorageIdentity();
    this.myTeam = data.team;
  }

  copyInputMessage() {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value =
      "https://explorer-mainnet.maticvigil.com/address/0xECc4C3dD345DBdE65FBcc460E5aC5C807B84b019/transactions";
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }
}
