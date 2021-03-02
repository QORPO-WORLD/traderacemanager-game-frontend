import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RewardsService } from 'src/app/api/services';
import { BalanceService } from 'src/app/common/services/balance.service';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-about-tokens',
  templateUrl: './about-tokens.component.html',
  styleUrls: ['./about-tokens.component.scss'],
})
export class AboutTokensComponent implements OnInit {

  transObserver: Subscription;
  ioioreward: number;
  myRewards: any;
  rewardLevel = 0;
  rewardLevelMax = 0;
  isLevel = 1;
  constructor(private rwrdsrvc: RewardsService, private identityService: AuthService) { }

  ngOnInit() {
    this.getRewards();
    const balance = JSON.parse(localStorage.getItem('user-balance'));
    this.getrewardLevel(balance.game_wallet_ioi);

  }

  getRewards() {
    this.transObserver = this.rwrdsrvc.rewardsList()
      .subscribe(data => {
        const datax: any = data;
        this.ioioreward = Number(datax.ioi_bonus);
      });
  }

  getrewardLevel(data: number) {
    if (data < 100) {
      this.isLevel = 1;
      this.rewardLevel = data;
      this.rewardLevelMax = 100 / (100 / data) ;
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
