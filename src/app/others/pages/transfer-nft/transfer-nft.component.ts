import { NotifiqService } from "./../../../common/services/notifiq.service";
import { NitroWalletService } from "src/app/api/services";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/user/services/auth.service";
import { NftsService } from "../../../api/services/nfts.service";
@Component({
  selector: "app-transfer-nft",
  templateUrl: "./transfer-nft.component.html",
  styleUrls: ["./transfer-nft.component.scss"],
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
  hash: string;
  products = [];
  nftType = "car";
  driverBalances: any;
  constructor(
    private apin: NftsService,
    protected notify: NotifiqService,
    private route: ActivatedRoute,
    private identityService: AuthService,
    private ntrsrvc: NitroWalletService
  ) {
    this.products = this.apin.getAssets();
  }

  ngOnInit() {
    this.getNftId();
    this.getUser();
    this.getAccountValue();
  }

  getNftId() {
    this.routeObserver = this.route.queryParams.subscribe((params) => {
      this.nftId = +params["nftId"];
      this.nftType = params["nftType"];
      this.hash = params["hash"];
      if (!params["nftId"]) {
        this.nftId = 1;
      }
      if (!params["hash"]) {
        this.hash = "";
      }
    });
    this.resolveShowAsset();
  }
  getUser() {
    this.nickname = this.identityService.getStorageIdentity().nickname;
    this.driverBalances = this.identityService.getBalance();
  }
  resolveShowAsset() {
    this.products = this.products.filter((asset) => asset.id === this.nftId);
    this.nftIoiValue = this.products[0].price;
  }

  getAccountValue() {
    const data = this.identityService.getBalance();
    this.accountValue = data.game_wallet_ioi * data.ioi_usdt;
  }

  transferIoiToken() {
    this.transferSubscription = this.ntrsrvc
      .nitroWalletTransferCreate({
        currency: this.nftType + "_" + this.products[0].tier.toString(),
        amount: this.amount,
        mode: "races2nitro",
        extras_hash: this.hash,
      })
      .subscribe((data) => {
        this.identityService.updateBalance();
        setTimeout(() => {
          this.notify.error("x", "Transfer successful");
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
