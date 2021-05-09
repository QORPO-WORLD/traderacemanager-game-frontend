import { first } from "rxjs/operators";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { flushMicrotasks } from "@angular/core/testing";
import { AffiliatesService } from "../../../api/services";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/user/services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  getContent: any;
  getSecondContent: any;
  typeObserver: Subscription;
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
    private route: ActivatedRoute,
    private identityService: AuthService,
    protected affisrvc: AffiliatesService
  ) {}

  ngOnInit() {
    this.getAssetType();
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
  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  getMydriver() {
    this.myDriverStats = this.identityService.getStorageIdentity();
  }
  getAssetType() {
    this.typeObserver = this.route.queryParams.subscribe((params) => {
      this.getContent = params["controlType"];
      this.getSecondContent = params["secondControlType"];

      if (!this.getContent) {
        this.getContent = "menu";
      }

      this.firstShow = this.getContent;
      this.show = this.getContent;
      this.showSecond = this.getSecondContent;
    });
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
