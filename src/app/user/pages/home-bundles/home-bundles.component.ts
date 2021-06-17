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
      link: "@tehmoonwalker",
      staking: 6,
      reward: 0.1,
      price: 1000,
      image: "",
      avatar: "",
    },
    {
      id: 2,
      name: "Ash WSB",
      link: "@ashWSBreal",
      staking: 6,
      reward: 0.1,
      price: 1000,
      image: "",
      avatar: "",
    },
    {
      id: 3,
      name: "DAOMaker",
      link: "@TheDaoMaker",
      staking: 6,
      reward: 0.1,
      price: 1000,
      image: "",
      avatar: "",
    },
    {
      id: 4,
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      staking: 6,
      reward: 0.1,
      price: 1000,
      image: "",
      avatar: "",
    },
    {
      id: 5,
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      staking: 6,
      reward: 0.1,
      price: 1000,
      image: "",
      avatar: "",
    },
    {
      id: 6,
      name: "PAID Network",
      link: "@paid_network",
      staking: 6,
      reward: 0.1,
      price: 1000,
      image: "",
      avatar: "",
    },
  ];
  constructor() {}

  ngOnInit() {}
}
