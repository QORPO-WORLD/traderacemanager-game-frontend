import { NotifiqService } from "./../../services/notifiq.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import {
  BlockchainService,
  DriversService,
  NitroWalletService,
} from "src/app/api/services";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "src/app/user/services/auth.service";
declare let ga: any;
declare let gtag: any;
@Component({
  selector: "app-quick-deposit",
  templateUrl: "./quick-deposit.component.html",
  styleUrls: ["./quick-deposit.component.scss"],
})
export class QuickDepositComponent implements OnInit, OnDestroy {
  tokenTypes = [
    { type: "ioi", name: "ioi" },
    { type: "matic", name: "matic" },
  ];
  transferSubscription: Subscription;
  myDriverObserver: Subscription;
  nitroObserver: Subscription;
  tokenSelected = "ioi";
  chainSelected = "";
  cryptoMtfrckr: string;
  amount = 0;
  myIoiBalance = 0;
  myTrxBalance = 0;
  stepIndex = 1;
  trxUsdt = 3;
  editingWallet = false;
  depositRequested = false;
  depositSuccessful = false;
  ethAddress: string;
  myBalance: any;
  currency: any;
  contractId: any;
  selectStyling = {
    subHeader: "Select token type",
    cssClass: "customSelect profileSelect",
  };
  myMaticBalance = 0;
  claimed: boolean;
  ethMtfrckr = "";
  contracts = [
    {
      contractId: 1,
      token: "ioi",
      chain: "ethereum",
      currency: null,
    },
    {
      contractId: 2,
      token: "ioi",
      chain: "binance",
      currency: null,
    },
    {
      contractId: 3,
      token: "ioi",
      chain: "polygon",
      currency: null,
    },
    {
      contractId: 4,
      token: "matic",
      chain: "ethereum",
      currency: null,
    },
    {
      contractId: 5,
      token: "matic",
      chain: "binance",
      currency: null,
    },
    {
      contractId: null,
      token: "matic",
      chain: "polygon",
      currency: "matic",
    },
  ];
  constructor(
    protected notify: NotifiqService,
    private ntrsrvc: NitroWalletService,
    private blcksrvc: BlockchainService,
    private api: DriversService,
    protected translate: TranslateService,
    private identityService: AuthService
  ) {}

  ngOnInit() {
    const tick = JSON.parse(localStorage.getItem("trxusdt"));
    if (tick) {
      this.trxUsdt = tick;
    }
    this.getMydriver();
    this.getMyBalance();
    ga("event", "deposit-funds", {
      eventCategory: "navsteva",
      eventAction: "deposit-funds",
      value: "deposit-funds",
    });
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
    this.stepIndex = 2;
    this.depositIoiToken();
  }

  getMydriver() {
    const data = this.identityService.getStorageIdentity();
    this.cryptoMtfrckr = data.my_crypto_address;
    this.ethAddress = data.eth_crypto_address;
  }

  getMyBalance() {
    const data = this.identityService.getBalance();
    this.myBalance = data;
    this.myIoiBalance = this.myBalance.game_wallet_ioi;
    this.myBalance.game_wallet_ioi
      ? (this.myMaticBalance = this.myBalance.game_wallet_matic)
      : null;
  }

  copyInputMessage() {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = "TE6xjUSpFJJvgy7fAFkNxePwsi4AA1s21D";
    document.body.appendChild(selBox);
    selBox.select();
    selBox.focus();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  depositIoiToken() {
    this.transferSubscription = this.blcksrvc
      .blockchainDepositCreate({
        currency: this.tokenSelected,
        location: "races",
      })
      .subscribe((datax) => {
        const data: any = datax;
        this.translate.get("nitro_notifiq").subscribe((res) => {
          this.notify.error(
            "x",
            "We found " +
              data.outstanding_amount +
              " new tokens on your wallet."
          );
          this.depositing();
          this.claimed = true;
        });
      });
  }

  patchWallet() {
    this.nitroObserver = this.ntrsrvc
      .nitroWalletPartialUpdate({
        my_crypto_address: this.cryptoMtfrckr,
      })
      .subscribe((data) => {
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
    localStorage.setItem("depos", JSON.stringify(Date.now()));
  }

  makeDeposit() {
    if (this.ethMtfrckr.substring(0, 2) !== "0x") {
      this.notify.error(
        "xx",
        "Chain crypto wallet address must start with '0x'"
      );
      return;
    }

    if (this.ethMtfrckr.length < 42) {
      this.notify.error(
        "xx",
        "Chain crypto wallet address length is too short"
      );
      return;
    }

    this.depositRequested = true;

    this.contracts.forEach((contract) => {
      if (
        this.tokenSelected === contract.token &&
        this.chainSelected === contract.chain
      ) {
        this.currency = contract.currency;
        this.contractId = contract.contractId;
      }
    });

    if (
      this.currency === null &&
      this.contractId !== null &&
      this.ethMtfrckr.length === 42
    ) {
      this.blcksrvc
        .makeDeposit({
          from_address: this.ethMtfrckr,
          destination: "races",
          contract_id: this.contractId,
        })
        .subscribe((data) => {
          this.depositSuccessful = true;

          const datax: any = data;
          let gaTokenName = this.tokenSelected === "ioi" ? "IOI" : "Polygon";
          let depositUsdtAmount = 0;
          if (data !== null) {
            this.tokenSelected === "ioi"
              ? datax.outstanding_amount * this.myBalance.ioi_usdt
              : datax.outstanding_amount * this.myBalance.matic_usdt;
          }

          ga("ecommerce:addTransaction", {
            id: "0001",
            affiliation: gaTokenName + " token",
            revenue: depositUsdtAmount,
            shipping: "0",
            tax: "0",
          });

          gtag("event", "conversion", {
            send_to: "AW-580556065/iqbECLXl7d4CEKGq6pQC",
            value: depositUsdtAmount,
            currency: "USD",
            transaction_id: "",
          });
        });
    }

    if (
      this.currency !== null &&
      this.contractId === null &&
      this.ethMtfrckr.length === 42
    ) {
      this.blcksrvc
        .makeDeposit({
          from_address: this.ethMtfrckr,
          destination: "races",
          currency: this.currency,
        })
        .subscribe((data) => {
          this.depositSuccessful = true;

          const datax: any = data;
          let gaTokenName = this.tokenSelected === "ioi" ? "IOI" : "Polygon";
          let depositUsdtAmount = 0;
          if (data !== null) {
            this.tokenSelected === "ioi"
              ? datax.outstanding_amount * this.myBalance.ioi_usdt
              : datax.outstanding_amount * this.myBalance.matic_usdt;
          }

          ga("ecommerce:addTransaction", {
            id: "0001",
            affiliation: gaTokenName + " token",
            revenue: depositUsdtAmount,
            shipping: "0",
            tax: "0",
          });

          gtag("event", "conversion", {
            send_to: "AW-580556065/iqbECLXl7d4CEKGq6pQC",
            value: depositUsdtAmount,
            currency: "USD",
            transaction_id: "",
          });
        });
    }
  }
}
