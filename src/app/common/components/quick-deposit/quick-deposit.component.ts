import { NotifiqService } from './../../services/notifiq.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlockchainService, DriversService, NitroWalletService } from 'src/app/api/services';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-quick-deposit',
  templateUrl: './quick-deposit.component.html',
  styleUrls: ['./quick-deposit.component.scss'],
})
export class QuickDepositComponent implements OnInit, OnDestroy {
  tokenTypes = [
    { type: 'ioi', name: 'ioi' },
    { type: 'trx', name: 'trx' }
  ];
  transferSubscription: Subscription;
  myDriverObserver: Subscription;
  nitroObserver: Subscription;
  tokenSelected = this.tokenTypes[1].name;
  cryptoMtfrckr: string;
  amount = 0;
  myIoiBalance = 0;
  myTrxBalance = 0;
  stepIndex = 1;
  trxUsdt = 3;
  editingWallet = false;
  myBalance: any;
  selectStyling = {
    subHeader: 'Select token type',
    cssClass: 'customSelect profileSelect'
  };
  myMaticBalance = 0;
  constructor(protected notify: NotifiqService, private ntrsrvc: NitroWalletService,
    private blcksrvc: BlockchainService, private api: DriversService, protected translate: TranslateService,
    private identityService: AuthService) { }

  ngOnInit() {
    const tick = JSON.parse(localStorage.getItem('trxusdt'));
    if (tick) {
      this.trxUsdt = tick;
    }
    this.getMydriver();
    this.getMyBalance();
  }
  ngOnDestroy() {
    if (this.transferSubscription) {
      this.transferSubscription.unsubscribe();
    }
    if (this.myDriverObserver) {
      this.myDriverObserver.unsubscribe();
    }
    if (this.nitroObserver) {
      this.nitroObserver.unsubscribe();
    }
  }
  resolveDeposit() {
    if (this.tokenSelected === 'trx') {
      this.stepIndex = 2;
      this.depositTrxToken();
    } else if (this.tokenSelected === 'ioi') {
      this.stepIndex = 2;
      this.depositIoiToken();
    } else {
      this.translate.get('nitro_notifiq').subscribe((res) => {
        this.notify.error(res.valid_error, res.valid_text);
      });
    }
  }


  getMydriver() {
    const data = this.identityService.getStorageIdentity();
    this.cryptoMtfrckr = data.my_crypto_address;
  }

  getMyBalance() {
    const data = this.identityService.getBalance();
    this.myBalance = data;
    this.myIoiBalance = this.myBalance.game_wallet_ioi;
    this.myBalance.game_wallet_ioi ? this.myMaticBalance = this.myBalance.game_wallet_matic : null;
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


  depositTrxToken() {
    this.transferSubscription = this.blcksrvc.blockchainDepositCreate(
      {
        amount_to_deposit: this.amount.toString(),
        wallet_type: 'game_wallet_trx'
      }
    ).subscribe(data => {
      this.translate.get('nitro_notifiq').subscribe((res) => {
        this.notify.error('x', res.succ_deposit);
        this.depositing();
      });
    });
  }

  depositIoiToken() {
    this.transferSubscription = this.blcksrvc.blockchainDepositCreate(
      {
        amount_to_deposit: this.amount.toString(),
        wallet_type: 'game_wallet_ioi'
      }
    ).subscribe(data => {
      this.translate.get('nitro_notifiq').subscribe((res) => {
        this.notify.error('x', res.succ_deposit);
        this.depositing();
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

  refresh() {
    //window.location.reload();
  }

  depositing() {
    localStorage.setItem('depos', JSON.stringify(Date.now())); 
  }
}
