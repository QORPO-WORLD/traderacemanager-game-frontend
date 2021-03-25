import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-race-info-modal',
  templateUrl: './race-info-modal.component.html',
  styleUrls: ['./race-info-modal.component.scss'],
})
export class RaceInfoModalComponent implements OnInit {

  @Input() tourId: number;
  @Input() betAmount: number;
  @Input() raceId = '';
  @Output() modalClose = new EventEmitter<boolean>();
  isEnduro = false;

  constructor() { }

  ngOnInit() {
    this.checkEnduro();
  }

  closeModal(){
    this.modalClose.emit(false);
  }

  checkEnduro(){
    if (this.raceId === 'car_race_enduro_1' ||
    this.raceId === 'car_race_enduro_5' ||
    this.raceId === 'car_race_enduro_10' ||
    this.raceId === 'car_race_enduro_50' ||
    this.raceId === 'car_race_enduro_100' ) {
      this.isEnduro = true;
    }
  }
}