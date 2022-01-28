import { Component, OnInit } from "@angular/core";
declare let gtag: any;
@Component({
  selector: "app-download-game",
  templateUrl: "./download-game.component.html",
  styleUrls: ["./download-game.component.scss"],
})
export class DownloadGameComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  openLink(url: string) {
    window.open(url, "_blank");
    gtag("event", "conversion", {
      send_to: "AW-580556065/hrivCITyl5QDEKGq6pQC",
    });
  }
}
