import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-daily-tip-modal',
  templateUrl: './daily-tip-modal.component.html',
  styleUrls: ['./daily-tip-modal.component.scss'],
})
export class DailyTipModalComponent implements OnInit {

  @Input() meOwner = false;
  @Input() isEditing = false;
  @Output() modalClose = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  tipsSaved(myBool: boolean){
    this.modalClose.emit(false);
  }

  closeModal(){
    this.modalClose.emit(false);
  }

}
