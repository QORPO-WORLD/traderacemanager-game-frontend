import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-binary-initial-selection',
  templateUrl: './binary-initial-selection.component.html',
  styleUrls: ['./binary-initial-selection.component.scss'],
})
export class BinaryInitialSelectionComponent implements OnInit {

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
    },
    {
      id: 2,
      name: 'Flash',
      image: 'red-trm',
    },
    {
      id: 3,
      name: 'Octane',
      image: 'blue-trm',
    },
    {
      id: 4,
      name: 'Punisher',
      image: 'black-trm',
    },
    {
      id: 5,
      name: 'Lady Rich',
      image: 'lady-rich',
    },
    {
      id: 6,
      name: 'Rich Jr.',
      image: 'bad-boy',
    },
    {
      id: 7,
      name: 'Mrs. Rich',
      image: 'mrs-rich',
    },
    {
      id: 8,
      name: 'Mr. Rich',
      image: 'mr-rich',
    }
  ];

  constructor(private identityService: AuthService) { }

  ngOnInit() {
    this.getMyDriver();
    if (window.innerWidth < 641) {
      this.sliceBalancer = 2;
    }
  }

  getMyDriver(){
    this.myDriverStats = this.identityService.getDriverMe();
  }

  nextRacer(){
    if (this.startRacerIndex < this.racers.length - this.sliceBalancer) {
      this.startRacerIndex++;
    } else this.startRacerIndex = 0;
  }

  prevRacer(){
    if (this.startRacerIndex > 0) {
      this.startRacerIndex--;
    } else this.startRacerIndex = this.racers.length - this.sliceBalancer;
  }

  getMyChosenAvatar(){
    this.myAvatar = this.racers.filter(
      (racer) => racer.id === this.chosenRacerId
    );
    this.myAvatar = this.myAvatar[0];
  }

  automatch(){

    this.automatchLoading = true;
    setTimeout(() => {
      this.opponentPlayer = {
        avatar: this.racers[Math.floor(Math.random() * (7)) + 1],
        name: 'pesHejhou',
      }
      this.automatchLoading = false;
     }, 2500);
  }

}
