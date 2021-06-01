import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-binary-winner',
  templateUrl: './binary-winner.component.html',
  styleUrls: ['./binary-winner.component.scss'],
})
export class BinaryWinnerComponent implements OnInit {

  hasWon = false;
  repeatGame = false;
  requestDenied = false;
  loading = false;
  myAvatar: any;
  opponentPlayer: any;

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
  @Input() winner: any;
  @Input() loser: any;
  @Input() meWon: any;
  @Output() fatality: EventEmitter<any> = new EventEmitter();
  
  constructor(private route: Router) { }

  ngOnInit() {
    this.hasWon = this.meWon;
  }

  fatalityDo() {
    this.fatality.emit(1);
  }

  repeat() {
    this.route.navigate(['/race/binary-fuel']);
    return;


    this.repeatGame = true;
    this.myAvatar = this.racers[this.randomInteger(0,7)];
    this.loading = true;

    this.opponentPlayer = {
      avatar: this.racers[this.randomInteger(0,7)],
      name: 'Oponent' + this.randomInteger(0,100),
    }
    setTimeout(() => {
      this.opponentPlayer = undefined;
      this.requestDenied = true;
      this.loading = false;
     }, 3000);
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  automatch(){

    this.loading = true;
    setTimeout(() => {
      this.opponentPlayer = {
        avatar: this.racers[this.randomInteger(0,7)],
        name: 'Oponent' + this.randomInteger(0,100),
      }
      this.requestDenied = false;
      this.loading = false;
     }, 2500);
  }

}
