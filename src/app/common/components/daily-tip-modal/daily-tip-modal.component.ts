import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-daily-tip-modal',
  templateUrl: './daily-tip-modal.component.html',
  styleUrls: ['./daily-tip-modal.component.scss'],
})
export class DailyTipModalComponent implements OnInit {

  isEditing = false;
  @Output() modalClose = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  tipsSaved(myBool: boolean){
    this.isEditing = myBool;
  }

  closeModal(){
    this.modalClose.emit(false);
  }

}
