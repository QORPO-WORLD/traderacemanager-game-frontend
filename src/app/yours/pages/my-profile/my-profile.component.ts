import { first } from "rxjs/operators";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { flushMicrotasks } from "@angular/core/testing";
import { AffiliatesService } from "../../../api/services";

import { AuthService } from "src/app/user/services/auth.service";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  display = window.innerWidth;
  firstShow = "menu";
  show = "nfts";
  showSecond: string;
  myDriverStats: any;
  selectedId = 1;
  selectedType = "racer";
  marketState = 1;
  mobileMenu = false;
  affiliate: any;

  constructor(
    private identityService: AuthService,
    protected affisrvc: AffiliatesService
  ) {}

  ngOnInit() {
    this.getMyLevel();
    this.getMydriver();
    this.width();
  }
  getMyLevel() {
    this.affiliate = this.identityService.getStorageAff();
  }
  activatePage(p: string) {
    this.show = p;
  }
  activateSecondPage(p) {
    this.showSecond = p;
  }
  width() {
    this.display = window.innerWidth;
    this.solveContent();
  }
  getMydriver() {
    this.myDriverStats = this.identityService.getStorageIdentity();
  }
  solveContent() {
    if (this.firstShow === "menu") {
      if (this.display <= 640) {
        this.mobileMenu = true;
      } else {
        this.mobileMenu = false;
        this.show = "nfts";
      }
    }
  }
}
