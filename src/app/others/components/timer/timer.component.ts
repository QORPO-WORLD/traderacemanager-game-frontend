import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
@Component({
  selector: 'app-timer',
  template: `
   <span *ngIf="timerValue?.days > 0">{{timerValue?.days
    |number:'2.0'}}days</span> <span *ngIf="timerValue?.hours > 0 && timerValue?.days < 2">{{timerValue?.hours
    |number:'2.0'}}hrs</span>
  <span *ngIf="timerValue?.minutes > 1 && timerValue?.days === 0">
    {{timerValue?.minutes|number :'2.0'}}mins</span>
    <span *ngIf="timerValue?.minutes === 1 && timerValue?.hours === 0 && timerValue?.days === 0">
    {{timerValue?.minutes|number :'2.0'}}min</span>
  <span *ngIf="timerValue?.minutes < 2 && timerValue?.hours === 0 && timerValue?.days === 0">
    {{timerValue?.seconds|number :'2.0'}}s</span>
    `,
    styles: ['span { font-family: inherit; }']
})
export class TimerComponent implements OnInit {
  @Input() value: number;
  @Output('onComplete') timerOver: EventEmitter<any> = new EventEmitter<any>();
  timerValue;
  areTenSecsRemainings: boolean = false;
  constructor() { }

  ngOnInit() {
    let source$ = Observable.range(0, this.value).zip(
      Observable.timer(0, 1000),
      (x) => { return x }
    ).map(x => {
      return this.value - x;

    });

    source$.subscribe(seconds => {

      let mins = parseInt('' + Math.round(seconds) / 60, 10);
      const secs = Math.round(seconds) % 60;
      const hrs = Math.floor(seconds % (3600 * 24) / 3600);
      const days = Math.floor(seconds / (3600 * 24));
      mins = mins % 60;
      let res = {
        'hours': hrs,
        'minutes': mins,
        'seconds': secs,
        'days': days,
      };

      this.timerValue = res;
    }, () => this.timerOver.emit('TIMER ERROR'), () => this.timerOver.emit('TIMER OVER'));
  }





}
