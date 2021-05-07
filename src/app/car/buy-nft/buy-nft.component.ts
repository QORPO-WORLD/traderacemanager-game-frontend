import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "./../../user/services/auth.service";
import { BalanceService } from "./../../common/services/balance.service";
import { NotifyService } from "./../../common/services/notify.service";
import { CarsService } from "../../api/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-buy-nft",
  templateUrl: "./buy-nft.component.html",
  styleUrls: ["./buy-nft.component.scss"],
})
export class BuyNftComponent implements OnInit {
  myIndex: string;

  racers: Array<object> = [
    {
      id: 1,
      collection: "Super",
      name: "Axle",
      prize: "100",
      image: "white-trm",
      extras: { buy_id: 1, value: "100" }
    },
    {
      id: 2,
      collection: "Super",
      name: "Flash",
      prize: "100",
      image: "red-trm",
      extras: { buy_id: 2, value: "100" }
    },
    {
      id: 3,
      collection: "Super",
      name: "Octane",
      prize: "100",
      image: "blue-trm",
      extras: { buy_id: 3, value: "100" }
    },
    {
      id: 4,
      collection: "Super",
      name: "Punisher",
      prize: "100",
      image: "black-trm",
      extras: { buy_id: 4, value: "100" }
    },
    {
      id: 5,
      collection: "Epic",
      name: "Lady Rich",
      prize: "1 000",
      image: "lady-rich",
      extras: { buy_id: 5, value: "1000" }
    },
    {
      id: 6,
      collection: "Epic",
      name: "Rich Jr.",
      prize: "1 000",
      image: "bad-boy",
      extras: { buy_id: 6, value: "1000" }
    },
    {
      id: 7,
      collection: "Epic",
      name: "Mr. Rich",
      prize: "1 000",
      image: "mr-rich",
      extras: { buy_id: 7, value: "1000" }
    },
    {
      id: 8,
      collection: "Legendary",
      name: "Mrs. Rich",
      prize: "10 000",
      image: "mrs-rich",
      extras: { buy_id: 8, value: "10000" }
    },
  ];
  cars: Array<object> = [
    //bronze
    {
      id: 9,
      collection: "Common",
      name: "RHINO",
      prize: "600",
      image: "car1",
      extras: { stake: "0.1", roi: "6", buy_id: 1, value: "600" },
    },
    {
      id: 10,
      collection: "Common",
      name: "PANTHER",
      prize: "600",
      image: "car2",
      extras: { stake: "0.1", roi: "6", buy_id: 2, value: "600" },
    },
    {
      id: 11,
      collection: "Common",
      name: "ONYX",
      prize: "600",
      image: "car3",
      extras: { stake: "0.1", roi: "6", buy_id: 3, value: "600" },
    },
    {
      id: 12,
      collection: "Common",
      name: "ZANDER",
      prize: "600",
      image: "car4",
      extras: { stake: "0.1", roi: "6", buy_id: 4, value: "600" },
    },
    {
      id: 13,
      collection: "Common",
      name: "CYBORG",
      prize: "600",
      image: "car5",
      extras: { stake: "0.1", roi: "6", buy_id: 5, value: "600" },
    },
    {
      id: 14,
      collection: "Common",
      name: "VULCANIC",
      prize: "600",
      image: "car6",
      extras: { stake: "0.1", roi: "6", buy_id: 6, value: "600" },
    },
    {
      id: 15,
      collection: "Common rare",
      name: "LUNA",
      prize: "3 600",
      image: "car25",
      rare: true,
      extras: { stake: "0.6", roi: "6", buy_id: 25, value: "3600" },
    },
    //silver
    {
      id: 16,
      collection: "Super",
      name: "DORIAN",
      prize: "1 000",
      image: "car7",
      extras: { stake: "0.33", roi: "12", buy_id: 7, value: "1000" },
    },
    {
      id: 17,
      collection: "Super",
      name: "PANTHER",
      prize: "1 000",
      image: "car8",
      extras: { stake: "0.33", roi: "12", buy_id: 8, value: "1000" },
    },
    {
      id: 18,
      collection: "Super",
      name: "ONYX",
      prize: "1 000",
      image: "car9",
      extras: { stake: "0.33", roi: "12", buy_id: 9, value: "1000" },
    },
    {
      id: 19,
      collection: "Super",
      name: "ZANDER",
      prize: "1 000",
      image: "car10",
      extras: { stake: "0.33", roi: "12", buy_id: 10, value: "1000" },
    },
    {
      id: 20,
      collection: "Super",
      name: "PYTHON",
      prize: "1 000",
      image: "car11",
      extras: { stake: "0.33", roi: "12", buy_id: 11, value: "1000" },
    },
    {
      id: 21,
      collection: "Super",
      name: "VULCANIC",
      prize: "1 000",
      image: "car12",
      extras: { stake: "0.33", roi: "12", buy_id: 12, value: "1000" },
    },
    {
      id: 22,
      collection: "Super rare",
      name: "SILVER KNIGHT",
      prize: "6 000",
      image: "car26",
      rare: true,
      extras: { stake: "1.98", roi: "12", buy_id: 26, value: "6000" },
    },
    //gold
    {
      id: 23,
      collection: "Epic",
      name: "CYBORG",
      prize: "1 600",
      image: "car13",
      extras: { stake: "0.79", roi: "18", buy_id: 13, value: "1600" },
    },
    {
      id: 24,
      collection: "Epic",
      name: "RHINO",
      prize: "1 600",
      image: "car14",
      extras: { stake: "0.79", roi: "18", buy_id: 14, value: "1600" },
    },
    {
      id: 25,
      collection: "Epic",
      name: "HYPER",
      prize: "1 600",
      image: "car15",
      extras: { stake: "0.79", roi: "18", buy_id: 15, value: "1600" },
    },
    {
      id: 26,
      collection: "Epic",
      name: "BULL",
      prize: "1 600",
      image: "car16",
      extras: { stake: "0.79", roi: "18", buy_id: 16, value: "1600" },
    },
    {
      id: 27,
      collection: "Epic",
      name: "PYTHON",
      prize: "1 600",
      image: "car17",
      extras: { stake: "0.79", roi: "18", buy_id: 17, value: "1600" },
    },
    {
      id: 28,
      collection: "Epic",
      name: "HITMAN",
      prize: "1 600",
      image: "car18",
      extras: { stake: "0.79", roi: "18", buy_id: 18, value: "1600" },
    },
    {
      id: 29,
      collection: "Epic rare",
      name: "MIDAS",
      prize: "9 600",
      image: "car27",
      rare: true,
      extras: { stake: "4.74", roi: "18", buy_id: 27, value: "9600" },
    },
    //platinum
    {
      id: 30,
      collection: "Legendary",
      name: "HYPER",
      prize: "2 600",
      image: "car19",
      extras: { stake: "1.71", roi: "24", buy_id: 19, value: "2600" },
    },
    {
      id: 31,
      collection: "Legendary",
      name: "DORIAN",
      prize: "2 600",
      image: "car20",
      extras: { stake: "1.71", roi: "24", buy_id: 20, value: "2600" },
    },
    {
      id: 32,
      collection: "Legendary",
      name: "VULCANIC",
      prize: "2 600",
      image: "car21",
      extras: { stake: "1.71", roi: "24", buy_id: 21, value: "2600" },
    },
    {
      id: 33,
      collection: "Legendary",
      name: "BULL",
      prize: "2 600",
      image: "car22",
      extras: { stake: "1.71", roi: "24", buy_id: 22, value: "2600" },
    },
    {
      id: 34,
      collection: "Legendary",
      name: "KNOCKOUT",
      prize: "2 600",
      image: "car23",
      extras: { stake: "1.71", roi: "24", buy_id: 23, value: "2600" },
    },
    {
      id: 35,
      collection: "Legendary",
      name: "LARA",
      prize: "2 600",
      image: "car24",
      extras: { stake: "1.71", roi: "24", buy_id: 24, value: "2600" },
    },
    {
      id: 36,
      collection: "Legendary rare",
      name: "BLUE STORM",
      prize: "15 600",
      image: "car28",
      rare: true,
      extras: { stake: "10.25", roi: "24", buy_id: 28, value: "15600" },
    },
  ];
  tracks: Array<object> = [
    {
      id: 37,
      collection: "Race tracks",
      name: "Racer",
      prize: "1152",
      image: "track",
      extras: { stake: "0.1", roi: "6" },
    },
    {
      id: 38,
      collection: "Race tracks",
      name: "Beach Race",
      prize: "1152",
      image: "track",
      extras: { stake: "0.1", roi: "6" },
    },
    {
      id: 39,
      collection: "Race tracks",
      name: "Forest Race",
      prize: "1152",
      image: "track",
      extras: { stake: "0.1", roi: "6" },
    },
    {
      id: 40,
      collection: "Race tracks",
      name: "Space Race",
      prize: "1152",
      image: "track",
      extras: { stake: "0.1", roi: "6" },
    },
  ];

