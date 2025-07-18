import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home-bundles",
  templateUrl: "./home-bundles.component.html",
  styleUrls: ["./home-bundles.component.scss"],
})
export class HomeBundlesComponent implements OnInit {
  marketState = 1;
  selectedId = 1;
  selectedPosition: number;
  selectedType = "racers";
  bundles: Array<object> = [
    {
      id: 120,
      name: "DAOMaker",
      link: "@TheDaoMaker",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-dao",
      avatar: "dao-avatar",
      back: "dao-back",
    },
    {
      id: 121,
      name: "Shreyansh Polygon",
      link: "@shreyansh_27",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-polygon",
      avatar: "polygon-avatar",
      back: "polygon-back",
    },
    {
      id: 122,
      name: "Kyle Chasse",
      link: "@kyle_chasse",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-kyle",
      avatar: "paid_avatar",
      back: "paid-back",
    },
    {
      id: 123,
      name: "Ash WSB",
      link: "@ashWSBreal",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-ash",
      avatar: "ash-avatar",
      back: "ash-back",
    },
    {
      id: 124,
      name: "Tehmoonwalker",
      link: "@tehMoonwalkeR",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-tehmoon",
      avatar: "tehmoon-avatar",
      back: "tehmoon-back",
    },
    {
      id: 125,
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-parabolic",
      avatar: "parabolic-avatar",
      back: "parabolic-back",
    },

    {
      id: 126,
      name: "Altcoin Buzz",
      link: "@Altcoinbuzzio",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-altcoin",
      avatar: "altcoin-avatar",
      back: "altcoin-back",
    },
    {
      id: 127,
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-wizard",
      avatar: "cryptowizard-avatar",
      back: "cryptowizard-back",
    },
    {
      id: 128,
      name: "Kucoin",
      link: "@kucoincom",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-kucoin",
      avatar: "kucoin-avatar",
      back: "kucoin-back",
    },
    {
      id: 129,
      name: "QuickSwap",
      link: "@QuickswapDEX",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-quickswap",
      avatar: "quickswap-avatar",
      back: "quickswap-back",
    },
    {
      id: 130,
      name: "Tech Giants",
      link: "@Crypto_giants",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-techgiants",
      avatar: "techgiants-avatar",
      back: "techgiants-back",
    },
    {
      id: 131,
      name: "Venly",
      link: "@Venly_io",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle-venly",
      avatar: "venly-avatar",
      back: "venly-back",
    },
  ];
  constructor() {}

  ngOnInit() {}

  twitterLink(prefix: string) {
    window.open("https://twitter.com/" + prefix, "_blank").focus();
  }
  showAssetBuy(state: number) {
    this.marketState = state;
  }
  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  showAsset(state: number, id: number, type: string, position: number) {
    this.marketState = state;
    this.selectedPosition = position;
    this.selectedId = id;
    this.selectedType = type;
  }
}
