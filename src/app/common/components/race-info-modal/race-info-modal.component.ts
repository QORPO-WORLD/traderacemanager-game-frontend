import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-race-info-modal',
  templateUrl: './race-info-modal.component.html',
  styleUrls: ['./race-info-modal.component.scss'],
})
export class RaceInfoModalComponent implements OnInit {

  @Input() tourId: number;
  @Input() raceType = '';
  @Input() raceId = '';
  @Output() modalClose = new EventEmitter<boolean>();
  isEnduro = false;

  constructor() { }

  ngOnInit() {
  }

  closeModal(){
    this.modalClose.emit(false);
  }

}