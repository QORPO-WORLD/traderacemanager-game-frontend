import { NotifiqService } from './../../../common/services/notifiq.service';
import { NitroWalletService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-transfer-nft',
  templateUrl: './transfer-nft.component.html',
  styleUrls: ['./transfer-nft.component.scss'],
})
export class TransferNftComponent implements OnInit {

  nftId: number;
  nftEdition: number;
  nftIoiValue: number;
  routeObserver: Subscription;
  transferSubscription: Subscription;
  nickname: string;
  accountValue: number;
  amount = 1;


  constructor(protected notify: NotifiqService, private route: ActivatedRoute, private identityService: AuthService, private ntrsrvc: NitroWalletService) { }

  ngOnInit() {
    this.getNftId();
    this.getUser();
    this.getAccountValue();
  }

  getNftId() {
    this.routeObserver = this.route
      .queryParams
      .subscribe(params => {
        this.nftId = params['nftId'];
        if (params['nftId'].length <= 0) { this.nftId = 1; }
      });
    this.resolveCarEdition(this.nftId);
  }

  getUser() {
    this.nickname = this.identityService.getStorageIdentity().nickname;
  }

  getAccountValue() {
    const data = this.identityService.getBalance();
    this.accountValue = data.game_wallet_ioi * 0.4;
  }

  resolveCarEdition(id: number) {
    if (id < 7 || id == 25) {
      this.nftEdition = 1;
      this.nftIoiValue = 600;
      if (id == 25) {
        this.nftIoiValue = 3600;
      }
    } else if (id >= 7 && id < 13 || id == 26) {
      this.nftEdition = 2;
      this.nftIoiValue = 1000;
      if (id == 26) {
        this.nftIoiValue = 6000;
      }
    } else if (id >= 13 && id < 19 || id == 27) {
      this.nftEdition = 3;
      this.nftIoiValue = 1600;
      if (id == 27) {
        this.nftIoiValue = 9600;
      }
    } else if (id >= 19 && id < 25 || id == 28) {
      this.nftEdition = 4;
      this.nftIoiValue = 2600;
      if (id == 28) {
        this.nftIoiValue = 15600;
      }
    }
  }



  transferIoiToken() {
    this.transferSubscription = this.ntrsrvc.nitroWalletTransferCreate({
      currency: 'car_' + this.nftId.toString(),
      amount: this.amount,
      mode: 'races2nitro'
    }).subscribe(data => {

      this.identityService.updateBalance();
      setTimeout(() => {
        this.notify.error('x', 'Transfer successful');
        this.identityService.updateBalance();
        this.getAccountValue();
      }, 10);
    });
  }

  resolveTransfer() {
    if (this.amount > 0) {
      this.transferIoiToken();
    }
  }


}
