import { RacesService } from 'src/app/api/services';
import { RaceSignupV2 } from './../../api/models/race-signup-v2';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-multi-view',
  templateUrl: './multi-view.component.html',
  styleUrls: ['./multi-view.component.scss'],
})
export class MultiViewComponent implements OnInit {
  myRaces: Array<string> = [];
  loading = true;
  startView = 0;
  limitView: number;
  xxObserver: Subscription;
  raceDataildata: any;
  nextRaceHash: string;
  stepSize = 1;
  constructor(private route: ActivatedRoute, private api: RacesService, private router: Router) {
    this.route.params.subscribe(params => {
      this.getRaces(params.races);

    });
  }

  ngOnInit() {
    this.getMobileVersion();
  }

  getRaces(races: string) {
    this.myRaces = races.split(',');

    this.limitView = this.myRaces.length;
    this.loading = false;
  }

  repeatSignup() {
    const req: RaceSignupV2[] = [];
    for (let i = 0; i < this.raceDataildata.my_cars.length; i++) {

      req.push({
        car: this.raceDataildata.my_cars[i].cid,
        bet_coins: this.raceDataildata.my_cars[i].b,
        race_hash: this.nextRaceHash
      });
    }

    this.xxObserver = this.api.racesMultiSignupCreate(req).subscribe(
      res => this.router.navigate(['/race/watch-race-3min/' + this.nextRaceHash]), // response
      err => console.log(err.error[0].errors[0].race[0] === 'Too late to sign up for this race!' ? this.refireSignup() : null), // error
      () => console.log('HTTP request completed.') // finished
    );


  }

  repeatAll() {

  }

  refireSignup() { }


  decreaseStartView() {
    for (let i = 0; i < this.stepSize; i++) {
      if (this.startView > 0) {
        this.startView = this.startView - 1;
      }
    }
  }

  increaseStartView() {
    for (let i = 0; i < this.stepSize; i++) {
      if (this.startView < this.limitView - this.stepSize) {
        this.startView = this.startView + 1;
      }
    }
  }


  decreaseLimitView() {
    this.limitView = this.limitView - 1;
    this.startView = 0;
  }

  increaseLimitView() {
    this.limitView = this.limitView + 1;
    this.startView = 0;
  }

  getMobileVersion() {
    const windowSize = window.innerWidth;
    if (windowSize > 900) {
      this.stepSize = 4;
    } else {
      this.stepSize = 1;
      if (this.startView > (this.limitView - 4)) {
        this.startView = this.limitView - 4;
      }
    }
  }

}
