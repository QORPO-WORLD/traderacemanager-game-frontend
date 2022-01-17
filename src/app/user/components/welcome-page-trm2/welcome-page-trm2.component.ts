import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page-trm2',
  templateUrl: './welcome-page-trm2.component.html',
  styleUrls: ['./welcome-page-trm2.component.scss'],
})
export class WelcomePageTRM2Component implements OnInit {
  title = 'disabled-trm';
  constructor() {}
  ngOnInit() {
    
  }
  openLink(url: string) {
    window.open(url, '_blank').focus();
  }
}
