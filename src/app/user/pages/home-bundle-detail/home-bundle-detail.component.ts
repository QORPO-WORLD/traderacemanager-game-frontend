import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-home-bundle-detail",
  templateUrl: "./home-bundle-detail.component.html",
  styleUrls: ["./home-bundle-detail.component.scss"],
})
export class HomeBundleDetailComponent implements OnInit {
  products: Array<object> = [
    {
      id: 1,
      position: 0,
      type: "bundle",
      name: "DAOMaker",
      link: "@TheDaoMaker",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-dao",
      racer: "dao-maker",
      car: "car41",
      avatar: "dao-avatar",
      back: "dao-back",
    },
    {
      id: 2,
      position: 1,
      type: "bundle",
      name: "Shreyansh Polygon",
      link: "@shreyansh_27",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-polygon",
      racer: "polygon",
      car: "car42",
    },
    {
      id: 3,
      position: 3,
      type: "bundle",
      name: "Kyle Chasse",
      link: "@kyle_chasse",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-kyle",
      racer: "paid",
      car: "car44",
      avatar: "paid-avatar",
      back: "paid-back",
    },
    {
      id: 4,
      position: 4,
      type: "bundle",
      name: "Ash WSB",
      link: "@ashWSBreal",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-ash",
      racer: "ash-wsb",
      car: "car45",
      avatar: "ash-avatar",
      back: "ash-back",
    },
    {
      id: 5,
      position: 5,
      type: "bundle",
      name: "Tehmoonwalker",
      link: "@tehMoonwalkeR",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-tehmoon",
      racer: "tehmoonwalker",
      car: "car46",
      avatar: "tehmoon-avatar",
      back: "tehmoon-back",
    },

    {
      id: 6,
      position: 6,
      type: "bundle",
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-parabolic",
      racer: "parabolic-guy",
      car: "car47",
      avatar: "parabolic-avatar",
      back: "parabolic-back",
    },
    {
      id: 7,
      position: 9,
      type: "bundle",
      name: "Altcoin Buzz",
      link: "@Altcoinbuzzio",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-altcoin",
      racer: "altcoin-buzz",
      car: "car50",
      avatar: "altcoin-avatar",
      back: "altcoin-back",
    },
    {
      id: 8,
      position: 10,
      type: "bundle",
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-wizard",
      racer: "cryptowizard",
      car: "car51",
      avatar: "cryptowizard-avatar",
      back: "cryptowizard-back",
    },
    {
      id: 9,
      position: 11,
      type: "bundle",
      name: "Kucoin",
      link: "@kucoincom",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-kucoin",
      racer: "kucoin",
      car: "car52",
      avatar: "cryptowizard-avatar",
      back: "cryptowizard-back",
    },

    {
      id: 10,
      position: 12,
      type: "bundle",
      name: "QuickSwap",
      link: "@QuickswapDEX",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-quickswap",
      racer: "quickswap",
      car: "car53",
      avatar: "",
      back: "",
    },
    {
      id: 11,
      position: 13,
      type: "bundle",
      name: "Tech Giants",
      link: "@Crypto_giants",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-techgiants",
      racer: "techgiants",
      car: "car54",
      avatar: "",
      back: "",
    },
    {
      id: 12,
      position: 15,
      type: "bundle",
      name: "Venly",
      link: "@Venly_io",
      nft: 10,
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      yearly: 8760,
      image: "bundle-venly",
      racer: "venly",
      car: "car55",
      avatar: "",
      back: "",
    },
  ];
  infoRoi = false;
  infoRoiYearly = false;
  position: number;

  displayArray = [];
  @Input() assetType = "bundle";
  @Input() assetId = 1;
  @Input() assetPosition = 1;
  @Output() modalActive = new EventEmitter<number>();
  @Output() marketState = new EventEmitter<number>();

  noGifActive = true;
  gifName = "";
  animationActive = false;
  timer = null;

  timer2 = null;

  constructor() {}

  ngOnInit() {
    this.resolveShowAsset();
  }

  showAnimation() {
    this.animationActive = false;
    this.noGifActive = true;
    this.gifName = "none1";
    this.timer2 = setTimeout(() => {
      this.gifName = "black-trm-animation";
      this.animationActive = true;
      this.noGifActive = false;
    }, 1);
    this.timer = setTimeout(() => {
      this.animationActive = false;
      this.gifName = "none1";
      this.noGifActive = true;
    }, 6500);
  }

  activateAnimation() {
    clearTimeout(this.timer2);
    clearTimeout(this.timer);
    this.showAnimation();
  }

  resolveShowAsset() {
    this.displayArray = this.products.filter(
      (asset) => asset["id"] === this.assetId
    );
    this.position = this.displayArray[0]["position"];
  }

  showBuyModal() {
    this.marketState.emit(3);
  }

  showModal(p) {
    this.modalActive.emit(p);
  }
  back() {
    {
      this.marketState.emit(1);
    }
  }
}
