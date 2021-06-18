import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home-affiliate",
  templateUrl: "./home-affiliate.component.html",
  styleUrls: ["./home-affiliate.component.scss"],
})
export class HomeAffiliateComponent implements OnInit {
  title = "common";
  animation = 0;
  constructor(public router: Router) {}

  ngOnInit() {}
  joinTelegram() {
    window.open("https://t.me/TradingIOI", "_blank").focus();
  }
}
