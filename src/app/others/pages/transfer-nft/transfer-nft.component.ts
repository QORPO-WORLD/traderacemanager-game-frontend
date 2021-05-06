import { NotifiqService } from "./../../../common/services/notifiq.service";
import { NitroWalletService } from "src/app/api/services";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/user/services/auth.service";

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
  products: Array<object> = [
    //bronze
    {
      id: 9,
      position: 0,
      free: 6000,
      collection: "Common",
      name: "RHINO",
      prize: "600 IOI",
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
      prize: "600 IOI",
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
      prize: "600 IOI",
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
      prize: "600 IOI",
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
      prize: "600 IOI",
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
      prize: "600 IOI",
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
      prize: "3 600 IOI",
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
      prize: "1 000 IOI",
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
      prize: "1 000 IOI",
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
      prize: "1 000 IOI",
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
      prize: "1 000 IOI",
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
      prize: "1 000 IOI",
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
      prize: "1 000 IOI",
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
      prize: "6 000 IOI",
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
      prize: "1 600 IOI",
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
      prize: "1 600 IOI",
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
      prize: "1 600 IOI",
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
      prize: "1 600 IOI",
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
      prize: "1 600 IOI",
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
      prize: "1 600 IOI",
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
      prize: "9 600 IOI",
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
      prize: "2 600 IOI",
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
      prize: "2 600 IOI",
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
      prize: "2 600 IOI",
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
      prize: "2 600 IOI",
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
      prize: "2 600 IOI",
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
      prize: "2 600 IOI",
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
      prize: "15 600 IOI",
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
      prize: "100 IOI",
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
      prize: "100 IOI",
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
      prize: "100 IOI",
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
      prize: "100 IOI",
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
      prize: "1 000 IOI",
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
      prize: "1 000 IOI",
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
      prize: "1 000 IOI",
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
      prize: "10 000 IOI",
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
      id: 37,
      collection: "Race tracks",
      name: "Free track",
      prize: "Coming soon",
      image: "free-track",
      type: "track",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track free",
    },
    {
      id: 38,
      collection: "Race tracks",
      name: "Desert",
      prize: "Coming soon",
      image: "desert",
      type: "track",
      bet: "1 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track desert",
    },
    {
      id: 39,
      collection: "Race tracks",
      name: "Dark forest",
      prize: "Coming soon",
      image: "dark-forest",
      type: "track",
      bet: "5 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track dark forest",
    },
    {
      id: 40,
      collection: "Race tracks",
      name: "Night city",
      prize: "Coming soon",
      image: "night-city",
      type: "track",
      bet: "10 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track night city",
    },
    {
      id: 41,
      collection: "Race tracks",
      name: "Sea bridge",
      prize: "Coming soon",
      image: "sea-bridge",
      type: "track",
      bet: "50 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track sea bridge",
    },

    {
      id: 42,
      collection: "Race tracks",
      name: "Underground",
      prize: "Coming soon",
      image: "underground",
      type: "track",
      bet: "100 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
      amount: [],
      alt: "nft track underground",
    },
    {
      id: 43,
      collection: "",
      name: "BTC",
      prize: "",
      image: "btc-team",
      type: "team",
      amount: [],
      alt: "nft team btc",
    },

    {
      id: 44,
      collection: "",
      name: "IOI",
      prize: "",
      image: "ioi-team",
      type: "team",
      amount: [],
      alt: "nft team ioi",
    },
    {
      id: 45,
      collection: "",
      name: "ALT",
      prize: "",
      image: "alt-team",
      type: "team",
      amount: [],
      alt: "nft team alt",
    },
    {
      id: 46,
      collection: "",
      name: "You",
      prize: "1 000 IOI",
      image: "team-you",
      type: "team",
      ability1: "50 IOI",
      ability2: "20%",
      amount: [],
      alt: "nft tea you",
    },
    {
      id: 47,
      collection: "",
      name: "Trophy",
      prize: "",
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
      prize: "",
      image: "ring",
      type: "special",
      ability1: "Entry to yearly tournament",
      ability2: "Monthly",
      amount: [],
      alt: "nft monthly ring",
    },
  ];
  constructor(
    protected notify: NotifiqService,
    private route: ActivatedRoute,
    private identityService: AuthService,
    private ntrsrvc: NitroWalletService
  ) {}

  ngOnInit() {
    this.getNftId();
    this.getUser();
    this.getAccountValue();
  }

  getNftId() {
    this.routeObserver = this.route.queryParams.subscribe((params) => {
      this.nftId = +params["nftId"];
      if (params["nftId"].length <= 0) {
        this.nftId = 1;
      }
    });
    this.resolveCarEdition(this.nftId);
    this.resolveShowAsset();
  }

  getUser() {
    this.nickname = this.identityService.getStorageIdentity().nickname;
  }
  resolveShowAsset() {
    this.products = this.products.filter(
      (asset) => asset["position"] === this.nftId - 1
    );
  }

  getAccountValue() {
    const data = this.identityService.getBalance();
    this.accountValue = data.game_wallet_ioi * 0.4;
  }

  resolveCarEdition(id: number) {
    if (id < 7 || id == 25) {
      this.nftEdition = 1;
      this.nftIoiValue = 600;
      if (id == 25) {
        this.nftIoiValue = 3600;
      }
    } else if ((id >= 7 && id < 13) || id == 26) {
      this.nftEdition = 2;
      this.nftIoiValue = 1000;
      if (id == 26) {
        this.nftIoiValue = 6000;
      }
    } else if ((id >= 13 && id < 19) || id == 27) {
      this.nftEdition = 3;
      this.nftIoiValue = 1600;
      if (id == 27) {
        this.nftIoiValue = 9600;
      }
    } else if ((id >= 19 && id < 25) || id == 28) {
      this.nftEdition = 4;
      this.nftIoiValue = 2600;
      if (id == 28) {
        this.nftIoiValue = 15600;
      }
    }
  }

  transferIoiToken() {
    this.transferSubscription = this.ntrsrvc
      .nitroWalletTransferCreate({
        currency: "car_" + this.nftId.toString(),
        amount: this.amount,
        mode: "races2nitro",
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
