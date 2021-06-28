import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home-bundles",
  templateUrl: "./home-bundles.component.html",
  styleUrls: ["./home-bundles.component.scss"],
})
export class HomeBundlesComponent implements OnInit {
  bundles: Array<object> = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
  ];
  constructor() {}

  ngOnInit() {}

  twitterLink(prefix: string) {
    window.open("https://twitter.com/" + prefix, "_blank").focus();
  }
}
