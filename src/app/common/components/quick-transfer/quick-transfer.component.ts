import { BalanceService } from "./../../services/balance.service";
import { AuthService } from "src/app/user/services/auth.service";
import { NotifiqService } from "./../../services/notifiq.service";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import {
  BlockchainService,
  DriversService,
  NitroWalletService,
} from "src/app/api/services";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-quick-transfer",
  templateUrl: "./quick-transfer.component.html",
  styleUrls: ["./quick-transfer.component.scss"],
})
export class QuickTransferComponent implements OnInit, OnDestroy {
  tokenTypes = [
    { type: "ioi", name: "ioi" },
    { type: "trx", name: "trx" },
  ];
  waletsTypes = [
    { type: "nitro_wallet_trx", name: "Nitro wallet" },
    { type: "game_wallet_trx", name: "Game wallet" },
    { type: "nitro_wallet_ioi", name: "Nitro wallet" },
    { type: "game_wallet_ioi", name: "Game wallet" },
  ];
  transferSubscription: Subscription;
  myDriverBalanceObserver: Subscription;
  myDriverObserver: Subscription;
  nitroObserver: Subscription;
  walletSelected = this.waletsTypes[1].name;
  walletToSelected = this.waletsTypes[0].name;
  tokenSelected = "ioi";
  cryptoMtfrckr: string;
  amount = 1;
  myIoiBalance = 0;
  myTrxBalance = 0;
  trxUsdt = 3;
  hash = "";
  myBalance: any;
  authcode: string;
  stepIndex = 1;
  editingWallet = false;
  nitroToGame = true;
  myDriver: any;
  myDriverBalances: any;
  selectStyling = {
    subHeader: "Select token type",
    cssClass: "customSelect profileSelect",
  };
  @Input() nftId: number;
  minAmount = 100;
  maticusdt = 1;
  constructor(
    protected notify: NotifiqService,
    private ntrsrvc: NitroWalletService,
    private blcksrvc: BlockchainService,
    private api: DriversService,
    protected translate: TranslateService,
    private identityService: AuthService,
    private balanceService: BalanceService
  ) {}

  ngOnInit() {
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
    if (this.myBalance.matic_usdt) {
      this.maticusdt = this.myBalance.matic_usdt;
    }
  }

  transferIoiToken() {
    this.transferSubscription = this.ntrsrvc
      .nitroWalletTransferCreate({
        currency: this.tokenSelected,
        amount: this.amount,
        mode: "races2nitro",
        extras_hash: this.hash,
      })
      .subscribe((data) => {
        this.translate.get("nitro_notifiq").subscribe((res) => {
          this.identityService.updateBalance();
          setTimeout(() => {
            this.notify.error("x", res.succ_transfer);
            this.identityService.getBalance();
            this.balanceService.balanceHasbeenChanged();
            this.amount = 0;
            this.getMyBalance();
            this.getMydriverBalances();
          }, 100);
        });
      });
  }

  resolveTransfer() {
    if (this.amount > 0) {
      this.transferIoiToken();
    }
  }

  getMydriverBalances() {
    this.myDriverBalanceObserver = this.api
      .driversBalances()
      .subscribe((data) => {
        this.myDriverBalances = data;
      });
  }

  getMydriver() {
    const data = this.identityService.getStorageIdentity();
    this.myDriver = data;
    this.cryptoMtfrckr = data.my_crypto_address;
  }

  selectMatic() {
    this.minAmount = 0.001;
    this.tokenSelected = "matic";
  }

  selectIoi() {
    this.minAmount = 100;
    this.tokenSelected = "ioi";
  }
}
