import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  chosenRacerId = 0;
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
  constructor(private identityService: AuthService, private carService: CarsService, private raceApi: RacesService, private route: Router) { }

  ngOnInit() {
    this.getMyDriver();
    if (window.innerWidth < 641) {
      this.sliceBalancer = 2;
    }
    this.getMyAssets();
    const bin = JSON.parse(localStorage.getItem('binary'));
    if (bin) {
      this.getInterval = setInterval(() => {
        this.getMyGames();
      }, 800);
    }

  }

  ngOnDestroy() {
    clearInterval(this.getInterval);
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
    this.myAvatar = this.racers.filter(
      (racer) => racer.id === this.chosenRacerId
    );
    this.myAvatar = this.myAvatar[0];
    console.log()
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
    this.carService.carsMineList().subscribe(
      data => {
        this.myAssets = data.racers;

        for (let x = 0; x < data.racers.length; x++) {
          this.racers[data.racers[x].car_id - 1].sum++;
          this.racers[data.racers[x].car_id - 1].pks.push(
            data.racers[x].pk
          );
        }
      }
    )
  }

  joinToGame() {
    const bin = JSON.parse(localStorage.getItem('binary'));
    if (bin) {
      return;
    }
    this.automatchLoading = true;
    this.gameObserver = this.raceApi.joinBinary({
      avatar_id: this.racerPk
    }).subscribe(
      data => {
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
    this.gameObserver = this.raceApi.liveBinary().subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          this.automatchLoading = false;

          clearInterval(this.getInterval);
          localStorage.removeItem('binary');
   
          setTimeout(() => {
            this.route.navigate(['/race/binary-trade/' + data[0].versus_hash]);
          }, 1000);
        }
      }
    )
  }

}
