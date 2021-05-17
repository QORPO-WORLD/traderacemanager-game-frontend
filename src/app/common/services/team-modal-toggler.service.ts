import { Injectable, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
@Injectable({
  providedIn: 'root'
})
export class TeamModalTogglerService {

  @Output() fire: EventEmitter<any> = new EventEmitter();
  @Output() month: EventEmitter<any> = new EventEmitter();

  modalToggler = {visible: false, teamId: 1};
  isLastMonth = false;

  constructor() {}

  change(teamID: number) {
    this.modalToggler.visible = !this.modalToggler.visible;
    this.modalToggler.teamId = teamID;
    this.fire.emit(this.modalToggler);
  }

  resetMonth() {
    this.isLastMonth = false;
  }

  changeMonth() {
    this.isLastMonth = !this.isLastMonth;
    this.month.emit(this.isLastMonth);
  }

  getEmittedValue() {
    return this.fire;
  }

  getMonth() {
    return this.month;
  }
}
