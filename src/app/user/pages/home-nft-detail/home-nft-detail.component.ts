import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home-nft-detail",
  templateUrl: "./home-nft-detail.component.html",
  styleUrls: ["./home-nft-detail.component.scss"],
})
export class HomeNftDetailComponent implements OnInit {
  typeObserver: Subscription;
  assetType: any;
  assetId: number;
  assetPage: number;
  assetStartPage: number;
  assetFilter: any;
  displayArray = [];
  menuActive = 1;
  isMenuActive = false;
  activeMenu = 0;
  abilities = false;
  actualPage;
  startPage;
  filter;
  display = innerWidth;

  products: Array<object> = [
    {
      id: 1,
      collection: "Bronze Collection",
      name: "Axle",
      prize: 100,
      image: "white-mn",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
    },
    {
      id: 2,
      collection: "Bronze Collection",
      name: "Flash",
      prize: 100,
      image: "red-trm-small",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
    },
    {
      id: 3,
      collection: "Bronze Collection",
      name: "Octane",
      prize: 100,
      image: "bluetrm",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
    },
    {
      id: 4,
      collection: "Bronze Collection",
      name: "Punisher",
      prize: 100,
      image: "black-trm-small",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
    },
    {
      id: 5,
      collection: "Bronze Collection",
      name: "Lady Rich",
      prize: 1000,
      image: "lady-rich",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
    },
    {
      id: 6,
      collection: "Bronze Collection",
      name: "Rich Jr.",
      prize: 1000,
      image: "bad-boy",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
    },
    {
      id: 7,
      collection: "Bronze Collection",
      name: "Mrs. Rich",
      prize: 1000,
      image: "mrs-rich",
      type: "racer",
      ability1: "1.5%",
      ability2: "15%",
      rank: "normal",
    },
    {
      id: 8,
      collection: "Bronze Collection",
      name: "Mr. Rich",
      prize: 10000,
      image: "mr-rich-shop",
      type: "racer",
      ability1: "2%",
      ability2: "20%",
      rank: "height",
    },

    //bronze
    {
      id: 9,
      collection: "Bronze Collection",
      name: "RHINO",
      prize: "600",
      image: "car1",
      type: "car",
      rank: "bronze",
    },
    {
      id: 10,
      collection: "Bronze Collection",
      name: "PANTHER",
      prize: "600",
      image: "car2",
      type: "car",
      rank: "bronze",
    },
    {
      id: 11,
      collection: "Bronze Collection",
      name: "ONYX",
      prize: "600",
      image: "car3",
      type: "car",
      rank: "bronze",
    },
    {
      id: 12,
      collection: "Bronze Collection",
      name: "ZANDER",
      prize: "600",
      image: "car4",
      type: "car",
      rank: "bronze",
    },
    {
      id: 13,
      collection: "Bronze Collection",
      name: "CYBORG",
      prize: "600",
      image: "car5",
      type: "car",
      rank: "bronze",
    },
    {
      id: 14,
      collection: "Bronze Collection",
      name: "VULCANIC",
      prize: "600",
      image: "car6",
      type: "car",
      rank: "bronze",
    },
    {
      id: 15,
      collection: "Bronze Collection Rare",
      name: "LUNA",
      prize: "3 600",
      image: "car25",
      type: "car",
      rare: true,
      rank: "bronze",
    },
    //silver
    {
      id: 16,
      collection: "Silver Collection",
      name: "DORIAN",
      prize: "1000",
      image: "car7",
      type: "car",
      rank: "silver",
    },
    {
      id: 17,
      collection: "Silver Collection",
      name: "PANTHER",
      prize: "1000",
      image: "car8",
      type: "car",
      rank: "silver",
    },
    {
      id: 18,
      collection: "Silver Collection",
      name: "HYPER",
      prize: "1000",
      image: "car9",
      type: "car",
      rank: "silver",
    },
    {
      id: 19,
      collection: "Silver Collection",
      name: "ZANDER",
      prize: "1000",
      image: "car10",
      type: "car",
      rank: "silver",
    },
    {
      id: 20,
      collection: "Silver Collection",
      name: "PYTHON",
      prize: "1000",
      image: "car11",
      type: "car",
      rank: "silver",
    },
    {
      id: 21,
      collection: "Silver Collection",
      name: "VULCANIC",
      prize: "1000",
      image: "car12",
      type: "car",
      rank: "silver",
    },
    {
      id: 22,
      collection: "Silver Collection Rare",
      name: "SILVER KNIGHT",
      prize: "6000",
      image: "car26",
      type: "car",
      rare: true,
      rank: "silver",
    },
    //gold
    {
      id: 23,
      collection: "Gold Collection",
      name: "CYBORG",
      prize: "1 600",
      image: "car13",
      type: "car",
      rank: "gold",
    },
    {
      id: 24,
      collection: "Gold Collection",
      name: "RHINO",
      prize: "1 600",
      image: "car14",
      type: "car",
      rank: "gold",
    },
    {
      id: 25,
      collection: "Gold Collection",
      name: "HYPER",
      prize: "1 600",
      image: "car15",
      type: "car",
      rank: "gold",
    },
    {
      id: 26,
      collection: "Gold Collection",
      name: "BULL",
      prize: "1 600",
      image: "car16",
      type: "car",
      rank: "gold",
    },
    {
      id: 27,
      collection: "Gold Collection",
      name: "PYTHON",
      prize: "1 600",
      image: "car17",
      type: "car",
      rank: "gold",
    },
    {
      id: 28,
      collection: "Gold Collection",
      name: "HITMAN",
      prize: "1 600",
      image: "car18",
      type: "car",
      rank: "gold",
    },
    {
      id: 29,
      collection: "Gold Collection Rare",
      name: "MIDAS",
      prize: "9 600",
      image: "car27",
      type: "car",
      rare: true,
      rank: "gold",
    },
    //platinum
    {
      id: 30,
      collection: "Platinum Collection",
      name: "ONYX",
      prize: "2 600",
      image: "car19",
      type: "car",
      rank: "platinum",
    },
    {
      id: 31,
      collection: "Platinum Collection",
      name: "DORIAN",
      prize: "2 600",
      image: "car20",
      type: "car",
      rank: "platinum",
    },
    {
      id: 32,
      collection: "Platinum Collection",
      name: "VULCANIC",
      prize: "2 600",
      image: "car21",
      type: "car",
      rank: "platinum",
    },
    {
      id: 33,
      collection: "Platinum Collection",
      name: "BULL",
      prize: "2 600",
      image: "car22",
      type: "car",
      rank: "platinum",
    },
    {
      id: 34,
      collection: "Platinum Collection",
      name: "KNOCKOUT",
      prize: "2 600",
      image: "car23",
      type: "car",
      rank: "platinum",
    },
    {
      id: 35,
      collection: "Platinum Collection",
      name: "LARA",
      prize: "2 600",
      image: "car24",
      type: "car",
      rank: "platinum",
    },
    {
      id: 36,
      collection: "Platinum Collection Rare",
      name: "BLUE STORM",
      prize: "15 600",
      image: "car28",
      type: "car",
      rare: true,
      rank: "platinum",
    },
    {
      id: 37,
      collection: "Free",
      name: "Free track",
      prize: "Coming soon",
      image: "free-track-small",
      type: "track",

      ability1: "2 minutes",
      ability2: "Random events",
    },
    {
      id: 38,
      collection: "Beginner",
      name: "Desert",
      prize: "Coming soon",
      image: "desert-small",
      type: "track",
      bet: "1 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
    },
    {
      id: 39,
      collection: "Semi PRO",
      name: "Dark forest",
      prize: "Coming soon",
      image: "dark-forest-small",
      type: "track",
      bet: "5 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
    },
    {
      id: 40,
      collection: "Professional",
      name: "Night City",
      prize: "Coming soon",
      image: "night-city-small",
      type: "track",
      bet: "10 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
    },
    {
      id: 41,
      collection: "Expert",
      name: "Sea bridge",
      prize: "Coming soon",
      image: "sea-bridge-small",
      type: "track",
      bet: "50 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
    },

    {
      id: 42,
      collection: "Master",
      name: "Underground",
      prize: "Coming soon",
      image: "underground-small",
      type: "track",
      bet: "100 IOI",
      ability1: "2 minutes",
      ability2: "Random events",
    },
    {
      id: 43,
      collection: "",
      name: "BTC",
      prize: "",
      image: "btc-team-small",
      type: "team",
    },
    {
      id: 44,
      collection: "",
      name: "IOI",
      prize: "",
      image: "ioi-team-small",
      type: "team",
    },
    {
      id: 45,
      collection: "",
      name: "ALT",
      prize: "",
      image: "alt-team-small",
      type: "team",
    },
    {
      id: 46,
      collection: "",
      name: "Team You",
      prize: "",
      image: "team-you-small",
      type: "team",
    },
  ];

