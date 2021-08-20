import { NotifyService } from "./../../../common/services/notify.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { CarsService, RacesService } from "src/app/api/services";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/user/services/auth.service";

@Component({
  selector: "app-binary-initial-selection",
  templateUrl: "./binary-initial-selection.component.html",
  styleUrls: ["./binary-initial-selection.component.scss"],
})
export class BinaryInitialSelectionComponent implements OnInit, OnDestroy {
  myDriverStats: any;
  fuelStep = 1;
  startRacerIndex = 0;
  sliceBalancer = 3;
  chosenRacerId: number;
  myAvatar: any;
  opponentPlayer: any;
  automatchLoading = false;
  menuOpen = false;
  racers: Array<any> = [
    {
      id: 1,
      name: "Axle",
      image: "white-trm",
      sum: 0,
      pks: [],
    },
    {
      id: 2,
      name: "Flash",
      image: "red-trm",
      sum: 0,
      pks: [],
    },
    {
      id: 3,
      name: "Octane",
      image: "blue-trm",
      sum: 0,
      pks: [],
    },
    {
      id: 4,
      name: "Punisher",
      image: "black-trm",
      sum: 0,
      pks: [],
    },
    {
      id: 5,
      name: "Lady Rich",
      image: "lady-rich",
      sum: 0,
      pks: [],
    },
    {
      id: 6,
      name: "Rich Jr.",
      image: "bad-boy",
      sum: 0,
      pks: [],
    },
    {
      id: 7,
      name: "Mrs. Rich",
      image: "mrs-rich",
      sum: 0,
      pks: [],
    },
    {
      id: 8,
      name: "Mr. Rich",
      image: "mr-rich",
      sum: 0,
      pks: [],
    },
    {
      id: 11,
      name: "DAO maker", //
      image: "dao-maker",
      sum: 0,
      pks: [],
    },
    {
      id: 12,
      name: "POLYGON",
      image: "polygon",
      sum: 0,
      pks: [],
    },
    // {
    //   id: 13,
    //   name: 'OLI WHITE',
    //   image: 'mr-rich',
    //   sum: 0,
    //   pks: []
    // },
    {
      id: 14,
      name: "KYLE CHASSE", //
      image: "paid",
      sum: 0,
      pks: [],
    },
    {
      id: 15,
      name: "ASH WSB", //
      image: "ash-wsb",
      sum: 0,
      pks: [],
    },
    {
      id: 16,
      name: "tehMoonwaLkeR", //
      image: "tehmoonwalker",
      sum: 0,
      pks: [],
    },
    {
      id: 17,
      name: "Parabolic Guy", //
      image: "parabolic-guy",
      sum: 0,
      pks: [],
    },

    // {
    //   id: 18,
    //   name: 'Boxmining',
    //   image: 'mr-rich',
    //   sum: 0,
    //   pks: []
    // },
    // {
    //   id: 19,
    //   name: 'Infinity Gainz',
    //   image: 'mr-rich',
    //   sum: 0,
    //   pks: []
    // },
    {
      id: 20,
      name: "Altcoin Buzz",
      image: "altcoin-buzz",
      sum: 0,
      pks: [],
    },
    {
      id: 21,
      name: "CryptoWizard", //
      image: "cryptowizard",
      sum: 0,
      pks: [],
    },
    {
      id: 22,
      name: "Kucoin", //
      image: "kucoin",
      sum: 0,
      pks: [],
    },
    {
      id: 23,
      name: "QuickSwap", //
      image: "quickswap",
      sum: 0,
      pks: [],
    },
    {
      id: 24,
      name: "Tech Giants", //
      image: "techgiants",
      sum: 0,
      pks: [],
    },
    {
      id: 25,
      name: "Venly", //
      image: "venly",
      sum: 0,
      pks: [],
    },
  ];
  gameObserver: Subscription;
  myAssets = [];
  getInterval: any;
  racerPk: number;
  nextRace: any;
  gettInterval: any;
  matched = false;
  initialSubscribtion: Subscription;
  liveObserver: Subscription;
  playersObserver: Subscription;
  myDriverBalances: any;
  queueTime: number;
  constructor(
    private identityService: AuthService,
    private carService: CarsService,
    private raceApi: RacesService,
    private route: Router,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.getMyDriver();
    this.getCryptoStats();
    if (window.innerWidth < 641) {
      this.sliceBalancer = 2;
    }
    this.getMyAssets();
    const bin = JSON.parse(localStorage.getItem("binary"));
    if (bin) {
      if (Date.now() < bin.time) {
        this.gettInterval = setInterval(() => {
          this.getMyGames();
        }, 1500);
      } else {
        localStorage.removeItem("binary");
        this.automatchLoading = false;
      }
    }
  }

  ngOnDestroy() {
    if (this.getInterval) {
      clearInterval(this.getInterval);
    }
    if (this.gettInterval) {
      clearInterval(this.gettInterval);
    }
    if (this.gameObserver) {
      this.gameObserver.unsubscribe();
    }
    if (this.initialSubscribtion) {
      this.initialSubscribtion.unsubscribe();
    }
    if (this.liveObserver) {
      this.liveObserver.unsubscribe();
    }
    if (this.playersObserver) {
      this.playersObserver.unsubscribe();
    }
  }