  displayArray = [];
  @Input() assetType = "racer";
  @Input() assetId = 1;
  amount = 1;
  myDriverBalances: any;
  tokenSelected = 'ioi';
  constructor(
    protected api: CarsService,
    private balanceService: BalanceService,
    private identityService: AuthService,
    private notify: NotifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.resolveBuyAsset();
    this.getMydriverBalances();
  }

  resolveBuyAsset() {
    if (this.assetType === "racer") {
      this.displayArray = this.racers;
    }
    if (this.assetType === "car") {
      this.displayArray = this.cars;
    }
    if (this.assetType === "track") {
      this.displayArray = this.tracks;
    }
    this.displayArray = this.displayArray.filter(
      (asset) => asset.id === this.assetId
    );
  }

  plusAmount() {
    this.amount++;
  }

  minusAmount() {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  buyCarFromGarage(index: number) {

    if (this.assetType === 'racer') {
      this.api.racerBuyList({ "tier": index, "amount": this.amount, "currency": this.tokenSelected }).subscribe((datax) => {
        const data: any = datax;
        setTimeout(() => {
          this.notifyChangedBalance();
          this.router.navigate(["/profile/my-profile"]);
          this.notify.error("You have bought a new racer!");
        }, 1000);
      });

      return;
    }
    this.api.carsBuyList({ "tier": index, "amount": this.amount, "currency": this.tokenSelected }).subscribe((datax) => {
      const data: any = datax;
      setTimeout(() => {
        this.notifyChangedBalance();
        this.router.navigate(["/profile/my-profile"]);
        this.notify.error("You have bought a new car!");
      }, 1000);
    });
  }

  notifyChangedBalance() {
    this.identityService.updateBalance();
    this.balanceService.balanceHasbeenChanged();
  }

  getMydriverBalances() {
    this.myDriverBalances = this.identityService.getBalance();
  }

  lowBalance(){
    this.notify.error('Insufficient balance');
  }
}
