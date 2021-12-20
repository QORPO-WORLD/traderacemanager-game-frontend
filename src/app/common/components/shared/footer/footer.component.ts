import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  actualYear: number;
  constructor() {}

  ngOnInit() {
    this.actualYear = new Date().getFullYear();
  }
  openLink(url: string) {
    window.open(url, "_blank").focus();
  }
}
