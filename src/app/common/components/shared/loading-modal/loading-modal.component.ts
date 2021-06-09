import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss'],
})
export class LoadingModalComponent implements OnInit {

  animateBar = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => { this.animateBar = true;}, 200);
    console.log('janko mrkvicka');
  }

}
