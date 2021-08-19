import { Component, OnInit } from "@angular/core";
import { NotifiqService } from "./../../../common/services/notifiq.service";
import { NitroWalletService, BlockchainService } from "src/app/api/services";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/user/services/auth.service";
import { NftsService } from "../../../api/services/nfts.service";

@Component({
  selector: "app-deposit-nft",
  templateUrl: "./deposit-nft.component.html",
  styleUrls: ["./deposit-nft.component.scss"],
})
export class DepositNftComponent implements OnInit {
  nftId: number;
  nftEdition: number;
  nftIoiValue: number;
  routeObserver: Subscription;
  transferSubscription: Subscription;
  nickname: string;
  cryptoMtfrckr: string;
  accountValue: number;
  amount = 1;
  ethMtfrckr = "0x";
  depositRequested = false;
  depositSuccessful = false;
  contractId = 6;
  ethAddress: string;
  products = [];
  nftType = "car";
  driverBalance: any;
  constructor(
    private apin: NftsService,
    protected notify: NotifiqService,
    private route: ActivatedRoute,
    private identityService: AuthService,
    private ntrsrvc: NitroWalletService,
    private blcksrvc: BlockchainService
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
      if (params["nftId"].length <= 0) {
        this.nftId = 1;
      }
    });
    this.resolveShowAsset();
  }

  getUser() {
    const data = this.identityService.getStorageIdentity();
    this.nickname = data.nickname;
    this.cryptoMtfrckr = data.my_crypto_address;
    this.ethAddress = data.eth_crypto_address;
  }
  resolveShowAsset() {
    this.products = this.products.filter((asset) => asset.id === this.nftId);
    this.nftIoiValue = this.products[0].price;
  }

  getAccountValue() {
    const data = this.identityService.getBalance();
    this.accountValue = data.game_wallet_ioi * data.ioi_usdt;
    this.driverBalance = data;
  }

  depositCar() {
    this.transferSubscription = this.blcksrvc
      .blockchainDepositCreate({
        amount: this.amount,
        currency: this.nftType + "_" + this.products[0].tier,
      })
      .subscribe((data) => {
        this.depositing();
      });
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
    this.contractId = this.nftType === "car" ? 6 : 7;

    if (this.contractId !== null && this.ethMtfrckr.length === 42) {
      this.blcksrvc
        .makeDeposit({
          from_address: this.ethMtfrckr,
          destination: "races",
          contract_id: this.contractId,
          token_id: this.products[0].tier,
        })
        .subscribe((data) => {
          console.log(data);
        });
    }

    setTimeout(() => {
      this.depositSuccessful = true;
    }, 2000);
  }
}