  getMyDriver() {
    this.myDriverStats = this.identityService.getDriverMe();
  }

  nextRacer() {
    if (this.startRacerIndex < this.racers.length - this.sliceBalancer) {
      this.startRacerIndex++;
    } else this.startRacerIndex = 0;
  }

  prevRacer() {
    if (this.startRacerIndex > 0) {
      this.startRacerIndex--;
    } else this.startRacerIndex = this.racers.length - this.sliceBalancer;
  }

  getMyChosenAvatar() {
    const filtered = this.racers.filter(
      (racer) => racer.id === this.chosenRacerId
    );
    this.myAvatar = filtered[0];
  }

  automatch() {
    this.automatchLoading = true;
    setTimeout(() => {
      this.opponentPlayer = {
        avatar: this.racers[Math.floor(Math.random() * 7) + 1],
        name: "pesHejhou",
      };
      this.automatchLoading = false;
    }, 2500);
  }

  getMyAssets() {
    this.initialSubscribtion = this.carService
      .carsMineList()
      .subscribe((data) => {
        this.myAssets = data.racers;
        console.log(data.racers);

        for (let x = 0; x < data.racers.length; x++) {
          for (let y = 0; y < this.racers.length; y++) {
            if (this.racers[y].id == data.racers[x].car_id) {
              this.racers[y].sum++;
              this.racers[y].pks.push(data.racers[x].pk);
              break;
            }
          }
        }

        const obj = {
          id: 0,
          sum: 1,
          pks: [0],
          image: "rookie-basic",
          name: "Rookie",
        };

        this.racers.splice(0, 0, obj);
      });
  }

  joinToGame() {
    const bin = JSON.parse(localStorage.getItem("binary"));
    if (bin) {
      if (Date.now() > bin.time) {
        this.notify.error("You are currently waiting for oponent.");
        return;
      } else {
        localStorage.removeItem("binary");
        this.automatchLoading = false;
      }
    }
    

    this.gameObserver = this.raceApi
      .joinBinary({
        avatar_id: this.racerPk,
      })
      .subscribe((data) => {
        this.queueTime = data.ttl;
        this.automatchLoading = true;
        localStorage.setItem(
          "binary",
          JSON.stringify({
            hash: data.versus_hash,
            time: Date.now() + 300000,
          })
        );
        setTimeout(() => {
          if (bin) {
            if (bin.versus_hash === data.versus_hash) {
              localStorage.removeItem("binary");
              if (this.getInterval) {
                clearInterval(this.getInterval);
                this.automatchLoading = false;
              }
            }
          }
        }, 300000);
        this.getInterval = setInterval(() => {
          this.getMyGames();
        }, 1500);
      });
  }

  getMyGames() {
    this.liveObserver = this.raceApi.liveBinary().subscribe((data) => {
      if (data.length > 0) {
        if (this.getInterval) {
          clearInterval(this.getInterval);
        }
        if (this.gettInterval) {
          clearInterval(this.gettInterval);
        }
        this.automatchLoading = false;
        this.nextRace = data[0];
        this.getBinaryPlayers(data);
      }
    });
  }

  getMyGamesOnce() {
    this.liveObserver = this.raceApi.liveBinary().subscribe((data) => {
      if (data.length > 0) {
        this.automatchLoading = false;
        this.nextRace = data[0];
        this.getBinaryPlayers(data);
      }
    });
  }

  getBinaryPlayers(datalan: any) {
    this.playersObserver = this.raceApi
      .binaryPlayers(datalan[0].versus_hash)
      .subscribe((data) => {
        const datax: any = data;
        this.resolveAvatars(datax);
      });
  }

  resolveAvatars(
    data: Array<{
      user_id: string;
      user_hash: string;
      user_nickname: string;
    }>
  ) {
    const myid = this.identityService.getDriverMe().id;
    const oponFromData = data.filter((item) => {
      return item.user_hash !== myid;
    });
    const oponFromRacers = this.racers.filter((item) => {
      return item.id === oponFromData[0].user_id;
    });

    this.opponentPlayer = {
      avatar: {
        image: oponFromRacers[0].image,
      },
      name: oponFromData[0].user_nickname,
    };

    /*

    for (let x = 0; x < data.length; x++) {
      if (data[x].user_hash !== myid) {
        ff = this.racers.filter((item) => {
          return item.id === data[x].user_id
        });
        console.log(ff);
        this.opponentPlayer = {
          avatar: {
            image: ff[0].image
          },
          name: data[x].user_nickname
        }
      }
    }
*/

    this.matched = true;
    setTimeout(() => {
      localStorage.removeItem("binary");
      this.route.navigate([
        "/race/binary-trade/" +
          this.nextRace.versus_hash +
          "/" +
          this.nextRace.start_at.toString(),
      ]);
    }, 3000);
  }

  getCryptoStats() {
    const data = this.identityService.getBalance();
    this.myDriverBalances = data;
  }

  timerComplete(event: any) {
    localStorage.removeItem("binary");
    this.automatchLoading = false;
  }
}
