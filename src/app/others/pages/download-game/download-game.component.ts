import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-game',
  templateUrl: './download-game.component.html',
  styleUrls: ['./download-game.component.scss'],
})
export class DownloadGameComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  
  openLink(url: string) {
    window.open(url, "_blank");
  }

}
