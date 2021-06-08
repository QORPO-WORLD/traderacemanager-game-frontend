import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CarsService, RacesService } from 'src/app/api/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-binary-initial-selection',
  templateUrl: './binary-initial-selection.component.html',
  styleUrls: ['./binary-initial-selection.component.scss'],
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
      name: 'Axle',
      image: 'white-trm',
      sum: 0,
      pks: []
    },
    {
      id: 2,
      name: 'Flash',
      image: 'red-trm',
      sum: 0,
      pks: []
    },
    {
      id: 3,
      name: 'Octane',
      image: 'blue-trm',
      sum: 0,
      pks: []
    },
    {
      id: 4,
      name: 'Punisher',
      image: 'black-trm',
      sum: 0,
      pks: []
    },
    {
      id: 5,
      name: 'Lady Rich',
      image: 'lady-rich',
      sum: 0,
      pks: []
    },
    {
      id: 6,
      name: 'Rich Jr.',
      image: 'bad-boy',
      sum: 0,
      pks: []
    },
    {
      id: 7,
      name: 'Mrs. Rich',
      image: 'mrs-rich',
      sum: 0,
      pks: []
    },
    {
      id: 8,
      name: 'Mr. Rich',
      image: 'mr-rich',
      sum: 0,
      pks: []
    }
  ];
  gameObserver: Subscription;
  myAssets = [];
  getInterval: any;
  racerPk: number;
  nextRace: any;
  matched = false;
  initialSubscribtion: Subscription;
  liveObserver: Subscription;
  playersObserver: Subscription;
  constructor(private identityService: AuthService, private carService: CarsService, private raceApi: RacesService, private route: Router) { }

  ngOnInit() {
    this.getMyDriver();
    if (window.innerWidth < 641) {
      this.sliceBalancer = 2;
    }
    this.getMyAssets();
    const bin = JSON.parse(localStorage.getItem('binary'));
    if (bin) {
      if (Date.now() < bin.time) {
        this.getInterval = setInterval(() => {
          this.getMyGames();
        }, 800);
      }
    }

  }

  ngOnDestroy() {
    clearInterval(this.getInterval);
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
    if (this.chosenRacerId) {
      console.log(this.chosenRacerId);

      const filtered = this.racers.filter(
        (racer) => racer.id === this.chosenRacerId
      );
      this.myAvatar = filtered[0];
    }

  }

  automatch() {

    this.automatchLoading = true;
    setTimeout(() => {
      this.opponentPlayer = {
        avatar: this.racers[Math.floor(Math.random() * (7)) + 1],
        name: 'pesHejhou',
      }
      this.automatchLoading = false;
    }, 2500);
  }

  getMyAssets() {
    this.initialSubscribtion = this.carService.carsMineList().subscribe(
      data => {
        this.myAssets = data.racers;

        for (let x = 0; x < data.racers.length; x++) {
          this.racers[data.racers[x].car_id - 1].sum++;
          this.racers[data.racers[x].car_id - 1].pks.push(
            data.racers[x].pk
          );
        }

        const obj = {
          id: 1000,
          sum: 1,
          pks: [0],
          image: 'rookie-basic',
          name: 'Rookie'
        }

        this.racers.splice(0, 0, obj)
      }
    )
  }

  joinToGame() {
    const bin = JSON.parse(localStorage.getItem('binary'));
    if (bin) {
      if (Date.now() > bin.time) {
        return;
      }
    }

    this.gameObserver = this.raceApi.joinBinary({
      avatar_id: this.racerPk
    }).subscribe(
      data => {
        this.automatchLoading = true;
        localStorage.setItem('binary', JSON.stringify({
          hash: data.versus_hash,
          time: Date.now() + (data.ttl * 1000)
        }));

        this.getInterval = setInterval(() => {

          this.getMyGames();

        }, 800);
      }
    )
  }


  getMyGames() {

        this.liveObserver = this.raceApi.liveBinary().subscribe(
          data => {
            console.log(data);
            if (data.length > 0) {
              this.automatchLoading = false;
              this.nextRace = data[0];
              this.getBinaryPlayers(data);

            }
          }
        )

  }

  getMyGamesOnce() {
    this.liveObserver = this.raceApi.liveBinary().subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          this.automatchLoading = false;
          this.nextRace = data[0];
          this.getBinaryPlayers(data);
        }
      }
    );
  }

  getBinaryPlayers(datalan: any) {
    clearInterval(this.getInterval);
    this.playersObserver = this.raceApi.binaryPlayers(
      datalan[0].versus_hash
    ).subscribe(data => {
      const datax: any = data;
      this.resolveAvatars(datax);
    });
  }

  resolveAvatars(data: Array<{
    user_id: string;
    user_hash: string;
    user_nickname: string;
  }>) {
    const myid = this.identityService.getDriverMe().id;

    for (const el of data) {
      if (el.user_hash !== myid) {
        const ff = this.racers.filter((item) => {
          return item.id === el.user_id
        });
        this.opponentPlayer = {
          avatar: {
            image: ff[0].image
          },
          name: el.user_nickname
        }
      }
    }

    this.matched = true;
    console.log(this.nextRace);
    setTimeout(() => {
      this.route.navigate(['/race/binary-trade/' + this.nextRace.versus_hash + '/' + this.nextRace.start_at.toString()]);
      console.log('removing');
      localStorage.removeItem('binary');
         }, 3000);

  }



}
