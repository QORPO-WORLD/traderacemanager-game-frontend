import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tutorial-modal',
  templateUrl: './tutorial-modal.component.html',
  styleUrls: ['./tutorial-modal.component.scss'],
})
export class TutorialModalComponent implements OnInit {

  tutorialStep = 1;
  @Output() closeModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }
  
  closeOnboarding(goToMarket: boolean) {
    this.closeModal.emit(goToMarket);
  }

}
