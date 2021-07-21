import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tesla-competition",
  templateUrl: "./tesla-competition.component.html",
  styleUrls: ["./tesla-competition.component.scss"],
})
export class TeslaCompetitionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.resolveDate();
  }
  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  openLink(url: string) {
    window.open(url, "_blank");
  }
  resolveDate() {
    var date2 = new Date();
    var date1 = new Date(2021, 7, 1, 0, 0, 0, 0);
    var dif = date1.getTime() - date2.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
    interface TickEvent {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }

    interface CountdownEvents {
      tick(values: TickEvent): void;
      expired(): void;
      stop(): void;
    }

    type EventMap<T> = { [K in keyof T]: Function[] };

    class Countdown {
      public listeners: EventMap<CountdownEvents> = {
        tick: [],
        expired: [],
        stop: [],
      };

      public timer?: any;

      on<K extends keyof CountdownEvents>(
        eventName: K,
        listener: CountdownEvents[K]
      ): void {
        this.listeners[eventName].push(listener);
      }

      off<K extends keyof CountdownEvents>(
        eventName: K,
        listener: CountdownEvents[K]
      ): void {
        const listeners = this.listeners[eventName];
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }

      start(date: Date) {
        const end = Math.floor(date.getTime() / 1000);
        const daysValue: any = document.getElementById("days");
        const hoursValue: any = document.getElementById("hours");
        const minutesValue: any = document.getElementById("minutes");
        const secondsValue: any = document.getElementById("seconds");

        const tick = () => {
          const now = Date.now();
          const nowSec = Math.floor(now / 1000);
          const time = end - nowSec;

          if (time <= 0) {
            delete this.timer;
            this.listeners.expired.forEach((listener) => listener());
            return;
          }

          const minute = 60;
          const hour = minute * 60;
          const day = hour * 24;

          const days = Math.floor(time / day);
          const hours = Math.floor((time % day) / hour);
          const minutes = Math.floor((time % hour) / minute);
          const seconds = time % minute;

          this.listeners.tick.forEach((listener) =>
            listener({ days, hours, minutes, seconds })
          );

          const timeToNextSecond = (nowSec + 1) * 1000 - now;
          this.timer = setTimeout(tick, timeToNextSecond);
          daysValue.innerHTML = days;
          hoursValue.innerHTML = hours;
          minutesValue.innerHTML = minutes;
          secondsValue.innerHTML = seconds;
        };

        tick();
      }

      stop() {
        if (this.timer) {
          clearTimeout(this.timer);
          delete this.timer;
          this.listeners.stop.forEach((listener) => listener());
        }
      }
    }

    const countdown = new Countdown();
    // countdown.on('tick', (event) => console.log('tick', event));
    // countdown.on('expired', () => console.log('expired'));
    // countdown.on('stop', () => console.log('stopped'));

    const date = new Date();
    date.setSeconds(date.getMinutes() + Seconds_Between_Dates);
    countdown.start(date);
  }
}