  width() {
    this.display = innerWidth;
  }
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getAssetType();
  }

  filterRacers() {
    this.products = this.products.filter((item) => item["type"] === "racer");
  }
  filterCars() {
    this.products = this.products.filter((item) => item["type"] === "car");
  }
  filterTracks() {
    this.products = this.products.filter((item) => item["type"] === "track");
  }
  filterTeams() {
    this.products = this.products.filter((item) => item["type"] === "team");
  }

  getAssetType() {
    this.typeObserver = this.route.queryParams.subscribe((params) => {
      this.assetType = params["type"];
      this.assetId = +params["id"];
      this.assetPage = +params["page"];
      this.assetStartPage = +params["startPage"];
      this.assetFilter = params["filter"];
      if (!this.assetFilter) {
        this.assetType = "all";
      }
      if (!this.assetType) {
        this.assetType = "racer";
      }
      if (!this.assetId) {
        this.assetId = 1;
      }
      if (!this.assetPage) {
        this.assetPage = 1;
      }
      if (!this.assetStartPage) {
        this.assetStartPage = 0;
      }

      if (this.assetType === "racer") {
        this.filterRacers();
        this.displayArray = this.products;
      }
      if (this.assetType === "car") {
        this.filterCars();
        this.displayArray = this.products;
      }
      if (this.assetType === "track") {
        this.filterTracks();
        this.displayArray = this.products;
      }
      if (this.assetType === "team") {
        this.filterTeams();
        this.displayArray = this.products;
      }
      this.displayArray = this.displayArray.filter(
        (asset) => asset.id === this.assetId
      );
      this.actualPage = this.assetPage;
      this.startPage = this.assetStartPage;
      this.filter = this.assetFilter;
    });
  }
  activateMenu() {
    if (this.activeMenu === 0) {
      this.isMenuActive = true;
      this.activeMenu = 1;
    } else {
      this.isMenuActive = false;
      this.activeMenu = 0;
    }
  }
  reset() {
    let element;
    element = document.querySelector(".hamburger");
    element.classList.remove("hamburgerclick");
    void element.offsetWidth;
    element.classList.add("hamburgerclick");
  }
  resetAbilities() {
    let element;
    element = document.querySelector(".plus");
    element.classList.remove("plus-click");
    void element.offsetWidth;
    element.classList.add("plus-click");
  }
  showAbilities() {
    this.abilities = !this.abilities;
  }
}
