import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tech-indicator',
  templateUrl: './tech-indicator.component.html',
  styleUrls: ['./tech-indicator.component.scss'],
})
export class TechIndicatorComponent implements OnInit, AfterViewInit {
  @Input() type: string;

  url: string;
  urlx: string;
  urlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {
    
   }

  ngAfterViewInit() {
    this.url = 'https://ioi-game.com/indicator/' + this.type + '.html';
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
   }
  
  ngOnInit() {
    this.urlx = 'https://ioi-game.com/indicator/' + this.type + '.html';
  }

}
