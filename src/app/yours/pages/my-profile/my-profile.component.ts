import { Component, OnInit } from "@angular/core";
import { flushMicrotasks } from "@angular/core/testing";

import { AuthService } from "src/app/user/services/auth.service";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  show = "nfts";
  showSecond: string;
  myDriverStats: any;

  constructor(private identityService: AuthService) {}

  ngOnInit() {
    this.getMydriver();
  }

  activatePage(p) {
    this.show = p;
  }
  activateSecondPage(p) {
    this.showSecond = p;
  }
  getMydriver() {
    this.myDriverStats = this.identityService.getStorageIdentity();
  }
}
