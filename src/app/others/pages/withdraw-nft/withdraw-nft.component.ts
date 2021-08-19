import { environment } from "./../../../../environments/environment.prod";
import { Component, OnInit } from "@angular/core";
import { NotifiqService } from "./../../../common/services/notifiq.service";
import { NitroWalletService, BlockchainService } from "src/app/api/services";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/user/services/auth.service";
import { ErrorService } from "src/app/common/services/error.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NftsService } from "../../../api/services/nfts.service";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  withCredentials: true,
};

@Component({
  selector: "app-withdraw-nft",
  templateUrl: "./withdraw-nft.component.html",
  styleUrls: ["./withdraw-nft.component.scss"],
})
export class WithdrawNftComponent implements OnInit {
  nftId: number;
  nftEdition: number;
  nftIoiValue: number;
  routeObserver: Subscription;
  transferSubscription: Subscription;
  nickname: string;
  cryptoMtfrckr = "";
  accountValue: number;
  myDriver: any;
  amount = 1;
  confirming = false;
  confirmCode: string;
  products = [];
  authcode: string;
  confirmed = false;
  nftType = "car";
  driverBalances: any;
  constructor(
    private apin: NftsService,
    protected notify: NotifiqService,
    private route: ActivatedRoute,
    private identityService: AuthService,
    private ntrsrvc: NitroWalletService,
    private blcksrvc: BlockchainService,
    private notifyapi: ErrorService,
    private _http: HttpClient
  ) {
    this.products = this.apin.getAssets();
  }

  ngOnInit() {
    this.getNftId();
    this.getUser();
    this.getAccountValue();
  }

  getMydriver() {
    this.myDriver = this.identityService.getStorageIdentity();
  }

  getNftId() {
    this.routeObserver = this.route.queryParams.subscribe((params) => {
      this.nftId = +params["nftId"];
      this.nftType = params["nftType"];
      if (params["nftId"].length <= 0) {
        this.nftId = 1;
      }
    });

    this.resolveShowAsset();
  }

  getUser() {
    const data = this.identityService.getStorageIdentity();
    this.driverBalances = this.identityService.getBalance();
    this.nickname = data.nickname;
  }
  resolveShowAsset() {
    this.products = this.products.filter((asset) => asset.id === this.nftId);
    this.nftIoiValue = this.products[0].price;
  }

  getAccountValue() {
    const data = this.identityService.getBalance();
    this.accountValue = data.game_wallet_ioi * data.ioi_usdt;
  }

  confirmWithdrawal() {
    this.getConfirm().subscribe({
      next: (data) => (this.confirmed = true),
      error: (error) => this.notifyapi.apiError(error),
    });
  }

  getConfirm() {
    return this._http.post(
      environment.api_url + "/blockchain/confirm-withdrawal",
      {
        confirmationHash: this.confirmCode,
        code: this.authcode,
      },
      httpOptions
    );
  }

  withdrawCar() {
    if (this.nftType === "car") {
      let symbol = "car_" + this.products[0].tier;
      this.transferSubscription = this.blcksrvc
        .blockchainWithdrawCreate({
          symbol: symbol,
          token_id: this.products[0].tier,
          amount: this.amount,
          code: this.authcode,
          targetAddress: this.cryptoMtfrckr,
          contract_id: 6,
          location: "races",
        })
        .subscribe((data) => {
          this.amount = 0;
          this.confirmed = false;
          this.confirming = true;
        });
    }

    if (this.nftType === "racer") {
      let symbol = "racer_" + this.products[0].tier;
      this.transferSubscription = this.blcksrvc
        .blockchainWithdrawCreate({
          symbol: symbol,
          token_id: this.products[0].tier,
          amount: this.amount,
          code: this.authcode,
          targetAddress: this.cryptoMtfrckr,
          contract_id: 7,
          location: "races",
        })
        .subscribe((data) => {
          this.amount = 0;
          this.confirmed = false;
          this.confirming = true;
        });
    }
  }
}
