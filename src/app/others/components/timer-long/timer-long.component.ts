import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { timer } from "rxjs/observable/timer";
@Component({
  selector: "app-timer-long",
  styleUrls: ["./timer-long.component.scss"],
  template: `
    <div class="timer-holder" *ngIf="type !== 1">
      <!-- <div class="day my-cta-btn-back">
      <p>{{dateX|date:'dd'}}</p>
      <p class="month">{{dateX|date:'MMM'}}</p>
    </div>
    <div class="time-item"  *ngIf="timerValue?.days > 1">
    <div class="value">
      <p>{{timerValue?.days|number :'2.0'}}</p>
    </div>
    <p class="desc">days</p>
  </div>
    <div class="time-item"  *ngIf="timerValue?.days < 2">
    <div class="value">
      <p>{{timerValue?.days|number :'2.0'}}</p>
    </div>
    <p class="desc">day</p>
  </div>-->
      <div class="time-item">
        <div class="value">
          <p>{{ timerValue?.hours | number: "2.0" }}</p>
        </div>
      </div>
      <div class="time-item" *ngIf="timerValue?.minutes > 1">
        <div class="value">
          <p>{{ timerValue?.minutes | number: "2.0" }}</p>
        </div>
      </div>
      <div class="time-item" *ngIf="timerValue?.minutes < 2">
        <div class="value">
          <p>{{ timerValue?.minutes | number: "2.0" }}</p>
        </div>
      </div>
      <div class="time-item">
        <div class="value">
          <p>{{ timerValue?.seconds | number: "2.0" }}</p>
        </div>
      </div>
    </div>

    <div *ngIf="type === 1">
      <span class="my-text-color">{{ timerValue?.days | number: "2.0" }}d</span>
      <span class="my-text-color">
        {{ timerValue?.hours | number: "2.0" }}h</span
      >
      <span class="my-text-color">
        {{ timerValue?.minutes | number: "2.0" }}m</span
      >
      <span style="width:37px;" class="my-text-color">
        {{ timerValue?.seconds | number: "2.0" }}s</span
      >
    </div>
  `,
})
export class TimerLongComponent implements OnInit {
  @Input() value: number;
  @Input() type: number;
  @Output("onComplete") timerOver: EventEmitter<any> = new EventEmitter<any>();
  timerValue;
  areTenSecsRemainings: boolean = false;
  dateX: any;
  constructor() {}

  ngOnInit() {
    let source$ = Observable.range(0, this.value)
      .zip(Observable.timer(0, 1000), (x) => {
        return x;
      })
      .map((x) => {
        return this.value - x;
      });

    source$.subscribe(
      (seconds) => {
        let mins = parseInt("" + Math.round(seconds) / 60, 10);
        const secs = Math.round(seconds) % 60;
        const hrs = Math.floor((seconds % (3600 * 24)) / 3600);
        const days = Math.floor(seconds / (3600 * 24));
        mins = mins % 60;
        let res = {
          hours: hrs,
          minutes: mins,
          seconds: secs,
          days: days,
        };

        this.timerValue = res;
      },
      () => this.timerOver.emit("TIMER ERROR"),
      () => this.timerOver.emit("TIMER OVER")
    );
    this.dateX = new Date(new Date().getTime() + this.value);
  }
}
