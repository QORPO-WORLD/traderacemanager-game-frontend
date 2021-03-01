import { AuthService as ninja } from './../../../user/services/auth.service';
import { NotifiqService } from './../../services/notifiq.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlockchainService, DriversService, NitroWalletService, AuthService } from 'src/app/api/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quick-withdraw',
  templateUrl: './quick-withdraw.component.html',
  styleUrls: ['./quick-withdraw.component.scss'],
})
export class QuickWithdrawComponent implements OnInit {

  tokenTypes = [
    { type: 'ioi', name: 'ioi' },
    { type: 'trx', name: 'trx' }
  ];
  transferSubscription: Subscription;
  myDriverObserver: Subscription;
  nitroObserver: Subscription;
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
  myDriver: any;
  selectStyling = {
    subHeader: 'Select token type',
    cssClass: 'customSelect profileSelect'
  };

  constructor(protected notify: NotifiqService, private ntrsrvc: NitroWalletService,
    private blcksrvc: BlockchainService, private api: DriversService, private uapi: AuthService, protected translate: TranslateService,
  private identityService: ninja) { }

  ngOnInit() {
    const tick = JSON.parse(localStorage.getItem('trxusdt'));
    if (tick) {
      this.trxUsdt = tick;
    }
    this.getMydriver();
    this.getMyBalance();
  }


  getMydriver() {
    this.myDriver = this.identityService.getStorageIdentity();
    this.cryptoMtfrckr = this.myDriver.my_crypto_address;
  }

  getMyBalance() {
    const data = this.identityService.getBalance();
    this.myBalance = data;
    this.myIoiBalance = this.myBalance.game_wallet_ioi;
    this.myTrxBalance = this.myBalance.game_wallet_trx;
  }

  resolveWithdrawal() {
    if (this.tokenSelected === 'trx' && this.amount > 0) {
      this.withdrawalTrxToken();
    } else if (this.tokenSelected === 'ioi' && this.amount > 0) {
      this.withdrawalIoiToken();
    } else {
      this.translate.get('nitro_notifiq').subscribe((res) => {
        this.notify.error(res.valid_error, res.valid_text);
      });
    }
  }

  withdrawalTrxToken() {
    this.transferSubscription = this.blcksrvc.blockchainWithdrawCreate(
      {
        wallet_type: 'game_wallet_trx',
        amount_to_withdraw: this.amount.toString(),
        authcode: this.authcode
      }
    ).subscribe(data => {
      this.translate.get('nitro_notifiq').subscribe((res) => {
        this.notify.error('x', res.with_confirm);
        this.amount = 0;
      });
    });
  }

  withdrawalIoiToken() {
    this.transferSubscription = this.blcksrvc.blockchainWithdrawCreate(
      {
        wallet_type: 'game_wallet_ioi',
        amount_to_withdraw: this.amount.toString(),
        authcode: this.authcode
      }
    ).subscribe(data => {
      this.translate.get('nitro_notifiq').subscribe((res) => {
        this.notify.error('x', res.with_confirm);
        this.amount = 0;
      });
    });
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

  resendActivation() {
    this.uapi.authVerificationCreate().subscribe(data => {
      this.notify.success('email_sent', 'open_mail');
    });
  }

}
