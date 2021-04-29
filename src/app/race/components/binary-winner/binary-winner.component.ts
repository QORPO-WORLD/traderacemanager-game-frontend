import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binary-winner',
  templateUrl: './binary-winner.component.html',
  styleUrls: ['./binary-winner.component.scss'],
})
export class BinaryWinnerComponent implements OnInit {

  hasWon = true;
  repeatGame = false;
  requestDenied = false;

  constructor() { }

  ngOnInit() {}

}
