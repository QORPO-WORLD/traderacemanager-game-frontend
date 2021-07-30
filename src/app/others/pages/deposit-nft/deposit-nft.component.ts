import { Component, OnInit } from "@angular/core";
import { NotifiqService } from "./../../../common/services/notifiq.service";
import { NitroWalletService, BlockchainService } from "src/app/api/services";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/user/services/auth.service";

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
  products: Array<object> = [
    //bronze
    {
      id: 60,
      position: 60,
      collection: "Special",
      name: "TESLA",
      price: 50,
      image: "car60",
      type: "car",
      rank: "low",
      amount: [],
      alt: "nft car Tesla",
    },
    {
      id: 9,
      position: 0,
      free: 6000,
      collection: "Common",
      name: "RHINO",
      price: 600,
      image: "car1",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car rhino",
    },
    {
      id: 10,
      position: 1,
      free: 12000,
      collection: "Common",
      name: "PANTHER",
      price: 600,
      image: "car2",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car panther",
    },
    {
      id: 11,

      position: 2,
      free: 24000,
      collection: "Common",
      name: "ONYX",
      price: 600,
      image: "car3",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car onyx",
    },
    {
      id: 12,
      position: 3,
      free: 48000,
      collection: "Common",
      name: "ZANDER",
      price: 600,
      image: "car4",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car zander",
    },
    {
      id: 13,
      position: 4,
      free: 96000,
      collection: "Common",
      name: "CYBORG",
      price: 600,
      image: "car5",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car cyborg",
    },
    {
      id: 14,
      position: 5,
      free: 192000,
      collection: "Common",
      name: "VULCANIC",
      price: 600,
      image: "car6",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 15,
      position: 24,
      collection: "Common rare",
      name: "LUNA",
      price: 3600,
      image: "car25",
      type: "car",
      rare: true,
      ability1: 0.6,
      ability2: 6,
      amount: [],
      alt: "nft car luna",
    },
    //silver
    {
      id: 16,
      position: 6,
      free: 288000,
      collection: "Super",
      name: "DORIAN",
      price: 1000,
      image: "car7",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car dorian",
    },
    {
      id: 17,
      position: 7,
      free: 432000,
      collection: "Super",
      name: "PANTHER",
      price: 1000,
      image: "car8",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car panther",
    },
    {
      id: 18,
      position: 8,
      free: 648000,
      collection: "Super",
      name: "ONYX",
      price: 1000,
      image: "car9",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car onyx",
    },
    {
      id: 19,
      position: 9,
      free: 972000,
      collection: "Super",
      name: "ZANDER",
      price: 1000,
      image: "car10",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car zander",
    },
    {
      id: 20,
      position: 10,
      free: 1458000,
      collection: "Super",
      name: "PYTHON",
      price: 1000,
      image: "car11",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car python",
    },
    {
      id: 21,
      position: 11,
      free: 2187000,
      collection: "Super",
      name: "VULCANIC",
      price: 1000,
      image: "car12",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 22,
      position: 25,
      collection: "Super rare",
      name: "SILVER KNIGHT",
      price: 6000,
      image: "car26",
      type: "car",
      rare: true,
      ability1: 1.98,
      ability2: 12,
      amount: [],
      alt: "nft car silver knight",
    },
    //gold
    {
      id: 23,
      position: 12,
      free: 3000000,
      collection: "Epic",
      name: "CYBORG",
      price: 1600,
      image: "car13",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car cyborg",
    },
    {
      id: 24,
      position: 13,
      free: 3600000,
      collection: "Epic",
      name: "RHINO",
      price: 1600,
      image: "car14",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car rhino",
    },
    {
      id: 25,
      position: 14,
      free: 4320000,
      collection: "Epic",
      name: "HYPER",
      price: 1600,
      image: "car15",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car hyper",
    },
    {
      id: 26,
      position: 15,
      free: 5184000,
      collection: "Epic",
      name: "BULL",
      price: 1600,
      image: "car16",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car bull",
    },
    {
      id: 27,
      position: 16,
      free: 6220000,
      collection: "Epic",
      name: "PYTHON",
      price: 1600,
      image: "car17",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car python",
    },
    {
      id: 28,
      position: 17,
      free: 7465000,
      collection: "Epic",
      name: "HITMAN",
      price: 1600,
      image: "car18",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      amount: [],
      alt: "nft car hitman",
    },
    {
      id: 29,
      position: 26,
      collection: "Epic rare",
      name: "MIDAS",
      price: 9600,
      image: "car27",
      type: "car",
      rare: true,
      ability1: 4.74,
      ability2: 18,
      amount: [],
      alt: "nft car midas",
    },
    //platinum
    {
      id: 30,
      position: 18,
      free: 8200000,
      collection: "Legendary",
      name: "HYPER",
      price: 2600,
      image: "car19",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car hyper",
    },
    {
      id: 31,
      position: 19,
      free: 9000000,
      collection: "Legendary",
      name: "DORIAN",
      price: 2600,
      image: "car20",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car dorian",
    },
    {
      id: 32,
      position: 20,
      free: 9900000,
      collection: "Legendary",
      name: "VULCANIC",
      price: 2600,
      image: "car21",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car vulcanic",
    },
    {
      id: 33,
      position: 21,
      free: 10890000,
      collection: "Legendary",
      name: "BULL",
      price: 2600,
      image: "car22",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car bull",
    },
    {
      id: 34,
      position: 22,
      free: 12000000,
      collection: "Legendary",
      name: "KNOCKOUT",
      price: 2600,
      image: "car23",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car knockout",
    },
    {
      id: 35,
      position: 23,
      free: 13200000,
      collection: "Legendary",
      name: "LARA",
      price: 2600,
      image: "car24",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      amount: [],
      alt: "nft car lara",
    },
    {
      id: 36,
      position: 27,
      collection: "Legendary rare",
      name: "BLUE STORM",
      price: 15600,
      image: "car28",
      type: "car",
      rare: true,
      ability1: 10.25,
      ability2: 24,
      amount: [],
      alt: "nft car blue storm",
    },
    {
      id: 1,
      collection: "Super",
      name: "Axle",
      price: 100,
      image: "white-trm",
      gif: "white-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Axle",
    },

    {
      id: 2,
      collection: "Super",
      name: "Flash",
      price: 100,
      image: "red-trm",
      gif: "red-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Flash",
    },
    {
      id: 3,
      collection: "Super",
      name: "Octane",
      price: 100,
      image: "blue-trm",
      gif: "blue-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Octane",
    },
    {
      id: 4,
      collection: "Super",
      name: "Punisher",
      price: 100,
      image: "black-trm",
      gif: "black-trm-animation",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
      alt: "nft racer Punisher",
    },
    {
      id: 5,
      collection: "Epic",
      name: "Lady Rich",
      price: 1000,
      image: "lady-rich",
      gif: "lady-rich-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Lady Rich",
    },
    {
      id: 6,
      collection: "Epic",
      name: "Rich Jr.",
      price: 1000,
      image: "bad-boy",
      gif: "bad-boy-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Rich Junior",
    },
    {
      id: 7,
      collection: "Epic",
      name: "Mrs. Rich",
      price: 1000,
      image: "mrs-rich",
      gif: "mrs-rich-animation",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
      alt: "nft racer Mrs. Rich",
    },
    {
      id: 8,
      collection: "Legendary",
      name: "Mr. Rich",
      price: 10000,
      image: "mr-rich",
      gif: "mr-rich-animation",
      type: "racer",
      ability1: "2%",
      ability2: "20%",
      ability3: "18% APY staking",
      rank: "height",
      amount: [],
      alt: "nft racer mr. rich",
    },
    {
      id: 47,
      collection: "",
      name: "Trophy",
      price: "",
      image: "trophy",
      type: "special",
      ability2: "Yearly",
      amount: [],
      alt: "nft yearly trophy",
    },
    {
      id: 48,
      collection: "",
      name: "Ring",
      price: "",
      image: "ring",
      type: "special",
      ability1: "Entry to yearly tournament",
      ability2: "Monthly",
      amount: [],
      alt: "nft monthly ring",
    },
  ];
  nftType = "car";
  driverBalance: any;
  constructor(
    protected notify: NotifiqService,
    private route: ActivatedRoute,
    private identityService: AuthService,
    private ntrsrvc: NitroWalletService,
    private blcksrvc: BlockchainService
  ) {}

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
    if (this.nftType === "car") {
      this.products = this.products.filter(
        (asset) => asset["position"] === this.nftId - 1
      );
      this.nftIoiValue = this.products[0]["price"];
    } else if (this.nftType === "racer") {
      this.products = this.products.filter(
        (asset) => asset["id"] === this.nftId
      );
      this.nftIoiValue = this.products[0]["price"];
    }
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
        currency: this.nftType + "_" + this.nftId,
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
          token_id: this.nftId,
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
