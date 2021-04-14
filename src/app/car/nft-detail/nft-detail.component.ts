import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: "app-nft-detail",
  templateUrl: "./nft-detail.component.html",
  styleUrls: ["./nft-detail.component.scss"],
})
export class NftDetailComponent implements OnInit {
  racers: Array<object> = [
    {
      id: 1,
      collection: "Bronze Collection",
      name: "Axle",
      prize: "100",
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
      prize: "100",
      image: "red-trm",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
    },
    {
      id: 3,
      collection: "Bronze Collection",
      name: "Octane",
      prize: "100",
      image: "blue-trm",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
    },
    {
      id: 4,
      collection: "Bronze Collection",
      name: "Punisher",
      prize: "100",
      image: "black-trm",
      type: "racer",
      ability1: "1%",
      ability2: "10%",
      rank: "low",
    },
    {
      id: 5,
      collection: "Bronze Collection",
      name: "Lady Rich",
      prize: "1 000",
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
      prize: "1 000",
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
      prize: "1 000",
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
      prize: "10 000",
      image: "mr-rich",
      type: "racer",
      ability1: "2%",
      ability2: "20%",
      ability3: "18% APY staking",
      rank: "height",
    },
  ];
  cars: Array<object> = [
    //bronze
    {
      id: 9,
      collection: "Bronze Collection",
      name: "RHINO",
      prize: "600",
      image: "car1",
      extras: { stake: "0.1", roi: "6", value: "600" },
    },
    {
      id: 10,
      collection: "Bronze Collection",
      name: "PANTHER",
      prize: "600",
      image: "car2",
      extras: { stake: "0.1", roi: "6", value: "600" },
    },
    {
      id: 11,
      collection: "Bronze Collection",
      name: "ONYX",
      prize: "600",
      image: "car3",
      extras: { stake: "0.1", roi: "6", value: "600" },
    },
    {
      id: 12,
      collection: "Bronze Collection",
      name: "ZANDER",
      prize: "600",
      image: "car4",
      extras: { stake: "0.1", roi: "6", value: "600" },
    },
    {
      id: 13,
      collection: "Bronze Collection",
      name: "CYBORG",
      prize: "600",
      image: "car5",
      extras: { stake: "0.1", roi: "6", value: "600" },
    },
    {
      id: 14,
      collection: "Bronze Collection",
      name: "VULCANIC",
      prize: "600",
      image: "car6",
      extras: { stake: "0.1", roi: "6", value: "600" },
    },
    {
      id: 15,
      collection: "Bronze Collection Rare",
      name: "LUNA",
      prize: "3 600",
      image: "car25",
      rare: true,
      extras: { stake: "0.6", roi: "6", value: "3600" },
    },
    //silver
    {
      id: 16,
      collection: "Silver Collection",
      name: "DORIAN",
      prize: "1 000",
      image: "car7",
      extras: { stake: "0.33", roi: "12", value: "1000" },
    },
    {
      id: 17,
      collection: "Silver Collection",
      name: "PANTHER",
      prize: "1 000",
      image: "car8",
      extras: { stake: "0.33", roi: "12", value: "1000" },
    },
    {
      id: 18,
      collection: "Silver Collection",
      name: "ONYX",
      prize: "1 000",
      image: "car9",
      extras: { stake: "0.33", roi: "12", value: "1000" },
    },
    {
      id: 19,
      collection: "Silver Collection",
      name: "ZANDER",
      prize: "1 000",
      image: "car10",
      extras: { stake: "0.33", roi: "12", value: "1000" },
    },
    {
      id: 20,
      collection: "Silver Collection",
      name: "PYTHON",
      prize: "1 000",
      image: "car11",
      extras: { stake: "0.33", roi: "12", value: "1000" },
    },
    {
      id: 21,
      collection: "Silver Collection",
      name: "VULCANIC",
      prize: "1 000",
      image: "car12",
      extras: { stake: "0.33", roi: "12", value: "1000" },
    },
    {
      id: 22,
      collection: "Silver Collection Rare",
      name: "SILVER KNIGHT",
      prize: "6 000",
      image: "car26",
      rare: true,
      extras: { stake: "1.98", roi: "12", value: "6000" },
    },
    //gold
    {
      id: 23,
      collection: "Gold Collection",
      name: "CYBORG",
      prize: "1 600",
      image: "car13",
      extras: { stake: "0.79", roi: "18", value: "1600" },
    },
    {
      id: 24,
      collection: "Gold Collection",
      name: "RHINO",
      prize: "1 600",
      image: "car14",
      extras: { stake: "0.79", roi: "18", value: "1600" },
    },
    {
      id: 25,
      collection: "Gold Collection",
      name: "HYPER",
      prize: "1 600",
      image: "car15",
      extras: { stake: "0.79", roi: "18", value: "1600" },
    },
    {
      id: 26,
      collection: "Gold Collection",
      name: "BULL",
      prize: "1 600",
      image: "car16",
      extras: { stake: "0.79", roi: "18", value: "1600" },
    },
    {
      id: 27,
      collection: "Gold Collection",
      name: "PYTHON",
      prize: "1 600",
      image: "car17",
      extras: { stake: "0.79", roi: "18", value: "1600" },
    },
    {
      id: 28,
      collection: "Gold Collection",
      name: "HITMAN",
      prize: "1 600",
      image: "car18",
      extras: { stake: "0.79", roi: "18", value: "1600" },
    },
    {
      id: 29,
      collection: "Gold Collection Rare",
      name: "MIDAS",
      prize: "9 600",
      image: "car27",
      rare: true,
      extras: { stake: "4.74", roi: "18", value: "9600" },
    },
    //platinum
    {
      id: 30,
      collection: "Platinum Collection",
      name: "HYPER",
      prize: "2 600",
      image: "car19",
      extras: { stake: "1.71", roi: "24", value: "2600" },
    },
    {
      id: 31,
      collection: "Platinum Collection",
      name: "DORIAN",
      prize: "2 600",
      image: "car20",
      extras: { stake: "1.71", roi: "24", value: "2600" },
    },
    {
      id: 32,
      collection: "Platinum Collection",
      name: "VULCANIC",
      prize: "2 600",
      image: "car21",
      extras: { stake: "1.71", roi: "24", value: "2600" },
    },
    {
      id: 33,
      collection: "Platinum Collection",
      name: "BULL",
      prize: "2 600",
      image: "car22",
      extras: { stake: "1.71", roi: "24", value: "2600" },
    },
    {
      id: 34,
      collection: "Platinum Collection",
      name: "KNOCKOUT",
      prize: "2 600",
      image: "car23",
      extras: { stake: "1.71", roi: "24", value: "2600" },
    },
    {
      id: 35,
      collection: "Platinum Collection",
      name: "LARA",
      prize: "2 600",
      image: "car24",
      extras: { stake: "1.71", roi: "24", value: "2600" },
    },
    {
      id: 36,
      collection: "Platinum Collection Rare",
      name: "BLUE STORM",
      prize: "15 600",
      image: "car28",
      rare: true,
      extras: { stake: "10.25", roi: "24", value: "15600" },
    },
  ];
  tracks: Array<object> = [
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
  ];
  teams: Array<object> = [
    {
      id: 43,
      collection: "",
      name: "BTC",
      prize: "",
      image: "btc-team",
      type: "team",
    },
    {
      id: 44,
      collection: "",
      name: "IOI",
      prize: "",
      image: "ioi-team",
      type: "team",
    },
    {
      id: 45,
      collection: "",
      name: "ALT",
      prize: "",
      image: "alt-team",
      type: "team",
    },
    {
      id: 46,
      collection: "",
      name: "You",
      prize: "1 000 IOI",
      image: "team-you-small",
      type: "team",
    },
  ];

  displayArray = [];
  @Input() assetType = "racer";
  @Input() assetId = 1;
  @Output() marketState = new EventEmitter<number>();
  myDriverBalances: any;

  constructor(private identityService: AuthService) {}

  ngOnInit() {
    this.resolveShowAsset();
    this.getMydriverBalances();
  }

  resolveShowAsset() {
    if (this.assetType === "racer") {
      this.displayArray = this.racers;
    }
    if (this.assetType === "car") {
      this.displayArray = this.cars;
    }
    if (this.assetType === "track") {
      this.displayArray = this.tracks;
    }
    if (this.assetType === "team") {
      this.displayArray = this.teams;
    }
    this.displayArray = this.displayArray.filter(
      (asset) => asset.id === this.assetId
    );
  }

  showBuyModal() {
    this.marketState.emit(3);
  }

  getMydriverBalances() {
    this.myDriverBalances = this.identityService.getBalance();
  }

}
