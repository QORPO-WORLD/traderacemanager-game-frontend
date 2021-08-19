import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "./../../user/services/auth.service";
import { BalanceService } from "./../../common/services/balance.service";
import { NotifyService } from "./../../common/services/notify.service";
import { CarsService } from "../../api/services";
import { Router } from "@angular/router";

declare let ga: any;
declare let gtag: any;

@Component({
  selector: "app-buy-nft",
  templateUrl: "./buy-nft.component.html",
  styleUrls: ["./buy-nft.component.scss"],
})
export class BuyNftComponent implements OnInit {
  myIndex: string;
  //images settings
  path: string;
  //
  price = 0;
  maticFee = 1.05;
  paymentMethod = 1;
  @Input() assetInfo: Array<any>;
  amount = 1;
  myDriverBalances: any;
  tokenSelected = "ioi";
  constructor(
    protected api: CarsService,
    private balanceService: BalanceService,
    private identityService: AuthService,
    private notify: NotifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.resolveBuyAsset();
    this.getMydriverBalances();
  }

  resolveBuyAsset() {
    if (this.assetInfo[0]["type"] === "racer") {
      this.path = "/assets/base/images/nft-racers/";
    } else if (this.assetInfo[0]["type"] === "car") {
      this.path = "/assets/base/images/nft-cars/";
    } else if (this.assetInfo[0]["type"] === "bundle") {
      this.path = "/assets/base/images/bundles/";
    }
    this.price = +this.assetInfo[0]["price"] * this.amount;
  }

  plusAmount() {
    this.amount++;
  }

  minusAmount() {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  buyCarFromGarage(index: number) {
    if (this.assetInfo[0].type === "racer") {
      this.api
        .racerBuyList({
          tier: index,
          amount: this.amount,
          currency: this.tokenSelected,
        })
        .subscribe((datax) => {
          const data: any = datax;
          let currencyPrefix =
            this.tokenSelected === "ioi"
              ? "buy_nft_racers_IOI"
              : "buy_nft_racers_POLYGON";

          ga("event", currencyPrefix, {
            eventCategory: currencyPrefix,
            eventAction: this.assetInfo[0].collection,
            eventLabel: this.assetInfo[0].name,
          });

          let usdtPrice =
            this.tokenSelected === "ioi"
              ? datax[0].model.extras.price * this.myDriverBalances.ioi_usdt
              : datax[0].model.extras.price * this.myDriverBalances.matic_usdt;
          gtag("event", "conversion", {
            send_to: "AW-580556065/gKFRCMPdl98CEKGq6pQC",
            value: usdtPrice,
            currency: "USD",
            transaction_id: "",
          });

          setTimeout(() => {
            this.notifyChangedBalance();
            this.router.navigate(["/profile/my-profile"]);
            this.notify.error("You have bought a new racer!");
          }, 1000);
        });

      return;
    }
    if (this.assetInfo[0].type === "bundle") {
      this.buyPackageNfts(index);
      return;
    }
    this.api
      .carsBuyList({
        tier: index,
        amount: this.amount,
        currency: this.tokenSelected,
      })
      .subscribe((datax) => {
        const data: any = datax;

        let currencyPrefix =
          this.tokenSelected === "ioi"
            ? "buy_nft_car_IOI"
            : "buy_nft_car_POLYGON";

        ga("event", currencyPrefix, {
          eventCategory: currencyPrefix,
          eventAction: this.assetInfo[0].collection,
          eventLabel: this.assetInfo[0].name,
        });

        let usdtPrice =
          this.tokenSelected === "ioi"
            ? datax[0].model.extras.price * this.myDriverBalances.ioi_usdt
            : datax[0].model.extras.price * this.myDriverBalances.matic_usdt;

        gtag("event", "conversion", {
          send_to: "AW-580556065/gKFRCMPdl98CEKGq6pQC",
          value: usdtPrice,
          currency: "USD",
          transaction_id: "",
        });

        setTimeout(() => {
          this.notifyChangedBalance();
          this.router.navigate(["/profile/my-profile"]);
          this.notify.error("You have bought a new car!");
        }, 1000);
      });
  }

  buyPackageNfts(index: number) {
    this.api
      .packageBuyList({
        package_id: index,
        amount: this.amount,
        currency: this.tokenSelected,
      })
      .subscribe((datax) => {
        const data: any = datax;
        setTimeout(() => {
          this.notifyChangedBalance();
          this.router.navigate(["/profile/my-profile"]);
          this.notify.error("You have bought a new package!");
        }, 1000);
      });
  }

  notifyChangedBalance() {
    this.identityService.updateBalance();
    this.balanceService.balanceHasbeenChanged();
  }

  getMydriverBalances() {
    this.myDriverBalances = this.identityService.getBalance();
  }

  lowBalance() {
    this.notify.error("Insufficient balance");
  }
  buyAsset() {
    if (this.paymentMethod === 1) {
      (this.assetInfo[0]["type"] ||
        this.assetInfo[0]["type"] ||
        this.assetInfo[0]["type"] === "bundle") &&
      !this.assetInfo[0]["rare"] &&
      this.myDriverBalances.game_wallet_ioi >= this.price
        ? (() => {
            this.tokenSelected = "ioi";
            this.buyCarFromGarage(this.assetInfo[0]["tier"]);
          })()
        : (() => {
            this.lowBalance();
            this.router.navigate(["/other/wallet-control"], {
              queryParams: { controlType: "deposit" },
            });
          })();
    } else if (this.paymentMethod === 2) {
      (this.assetInfo[0]["type"] === "car" ||
        this.assetInfo[0]["type"] === "racer" ||
        this.assetInfo[0]["type"] === "bundle") &&
      !this.assetInfo[0]["rare"] &&
      ((this.price * this.myDriverBalances.ioi_usdt) /
        this.myDriverBalances.matic_usdt) *
        this.amount <=
        this.myDriverBalances.game_wallet_matic
        ? (() => {
            this.tokenSelected = "matic";
            this.buyCarFromGarage(this.assetInfo[0]["tier"]);
          })()
        : (() => {
            this.lowBalance();
            this.router.navigate(["/other/wallet-control"], {
              queryParams: { controlType: "deposit" },
            });
          })();
    } else if (this.paymentMethod === 3) {
    } else if (this.paymentMethod === 4) {
      window.open(
        "https://arkane.market/search?contractName=Trade%20Race%20Manager%20by%20IOI",
        "_blank"
      );
      let currencyPrefix =
        this.assetInfo[0].type === "car"
          ? "buy_nft_car_arcane"
          : "buy_nft_racers_arcane";

      ga("event", currencyPrefix, {
        eventCategory: currencyPrefix,
        eventAction: this.assetInfo[0].collection,
        eventLabel: this.assetInfo[0].name,
      });
    }
  }
}
