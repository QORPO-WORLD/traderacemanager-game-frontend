import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { RewardsService } from "src/app/api/services";
import { BalanceService } from "src/app/common/services/balance.service";
import { AuthService } from "src/app/user/services/auth.service";
import { NotifyService } from "./../../../common/services/notify.service";

@Component({
  selector: "app-about-tokens",
  templateUrl: "./about-tokens.component.html",
  styleUrls: ["./about-tokens.component.scss"],
})
export class AboutTokensComponent implements OnInit {
  transObserver: Subscription;
  ioioreward: number;
  myRewards: any;
  rewardLevel = 0;
  rewardLevelMax = 0;
  isLevel = 1;
  Affilate: any;
  myAfiilateShort = "";
  myAfiilate = "https://traderacemanager.com/user/referral/";
  dumbreferral: string;

  constructor(
    private rwrdsrvc: RewardsService,
    private identityService: AuthService,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.getAffilateLink();
    this.getRewards();
    const balance = JSON.parse(localStorage.getItem("user-balance"));
    this.getrewardLevel(balance.game_wallet_ioi);
    this.getMyLevel();
  }

  copyInputMessage() {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = this.myAfiilate;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    this.notify.error("Link copied to clipboard");
  }
  getAffilateLink() {
    const data = this.identityService.getStorageIdentity();

    this.myAfiilateShort = data.affiliate_slug;
    this.myAfiilate += data.affiliate_slug;
  }
  getRewards() {
    this.transObserver = this.rwrdsrvc.rewardsList().subscribe((data) => {
      const datax: any = data;
      this.ioioreward = Number(datax.ioi_bonus);
    });
  }
  getMyLevel() {
    this.Affilate = this.identityService.getStorageAff();
  }

  getrewardLevel(data: number) {
    if (data < 100) {
      this.isLevel = 1;
      this.rewardLevel = data;
      this.rewardLevelMax = 100 / (100 / data);
    }
    if (data > 100 && data < 1000) {
      this.isLevel = 2;
      this.rewardLevel = data;
      this.rewardLevelMax = 100 / (1000 / data);
    }
    if (data > 999 && data < 10000) {
      this.isLevel = 3;
      this.rewardLevel = data;
      this.rewardLevelMax = 100 / (10000 / data);
    }
    if (data > 9999 && data < 100000) {
      this.isLevel = 4;
      this.rewardLevel = data;
      this.rewardLevelMax = 100 / (100000 / data);
    }
    if (data > 99999) {
      this.isLevel = 4;
      this.rewardLevel = data;
      this.rewardLevelMax = 100;
    }
  }
}
