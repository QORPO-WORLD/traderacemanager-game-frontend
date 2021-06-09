import { RewardsStats } from "./../../../api/models/rewards-stats";
import { RewardsMe } from "./../../../api/models/rewards-me";
import { Headers } from "@angular/http";
import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { RewardsService, TickerPricesService } from "src/app/api/services";
import { AuthService } from "src/app/user/services/auth.service";

@Component({
  selector: "app-rewards",
  templateUrl: "./rewards.component.html",
  styleUrls: ["./rewards.component.scss"],
})
export class RewardsComponent implements OnInit, OnDestroy {
  title = "teams";
  transObserver: Subscription;
  rewardsObserver: Subscription;
  tickerSubscription: Subscription;
  leaderboardType = "rewards";
  myRewards: any;
  rewardsme: RewardsStats;
  summary: number;
  mySettings = { type: "reward", numOfBanners: 2 };
  ioioreward: number;
  ticker: any;
  myioioreward: number;
  mytrxreward: number;
  remainingDays: number;
  myBalances: any;
  constructor(
    protected api: RewardsService,
    private tickerService: TickerPricesService,
    private identityService: AuthService
  ) {
    this.getRewards();
    this.getRewardsMe();
    this.getTicker();
  }

  ngOnInit(): void {
    this.getRemaining();
    this.myBalances = this.identityService.getBalance();
  }

  ngOnDestroy() {
    if (this.transObserver) {
      this.transObserver.unsubscribe();
    }
    if (this.rewardsObserver) {
      this.rewardsObserver.unsubscribe();
    }
  }

  getRewards() {
    this.transObserver = this.api.rewardsList().subscribe((datax) => {
      const data: any = datax;
      this.myRewards = data;
      this.ioioreward = Number(data.ioi_bonus);
    });
  }

  getRewardsMe() {
    this.rewardsObserver = this.api.rewardsStatsList().subscribe((datax) => {
      const data: any = datax;
      this.rewardsme = data;
      this.myioioreward = Number(data.ioi_reward);
      console.log(this.rewardsme);
    });
  }

  getTicker() {
    this.tickerSubscription = this.tickerService
      .tickerPricesRead(1)
      .subscribe((data) => {
        this.ticker = data.prices[9].price;
      });
  }

  getRemaining() {
    const date = new Date();
    const time = new Date(date.getTime());
    time.setMonth(date.getMonth() + 1);
    time.setDate(0);
    const days =
      time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;
    this.remainingDays = days;
  }
}
