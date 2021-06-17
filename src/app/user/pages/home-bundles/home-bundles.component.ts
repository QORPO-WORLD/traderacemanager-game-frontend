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
      name: "Tehmoonwalker",
      link: "@tehMoonwalkeR",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle1",
      avatar: "tehmoon-avatar",
      back: "tehmoon-back",
    },
    {
      id: 2,
      name: "Ash WSB",
      link: "@ashWSBreal",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle2",
      avatar: "ash-avatar",
      back: "ash-back",
    },
    {
      id: 3,
      name: "DAOMaker",
      link: "@TheDaoMaker",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle3",
      avatar: "dao-avatar",
      back: "dao-back",
    },
    {
      id: 4,
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle4",
      avatar: "cryptowizard-avatar",
      back: "cryptowizard-back",
    },
    {
      id: 5,
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle5",
      avatar: "parabolic-avatar",
      back: "parabolic-back",
    },
    {
      id: 6,
      name: "PAID Network",
      link: "@kyle_chasse",
      staking: 6,
      reward: 0.1,
      price: 1000,
      pieces: 100,
      image: "bundle6",
      avatar: "paid-avatar",
      back: "paid-back",
    },
  ];
  constructor() {}

  ngOnInit() {}
}
