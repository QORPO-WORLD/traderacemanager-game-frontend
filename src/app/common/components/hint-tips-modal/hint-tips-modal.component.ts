import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hint-tips-modal',
  templateUrl: './hint-tips-modal.component.html',
  styleUrls: ['./hint-tips-modal.component.scss'],
})
export class HintTipsModalComponent implements OnInit {

  constructor() { }

  @ViewChild('modalBack', { static: false }) modalBack: ElementRef;

  hintIndicator = 1;
  modalClose = false;
  numOfHints = 12;
  myHints: Array<any> = [
    {id: 1, name: 'hint1'},
    {id: 2, name: 'hint2'},
    {id: 3, name: 'hint3'},
    {id: 4, name: 'hint4'},
    {id: 5, name: 'hint5'},
    {id: 6, name: 'hint6'},
    {id: 7, name: 'hint7'},
    {id: 8, name: 'hint8'},
    {id: 9, name: 'hint9'},
    {id: 10, name: 'hint10'}
  ];

  ngOnInit() {
    this.randomHint();
  }

  randomHint() {
    this.hintIndicator = Math.floor(Math.random() * (this.numOfHints) + 1);
  }


}
