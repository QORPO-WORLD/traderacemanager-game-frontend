import { environment } from './../../../../environments/environment.prod';
import { AuthService as ninja } from './../../../user/services/auth.service';
import { NotifiqService } from './../../services/notifiq.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlockchainService, DriversService, NitroWalletService, AuthService } from 'src/app/api/services';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};
@Component({
  selector: 'app-quick-withdraw',
  templateUrl: './quick-withdraw.component.html',
  styleUrls: ['./quick-withdraw.component.scss'],
})
export class QuickWithdrawComponent implements OnInit {

  tokenTypes = [
    { type: 'ioi', name: 'ioi' },
    { type: 'matic', name: 'matic' }
  ];
  transferSubscription: Subscription;
  myDriverObserver: Subscription;
  nitroObserver: Subscription;
  tokenSelected = 'ioi';
  cryptoMtfrckr = '';
  amount = 100;
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
  confirmCode: string;
  confirmed = false;
  confirming = false;
  constructor(protected notify: NotifiqService, private ntrsrvc: NitroWalletService,
    private blcksrvc: BlockchainService, private api: DriversService, private uapi: AuthService, protected translate: TranslateService,
    private identityService: ninja, private _http: HttpClient, private notifyapi: ErrorService) { }

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
    // this.cryptoMtfrckr = this.myDriver.my_crypto_address;
  }

  getMyBalance() {
    const data = this.identityService.getBalance();
    this.myBalance = data;
    this.myIoiBalance = this.myBalance.game_wallet_ioi;
    this.myTrxBalance = this.myBalance.game_wallet_trx;
  }

  resolveWithdrawal() {
    if (this.amount > 0) {
      this.withdrawalIoiToken();
    }
  }


  withdrawalIoiToken() {
    
    this.transferSubscription = this.blcksrvc.blockchainWithdrawCreate(
      {
        currency: this.tokenSelected,
        amount:  this.amount,
        code: this.authcode,
        targetAddress: this.cryptoMtfrckr
      }
    ).subscribe(data => {
      this.translate.get('nitro_notifiq').subscribe((res) => {
        this.notify.error('x', res.with_confirm);
        this.amount = 0;
        this.confirming = true;
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

  confirmWithdrawal() {

    this.getConfirm().subscribe({
      next: data => this.confirmed = true,
      error: error => this.notifyapi.apiError(error)
    });
  }

  
  getConfirm() {
    console.log(this.confirmCode);
    return this._http.post(environment.api_url + '/blockchain/confirm-withdrawal', {
      confirmationHash: this.confirmCode
    },
      httpOptions);
  }

}
