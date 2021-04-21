import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-my-nft-detail",
  templateUrl: "./my-nft-detail.component.html",
  styleUrls: ["./my-nft-detail.component.scss"],
})
export class MyNftDetailComponent implements OnInit {
  gifName = "";
  animationActive = false;
  displayArray = [];
  @Input() assetType = "racer";
  @Input() assetId = 4;
  @Output() marketState = new EventEmitter<number>();
  products: Array<object> = [
    //bronze
    {
      id: 9,
      collection: "Common",
      name: "RHINO",
      prize: "600 IOI",
      image: "car1",
      type: "car",
      amount: [],
    },
    {
      id: 10,
      collection: "Common",
      name: "PANTHER",
      prize: "600 IOI",
      image: "car2",
      type: "car",
      amount: [],
    },
    {
      id: 11,
      collection: "Common",
      name: "ONYX",
      prize: "600 IOI",
      image: "car3",
      type: "car",
      amount: [],
    },
    {
      id: 12,
      collection: "Common",
      name: "ZANDER",
      prize: "600 IOI",
      image: "car4",
      type: "car",
      amount: [],
    },
    {
      id: 13,
      collection: "Common",
      name: "CYBORG",
      prize: "600 IOI",
      image: "car5",
      type: "car",
      amount: [],
    },
    {
      id: 14,
      collection: "Common",
      name: "VULCANIC",
      prize: "600 IOI",
      image: "car6",
      type: "car",
      amount: [],
    },
    {
      id: 15,
      collection: "Common rare",
      name: "LUNA",
      prize: "3 600 IOI",
      image: "car25",
      type: "car",
      rare: true,
      amount: [],
    },
    //silver
    {
      id: 16,
      collection: "Super",
      name: "DORIAN",
      prize: "1 000 IOI",
      image: "car7",
      type: "car",
      amount: [],
    },
    {
      id: 17,
      collection: "Super",
      name: "PANTHER",
      prize: "1 000 IOI",
      image: "car8",
      type: "car",
      amount: [],
    },
    {
      id: 18,
      collection: "Super",
      name: "ONYX",
      prize: "1 000 IOI",
      image: "car9",
      type: "car",
      amount: [],
    },
    {
      id: 19,
      collection: "Super",
      name: "ZANDER",
      prize: "1 000 IOI",
      image: "car10",
      type: "car",
      amount: [],
    },
    {
      id: 20,
      collection: "Super",
      name: "PYTHON",
      prize: "1 000 IOI",
      image: "car11",
      type: "car",
      amount: [],
    },
    {
      id: 21,
      collection: "Super",
      name: "VULCANIC",
      prize: "1 000 IOI",
      image: "car12",
      type: "car",
      amount: [],
    },
    {
      id: 22,
      collection: "Super rare",
      name: "SILVER KNIGHT",
      prize: "6 000 IOI",
      image: "car26",
      type: "car",
      rare: true,
      amount: [],
    },
    //gold
    {
      id: 23,
      collection: "Epic",
      name: "CYBORG",
      prize: "1 600 IOI",
      image: "car13",
      type: "car",
      amount: [],
    },
    {
      id: 24,
      collection: "Epic",
      name: "RHINO",
      prize: "1 600 IOI",
      image: "car14",
      type: "car",
      amount: [],
    },
    {
      id: 25,
      collection: "Epic",
      name: "HYPER",
      prize: "1 600 IOI",
      image: "car15",
      type: "car",
      amount: [],
    },
    {
      id: 26,
      collection: "Epic",
      name: "BULL",
      prize: "1 600 IOI",
      image: "car16",
      type: "car",
      amount: [],
    },
    {
      id: 27,
      collection: "Epic",
      name: "PYTHON",
      prize: "1 600 IOI",
      image: "car17",
      type: "car",
      amount: [],
    },
    {
      id: 28,
      collection: "Epic",
      name: "HITMAN",
      prize: "1 600 IOI",
      image: "car18",
      type: "car",
      amount: [],
    },
    {
      id: 29,
      collection: "Epic rare",
      name: "MIDAS",
      prize: "9 600 IOI",
      image: "car27",
      type: "car",
      rare: true,
      amount: [],
    },
    //platinum
    {
      id: 30,
      collection: "Legendary",
      name: "HYPER",
      prize: "2 600 IOI",
      image: "car19",
      type: "car",
      amount: [],
    },
    {
      id: 31,
      collection: "Legendary",
      name: "DORIAN",
      prize: "2 600 IOI",
      image: "car20",
      type: "car",
      amount: [],
    },
    {
      id: 32,
      collection: "Legendary",
      name: "VULCANIC",
      prize: "2 600 IOI",
      image: "car21",
      type: "car",
      amount: [],
    },
    {
      id: 33,
      collection: "Legendary",
      name: "BULL",
      prize: "2 600 IOI",
      image: "car22",
      type: "car",
      amount: [],
    },
    {
      id: 34,
      collection: "Legendary",
      name: "KNOCKOUT",
      prize: "2 600 IOI",
      image: "car23",
      type: "car",
      amount: [],
    },
    {
      id: 35,
      collection: "Legendary",
      name: "LARA",
      prize: "2 600 IOI",
      image: "car24",
      type: "car",
      amount: [],
    },
    {
      id: 36,
      collection: "Legendary rare",
      name: "BLUE STORM",
      prize: "15 600 IOI",
      image: "car28",
      type: "car",
      rare: true,
      amount: [],
    },
    {
      id: 1,
      collection: "Super",
      name: "Axle",
      prize: "100 IOI",
      image: "white-trm",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
    },

    {
      id: 2,
      collection: "Super",
      name: "Flash",
      prize: "100 IOI",
      image: "red-trm",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
    },
    {
      id: 3,
      collection: "Super",
      name: "Octane",
      prize: "100 IOI",
      image: "blue-trm",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
    },
    {
      id: 4,
      collection: "Super",
      name: "Punisher",
      prize: "100 IOI",
      image: "black-trm",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
      amount: [],
    },
    {
      id: 5,
      collection: "Epic",
      name: "Lady Rich",
      prize: "1 000 IOI",
      image: "lady-rich",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
    },
    {
      id: 6,
      collection: "Epic",
      name: "Rich Jr.",
      prize: "1 000 IOI",
      image: "bad-boy",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
    },
    {
      id: 7,
      collection: "Epic",
      name: "Mrs. Rich",
      prize: "1 000 IOI",
      image: "mrs-rich",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
      amount: [],
    },
    {
      id: 8,
      collection: "Legendary",
      name: "Mr. Rich",
      prize: "10 000 IOI",
      image: "mr-rich",
      type: "racer",
      ability1: "2%",
      ability2: "20%",
      ability3: "18% APY staking",
      rank: "height",
      amount: [],
    },
    {
      id: 37,
      collection: "Race tracks",
      name: "Free track",
      prize: "Coming soon",
      image: "free-track",
      type: "track",
      amount: [],
    },
    {
      id: 38,
      collection: "Race tracks",
      name: "Desert",
      prize: "Coming soon",
      image: "desert",
      type: "track",
      amount: [],
    },
    {
      id: 39,
      collection: "Race tracks",
      name: "Dark forest",
      prize: "Coming soon",
      image: "dark-forest",
      type: "track",
      amount: [],
    },
    {
      id: 40,
      collection: "Race tracks",
      name: "Night city",
      prize: "Coming soon",
      image: "night-city",
      type: "track",
      amount: [],
    },
    {
      id: 41,
      collection: "Race tracks",
      name: "Sea bridge",
      prize: "Coming soon",
      image: "sea-bridge",
      type: "track",
      amount: [],
    },

    {
      id: 42,
      collection: "Race tracks",
      name: "Underground",
      prize: "Coming soon",
      image: "underground",
      type: "track",
      amount: [],
    },
    {
      id: 43,
      collection: "",
      name: "BTC",
      prize: "",
      image: "btc-team",
      type: "team",
      amount: [],
    },

    {
      id: 44,
      collection: "",
      name: "IOI",
      prize: "",
      image: "ioi-team",
      type: "team",
      amount: [],
    },
    {
      id: 45,
      collection: "",
      name: "ALT",
      prize: "",
      image: "alt-team",
      type: "team",
      amount: [],
    },
    {
      id: 46,
      collection: "",
      name: "You",
      prize: "1 000 IOI",
      image: "team-you",
      type: "team",
      amount: [],
    },
    {
      id: 47,
      collection: "",
      name: "Trophy",
      prize: "",
      image: "trophy",
      type: "special",
      ability1: "Yearly",
      amount: [],
    },
    {
      id: 48,
      collection: "",
      name: "Ring",
      prize: "",
      image: "ring",
      type: "special",
      ability1: "Monthly",
      amount: [],
    },
  ];

  constructor() {}

  ngOnInit() {
    this.resolveShowAsset();
  }

  resolveShowAsset() {
    this.displayArray = this.products.filter(
      (asset) => asset["id"] === this.assetId
    );
  }
  backToProducts() {
    this.marketState.emit(1);
  }
  resetAnimationBtn() {
    let element;
    element = document.querySelector(".btn-background");
    element.classList.remove("button-animation");
    void element.offsetWidth;
    element.classList.add("button-animation");
  }
  resetAnimationGif() {
    let element;
    element = document.querySelector(".gif");
    element.classList.remove("show-animation");
    void element.offsetWidth;
    element.classList.add("show-animation");
  }

  activateAnimation() {
    this.gifName = "black-trm-animation";
    this.animationActive = true;
    var random;
    setTimeout(() => {
      this.animationActive = false;
      this.gifName = "pes";
      console.log(this.gifName);
    }, 6500);
  }
}
