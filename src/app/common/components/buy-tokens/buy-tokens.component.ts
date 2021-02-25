import { AuthService } from 'src/app/user/services/auth.service';
import { BalanceService } from './../../../common/services/balance.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DriversService, NitroWalletService, BlockchainService, GameWalletService } from 'src/app/api/services';
import { NotifiqService } from '../../../common/services/notifiq.service';

@Component({
  selector: 'app-buy-tokens',
  templateUrl: './buy-tokens.component.html',
  styleUrls: ['./buy-tokens.component.scss'],
})
export class BuyTokensComponent implements OnInit, OnDestroy {
  buying = 0;
  buyObserver: Subscription;
  balanceObserver: Subscription;
  miningData: any;
  tObserver: Subscription;
  transferSubscription: Subscription;
  nitroObserver: Subscription;
  myDriverObserver: Subscription;
  myminingbalance: number;
  myBalance: any;
  isMobile: boolean;
  benIndex = 1;
  noMoneyModal = false;
  selectStyling: any = {
    subHeader: 'Select token type',
    cssClass: 'customSelect'
  };
  waletsTypes = [
    { type: 'nitro_wallet_trx', name: 'Nitro wallet' },
    { type: 'game_wallet_trx', name: 'Game wallet' },
    { type: 'nitro_wallet_ioi', name: 'Nitro wallet' },
    { type: 'game_wallet_ioi', name: 'Game wallet' }
  ];
  waletsTypesTransfer = [
    { type: 'nitro_wallet', name: 'Nitro wallet' },
    { type: 'game_wallet', name: 'Game wallet' }
  ];
  tokenTypes = [
    { type: 'ioi', name: 'ioi' },
    { type: 'trx', name: 'trx' }
  ];
  walletSelected = this.waletsTypes[1].name;
  walletToSelected = this.waletsTypesTransfer[0].name;
  walletToSelectedTransfer = this.waletsTypesTransfer[0].type;
  tokenSelected = this.tokenTypes[1].name;
  cryptoMtfrckr: string;
  amount: number;

  constructor(protected api: DriversService, private napi: NitroWalletService, protected notify: NotifiqService,
    private blcknsrvc: BlockchainService, private gapi: GameWalletService, private balanceService: BalanceService,
    private identityService: AuthService) {
  }

  ngOnInit(): void {
    this.getMyBalanceFirst();
    //this.getMining();
    this.getMydriver();
    this.getMyBalance();
  }
  ngOnDestroy() {
    if (this.buyObserver) {
      this.buyObserver.unsubscribe();
    }
    if (this.balanceObserver) {
      this.balanceObserver.unsubscribe();
    }
    if (this.tObserver) {
      this.tObserver.unsubscribe();
    }
    if (this.transferSubscription) {
      this.transferSubscription.unsubscribe();
    }
    if (this.nitroObserver) {
      this.nitroObserver.unsubscribe();
    }
    if (this.myDriverObserver) {
      this.myDriverObserver.unsubscribe();
    }
  }

  buyToken() {
    this.buyObserver = this.gapi.gameWalletBuyCreate({ amount: this.buying.toString() }).subscribe(
      data => {

        this.notifyChangedBalance();
        this.getMyBalance();
        this.getMining();
        this.notify.error('xx', 'You successfully purchased IOI tokens');
      }
    );
  }

  getMyBalanceFirst() {
    this.balanceObserver = this.api.driversBalances().subscribe(data => {
      this.myBalance = data;
      if (data.game_wallet_trx < 100) {
        this.noMoneyModal = true;
      }
    });
  }
  getMyBalance() {
    this.amount = 0;
    this.balanceObserver = this.api.driversBalances().subscribe(data => {
      this.myBalance = data;
    });
  }


  getMining() {
    this.tObserver = this.napi.nitroWalletSystemList().subscribe(
      data => {
        this.miningData = data;
        this.myminingbalance = parseInt(data.reward_balance, 10);
      }
    );
  }

  resolveDeposit() {
    if (this.tokenSelected === 'trx') {
      this.depositTrxToken();
    } else if (this.tokenSelected === 'ioi') {
      this.depositIoiToken();
    } else {
      this.notify.error('Validation error', 'Please choose amount, and token type.')
    }
  }


  depositTrxToken() {
    this.transferSubscription = this.blcknsrvc.blockchainDepositCreate(
      {
        amount_to_deposit: this.amount.toString(),
        wallet_type: 'game_wallet_trx'
      }
    )
      .subscribe(data => {
        this.getMyBalance();
        this.getMining();
        this.notify.error('x', 'Successfull. We are waiting for your deposit now.');
      });
  }

  depositIoiToken() {
    this.transferSubscription = this.blcknsrvc.blockchainDepositCreate(
      {
        amount_to_deposit: this.amount.toString(),
        wallet_type: 'game_wallet_ioi'
      }
    )
      .subscribe(data => {
        this.getMyBalance();
        this.getMining();
        this.notify.error('x', 'Successfull. We are waiting for your deposit now.');
      });
  }


  patchWallet() {
    this.nitroObserver = this.napi.nitroWalletPartialUpdate({
      my_crypto_address: this.cryptoMtfrckr
    }).subscribe(data => {
      this.identityService.meUpdate();

      setTimeout(() => {
        this.getMydriver();
      }, 1500);
    });
  }

  getMydriver() {
    const data = this.identityService.getStorageIdentity();
    this.cryptoMtfrckr = data.my_crypto_address;


  }

  copyInputMessage() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 'TE6xjUSpFJJvgy7fAFkNxePwsi4AA1s21D';
    document.body.appendChild(selBox);
    selBox.select();
    selBox.focus();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  plusToken() {
    if ((this.myBalance.game_wallet_trx / 100) - this.buying > 1) {
      this.buying++;
    }
  }
  minusToken() {
    if (this.buying > 0) {
      this.buying--;
    }
  }

  checkTokens() {
    if (this.buying < 1000) {
      this.benIndex = 1;
    } else if (this.buying >= 1000 && this.buying < 5000) {
      this.benIndex = 2;
    } else if (this.buying >= 5000 && this.buying < 10000) {
      this.benIndex = 3;
    } else if (this.buying >= 10000) {
      this.benIndex = 4;
    }
  }

  nextBenefit() {
    if (this.benIndex === 4) {
      this.benIndex = 1;
    } else {
      this.benIndex++;
    }
  }


  notifyChangedBalance() {
    this.balanceService.balanceHasbeenChanged();
  }

  noDeposit(){
    this.notify.error('x', 'You need to deposit some TRX first to buy IOI tokens.');
  }
}

