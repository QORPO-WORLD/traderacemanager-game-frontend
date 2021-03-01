import { BalanceService } from './../../services/balance.service';
import { AuthService } from 'src/app/user/services/auth.service';
import { NotifiqService } from './../../services/notifiq.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlockchainService, DriversService, NitroWalletService } from 'src/app/api/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quick-transfer',
  templateUrl: './quick-transfer.component.html',
  styleUrls: ['./quick-transfer.component.scss'],
})
export class QuickTransferComponent implements OnInit, OnDestroy {

  tokenTypes = [
    { type: 'ioi', name: 'ioi' },
    { type: 'trx', name: 'trx' }
  ];
  waletsTypes = [
    { type: 'nitro_wallet_trx', name: 'Nitro wallet' },
    { type: 'game_wallet_trx', name: 'Game wallet' },
    { type: 'nitro_wallet_ioi', name: 'Nitro wallet' },
    { type: 'game_wallet_ioi', name: 'Game wallet' }
  ];
  transferSubscription: Subscription;
  myDriverBalanceObserver: Subscription;
  myDriverObserver: Subscription;
  nitroObserver: Subscription;
  walletSelected = this.waletsTypes[1].name;
  walletToSelected = this.waletsTypes[0].name;
  tokenSelected = 'ioi';
  cryptoMtfrckr: string;
  amount = 0;
  myIoiBalance = 0;
  myTrxBalance = 0;
  trxUsdt = 3;
  myBalance: any;
  authcode: string;
  stepIndex = 1;
  editingWallet = false;
  nitroToGame = true;
  myDriver: any;
  myDriverBalances: any;
  selectStyling = {
    subHeader: 'Select token type',
    cssClass: 'customSelect profileSelect'
  };

  constructor(protected notify: NotifiqService, private ntrsrvc: NitroWalletService,
    private blcksrvc: BlockchainService, private api: DriversService, protected translate: TranslateService,
    private identityService: AuthService, private balanceService: BalanceService) { }

  ngOnInit() { 
    const tick = JSON.parse(localStorage.getItem('trxusdt'));
    if (tick) {
      this.trxUsdt = tick;
    }
    this.getMyBalance();
  }

  ngOnDestroy() {
    this.stepIndex = 1;
    this.amount = 0;
  }

  getMyBalance() {
    const data = this.identityService.getBalance();
    this.myBalance = data;
    this.myIoiBalance = this.myBalance.game_wallet_ioi;
    this.myTrxBalance = this.myBalance.game_wallet_trx;
  }

  transferTrxToken() {
    this.transferSubscription = this.ntrsrvc.nitroWalletTransferCreate({
      from_wallet_type: this.walletSelected,
      to_wallet_type: this.walletToSelected,
      amount: this.amount.toString()
    })
      .subscribe(data => {
        this.translate.get('nitro_notifiq').subscribe((res) => {
          this.notify.error('x', res.succ_transfer);
          this.amount = 0;
          this.balanceService.balanceHasbeenChanged();
        });
        this.getMydriverBalances();
      });
  }

  transferIoiToken() {
    this.transferSubscription = this.ntrsrvc.nitroWalletTransferCreate({
      from_wallet_type: this.walletSelected,
      to_wallet_type: this.walletToSelected,
      amount: this.amount.toString()
    }).subscribe(data => {
      this.translate.get('nitro_notifiq').subscribe((res) => {
        this.notify.error('x', res.succ_transfer);
        this.balanceService.balanceHasbeenChanged();
        this.amount = 0;
      });
      this.getMydriverBalances();

    });
  }

  resolveTransfer() {
    if (this.tokenSelected === 'trx' && this.nitroToGame === true) {
      this.walletSelected = this.waletsTypes[0].type;
      this.walletToSelected = this.waletsTypes[1].type;
      this.transferTrxToken();
    } else if (this.tokenSelected === 'ioi' && this.nitroToGame === true) {
      this.walletSelected = this.waletsTypes[2].type;
      this.walletToSelected = this.waletsTypes[3].type;
      this.transferIoiToken();
    } else if (this.tokenSelected === 'trx' && this.nitroToGame === false) {
      this.walletSelected = this.waletsTypes[1].type;
      this.walletToSelected = this.waletsTypes[0].type;
      this.transferTrxToken();
    } else if (this.tokenSelected === 'ioi' && this.nitroToGame === false) {
      this.walletSelected = this.waletsTypes[3].type;
      this.walletToSelected = this.waletsTypes[2].type;
      this.transferIoiToken();
    } else {
      this.translate.get('nitro_notifiq').subscribe((res) => {
        this.notify.error(res.valid_error, res.valid_text);
      });
    }
  }

  getMydriverBalances() {
    this.myDriverBalanceObserver = this.api.driversBalances().subscribe(data => {
      this.myDriverBalances = data;
    });

  }

  getMydriver() {
    const data = this.identityService.getStorageIdentity();
    this.myDriver = data;
    this.cryptoMtfrckr = data.my_crypto_address;


  }

  patchWallet() {
    this.nitroObserver = this.ntrsrvc.nitroWalletPartialUpdate({
      my_crypto_address: this.cryptoMtfrckr
    }).subscribe(data => {
      this.identityService.meUpdate();

      setTimeout(() => {
        this.getMydriver();
        this.editingWallet = false;
      }, 1500);

    });
  }

}
