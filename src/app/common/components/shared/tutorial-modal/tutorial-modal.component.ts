import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial-modal',
  templateUrl: './tutorial-modal.component.html',
  styleUrls: ['./tutorial-modal.component.scss'],
})
export class TutorialModalComponent implements OnInit {

  tutorialStep = 1;

  constructor() { }

  ngOnInit() {}

}
