import { MyCars } from "./../../../api/models/my-cars";
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { CarsService, DriversService } from "../../../api/services";
import { NotifyService } from "./../../../common/services/notify.service";
import { AuthService } from "./../../../user/services/auth.service";
import { BalanceService } from "./../../../common/services/balance.service";
import { Subscription } from "rxjs";
import { NotifiqService } from "./../../../common/services/notifiq.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-nft",
  templateUrl: "./my-nft.component.html",
  styleUrls: ["./my-nft.component.scss"],
})
export class MyNftComponent implements OnInit, OnChanges {
  timeoutPrev: any;
  timeoutNext: any;
  showDeposit = false;
  cars: any;
  buyedCar: any;
  editionIndex = 1;
  myCars: any;
  carsSorted: any;
  allCars: any;
  timeoutPage: any;
  animation = 0;
  animateArrow = false;
  animateArrowRight = false;

  products = [
    //
    //TRM CARS ID 1,..,39
    //
    //Common
    {
      id: 1,
      tier: 60,
      price: 50,
      name: "TESLA",
      image: "car60",
      type: "car",
      rank: "low",
      ability3: 8760,
      amount: 0,
      alt: "nft car Tesla",
    },
    {
      id: 2,
      tier: 1,
      collection: "Common",
      name: "RHINO",
      price: 600,
      image: "car1",
      gif: "car1-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      amount: 0,
      alt: "nft car rhino",
    },
    {
      id: 3,
      tier: 2,
      collection: "Common",
      name: "PANTHER",
      price: 600,
      image: "car2",
      gif: "car2-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      amount: 0,
      alt: "nft car panther",
    },
    {
      id: 4,
      tier: 3,
      collection: "Common",
      name: "ONYX",
      price: 600,
      image: "car3",
      gif: "car3-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      amount: 0,
      alt: "nft car onyx",
    },
    {
      id: 5,
      tier: 4,
      collection: "Common",
      name: "ZANDER",
      price: 600,
      image: "car4",
      gif: "car4-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      amount: 0,
      alt: "nft car zander",
    },
    {
      id: 6,
      tier: 5,
      collection: "Common",
      name: "CYBORG",
      price: 600,
      image: "car5",
      type: "car",
      gif: "car5-animation",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      amount: 0,
      alt: "nft car cyborg",
    },
    {
      id: 7,
      tier: 6,
      collection: "Common",
      name: "VULCANIC",
      price: 600,
      image: "car6",
      gif: "car6-animation",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      amount: 0,
      alt: "nft car vulcanic",
    },
    {
      id: 8,
      tier: 25,
      collection: "Common rare",
      name: "LUNA",
      price: 3600,
      image: "car25",
      gif: "car25-animation",
      type: "car",
      rare: true,
      ability1: 0.6,
      ability2: 6,
      ability3: "Moon",
      amount: 0,
      alt: "nft car luna",
    },
    //super
    {
      id: 9,
      tier: 7,
      collection: "Super",
      name: "DORIAN",
      price: 1000,
      image: "car7",
      gif: "car7-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      ability3: 10526,
      amount: 0,
      alt: "nft car dorian",
    },
    {
      id: 10,
      tier: 8,
      collection: "Super",
      name: "PANTHER",
      price: 1000,
      image: "car8",
      gif: "car8-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      ability3: 10526,
      amount: 0,
      alt: "nft car panther",
    },
    {
      id: 11,
      tier: 9,
      collection: "Super",
      name: "ONYX",
      price: 1000,
      image: "car9",
      gif: "car9-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      ability3: 10526,
      amount: 0,
      alt: "nft car onyx",
    },
    {
      id: 12,
      tier: 10,
      collection: "Super",
      name: "ZANDER",
      price: 1000,
      image: "car10",
      gif: "car10-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      ability3: 10526,
      amount: 0,
      alt: "nft car zander",
    },
    {
      id: 13,
      tier: 11,
      collection: "Super",
      name: "PYTHON",
      price: 1000,
      image: "car11",
      gif: "car11-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      ability3: 10526,
      amount: 0,
      alt: "nft car python",
    },
    {
      id: 14,
      tier: 12,
      collection: "Super",
      name: "VULCANIC",
      price: 1000,
      image: "car12",
      gif: "car12-animation",
      type: "car",
      ability1: 0.33,
      ability2: 12,
      ability3: 10526,
      amount: 0,
      alt: "nft car vulcanic",
    },
    {
      id: 15,
      tier: 26,
      collection: "Super rare",
      name: "SILVER KNIGHT",
      price: 6000,
      image: "car26",
      gif: "car26-animation",
      type: "car",
      rare: true,
      ability1: 1.98,
      ability2: 12,
      ability3: "Moon",
      amount: 0,
      alt: "nft car silver knight",
    },
    //epic
    {
      id: 16,
      tier: 13,
      collection: "Epic",
      name: "CYBORG",
      price: 1600,
      image: "car13",
      gif: "car13-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      ability3: 13140,
      amount: 0,
      alt: "nft car cyborg",
    },
    {
      id: 17,
      tier: 14,
      collection: "Epic",
      name: "RHINO",
      price: 1600,
      image: "car14",
      gif: "car14-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      ability3: 13140,
      amount: 0,
      alt: "nft car rhino",
    },
    {
      id: 18,
      tier: 15,
      collection: "Epic",
      name: "HYPER",
      price: 1600,
      image: "car15",
      gif: "car15-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      ability3: 13140,
      amount: 0,
      alt: "nft car hyper",
    },
    {
      id: 19,
      tier: 16,
      collection: "Epic",
      name: "BULL",
      price: 1600,
      image: "car16",
      gif: "car16-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      ability3: 13140,
      amount: 0,
      alt: "nft car bull",
    },
    {
      id: 20,
      tier: 17,
      collection: "Epic",
      name: "PYTHON",
      price: 1600,
      image: "car17",
      gif: "car17-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      ability3: 13140,
      amount: 0,
      alt: "nft car python",
    },
    {
      id: 21,
      tier: 18,
      collection: "Epic",
      name: "HITMAN",
      price: 1600,
      image: "car18",
      gif: "car18-animation",
      type: "car",
      ability1: 0.79,
      ability2: 18,
      ability3: 13140,
      amount: 0,
      alt: "nft car hitman",
    },
    {
      id: 22,
      tier: 27,
      collection: "Epic rare",
      name: "MIDAS",
      price: 9600,
      image: "car27",
      gif: "car27-animation",
      type: "car",
      rare: true,
      ability1: 4.74,
      ability2: 18,
      ability3: "Moon",
      amount: 0,
      alt: "nft car midas",
    },
    //Legendary
    {
      id: 23,
      tier: 19,
      collection: "Legendary",
      name: "HYPER",
      price: 2600,
      image: "car19",
      gif: "car19-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      ability3: 12123,
      amount: 0,
      alt: "nft car hyper",
    },
    {
      id: 24,
      tier: 20,
      collection: "Legendary",
      name: "DORIAN",
      price: 2600,
      image: "car20",
      gif: "car20-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      ability3: 12123,
      amount: 0,
      alt: "nft car dorian",
    },
    {
      id: 25,
      tier: 21,
      collection: "Legendary",
      name: "VULCANIC",
      price: 2600,
      image: "car21",
      gif: "car21-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      ability3: 12123,
      amount: 0,
      alt: "nft car vulcanic",
    },
    {
      id: 26,
      tier: 22,
      collection: "Legendary",
      name: "BULL",
      price: 2600,
      image: "car22",
      gif: "car22-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      ability3: 12123,
      amount: 0,
      alt: "nft car bull",
    },
    {
      id: 27,
      tier: 23,
      collection: "Legendary",
      name: "KNOCKOUT",
      price: 2600,
      image: "car23",
      gif: "car23-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      ability3: 12123,
      amount: 0,
      alt: "nft car knockout",
    },
    {
      id: 28,
      tier: 24,
      collection: "Legendary",
      name: "LARA",
      price: 2600,
      image: "car24",
      gif: "car24-animation",
      type: "car",
      ability1: 1.71,
      ability2: 24,
      ability3: 12123,
      amount: 0,
      alt: "nft car lara",
    },
    {
      id: 29,
      tier: 28,
      collection: "Legendary rare",
      name: "BLUE STORM",
      price: 15600,
      image: "car28",
      gif: "car28-animation",
      type: "car",
      rare: true,
      ability1: 10.25,
      ability2: 24,
      ability3: "Moon",
      amount: 0,
      alt: "nft car blue storm",
    },
    {
      id: 30,
      tier: 71,
      collection: "Special edition",
      name: "R8",
      price: 100,
      image: "car71",
      gif: "car71-animation",
      type: "car",
      rare: true,
      ability3: 8760,
      amount: 0,
      alt: "nft car R8",
    },
    {
      id: 31,
      tier: 72,
      collection: "Special edition",
      name: "GAZ-13 Caika",
      price: 100,
      image: "car72",
      gif: "car72-animation",
      type: "car",
      rare: true,
      ability3: 8760,
      amount: 0,
      alt: "nft car GAZ-13 Caika",
    },
    {
      id: 32,
      tier: 73,
      collection: "Special edition",
      name: "Formation",
      price: 100,
      image: "car73",
      gif: "car73-animation",
      type: "car",
      rare: true,
      ability3: 8760,
      amount: 0,
      alt: "nft car Formation",
    },
    //
    //BUNDLE CARS ID 40,...,69
    //
    {
      id: 40,
      tier: 41,
      collection: "Special",
      name: "DAOMaker",
      link: "@TheDaoMaker",
      image: "car41",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      rank: "low",
      amount: 0,
      alt: "nft car DAOMaker",
    },
    {
      id: 41,
      tier: 42,
      collection: "Special",
      name: "Shreyansh Polygon",
      link: "@shreyansh_27",
      image: "car42",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      rank: "low",
      amount: 0,
      alt: "nft car Cryptowizard",
    },
    {
      id: 42,
      tier: 44,
      collection: "Special",
      name: "Kyle Chasse",
      link: "@kyle_chasse",
      image: "car44",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      rank: "low",
      amount: 0,
      alt: "nft car Kyle Chasse",
    },
    {
      id: 43,
      tier: 45,
      collection: "Special",
      name: "Ash WSB",
      link: "@ashWSBreal",
      image: "car45",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      rank: "low",
      amount: 0,
      alt: "nft car Ash WSB",
    },
    {
      id: 44,
      tier: 46,
      collection: "Special",
      name: "Tehmoonwalker",
      link: "@tehMoonwalkeR",
      image: "car46",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      rank: "low",
      amount: 0,
      alt: "nft car Tehmoonwalker",
    },
    {
      id: 45,
      tier: 47,
      collection: "Special",
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      image: "car47",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      rank: "low",
      amount: 0,
      alt: "nft car Parabolic Guy",
    },
    {
      id: 46,
      tier: 50,
      collection: "Special",
      name: "Altcoin Buzz",
      link: "@Altcoinbuzzio",
      image: "car50",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      rank: "low",
      amount: 0,
      alt: "nft car Altcoin Buzz",
    },
    {
      id: 47,
      tier: 51,
      collection: "Special",
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      image: "car51",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      rank: "low",
      amount: 0,
      alt: "nft car Cryptowizard",
    },
    {
      id: 48,
      tier: 52,
      collection: "Special",
      name: "Kucoin",
      link: "@kucoincom",
      image: "car52",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      rank: "low",
      amount: 0,
      alt: "nft car Kucoin",
    },
    {
      id: 49,
      tier: 53,
      collection: "Special",
      name: "QuickSwap",
      link: "@QuickswapDEX",
      image: "car53",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      rank: "low",
      amount: 0,
      alt: "nft car QuickSwap",
    },
    {
      id: 58,
      tier: 54,
      collection: "Special",
      name: "Tech Giants",
      link: "@Crypto_giants",
      image: "car54",
      type: "car",
      ability1: 0.1,
      ability2: 6,
      ability3: 8760,
      rank: "low",
      amount: 0,
      alt: "nft car Tech Giants",
    },
    //
    //TRM RACERS ID 70,...,89
    //
    {
      id: 70,
      tier: 1,
      collection: "Super",
      name: "Axle",
      price: 100,
      image: "white-trm",
      gif: "white-trm-animation",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Axle",
    },

    {
      id: 71,
      tier: 2,
      collection: "Super",
      name: "Flash",
      price: 100,
      image: "red-trm",
      gif: "red-trm-animation",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Flash",
    },
    {
      id: 72,
      tier: 3,
      collection: "Super",
      name: "Octane",
      price: 100,
      image: "blue-trm",
      gif: "blue-trm-animation",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Octane",
    },
    {
      id: 73,
      tier: 4,
      collection: "Super",
      name: "Punisher",
      price: 100,
      image: "black-trm",
      gif: "black-trm-animation",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Punisher",
    },
    {
      id: 74,
      tier: 5,
      collection: "Epic",
      name: "Lady Rich",
      price: 1000,
      image: "lady-rich",
      gif: "lady-rich-animation",
      type: "racer",
      ability2: 15,
      rank: "normal",
      amount: 0,
      alt: "nft racer Lady Rich",
    },
    {
      id: 75,
      tier: 6,
      collection: "Epic",
      name: "Rich Jr.",
      price: 1000,
      image: "bad-boy",
      gif: "bad-boy-animation",
      type: "racer",
      ability2: 15,
      rank: "normal",
      amount: 0,
      alt: "nft racer Rich Junior",
    },
    {
      id: 76,
      tier: 7,
      collection: "Epic",
      name: "Mrs. Rich",
      price: 1000,
      image: "mrs-rich",
      gif: "mrs-rich-animation",
      type: "racer",
      ability2: 15,
      rank: "normal",
      amount: 0,
      alt: "nft racer Mrs. Rich",
    },
    {
      id: 77,
      tier: 8,
      collection: "Legendary",
      name: "Mr. Rich",
      price: 10000,
      image: "mr-rich",
      gif: "mr-rich-animation",
      type: "racer",
      ability2: 20,
      ability3: 18,
      rank: "height",
      amount: 0,
      alt: "nft racer mr. rich",
    },
    //
    //BUNDLE RACERS ID 90,...,119
    //
    {
      id: 90,
      tier: 11,
      collection: "Special",
      name: "DAO Maker",
      link: "@TheDaoMaker",
      image: "dao-maker",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer DAOMaker",
    },
    {
      id: 91,
      tier: 12,
      collection: "Special",
      name: "Shreyansh Polygon",
      link: "@shreyansh_27",
      image: "polygon",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Polygon",
    },
    {
      id: 92,
      tier: 14,
      collection: "Special",
      name: "Kyle Chasse",
      link: "@kyle_chasse",
      image: "paid",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Kyle Chasse",
    },
    {
      id: 93,
      tier: 15,
      collection: "Special",
      name: "Ash WSB",
      link: "@ashWSBreal",
      image: "ash-wsb",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Ash WSB",
    },
    {
      id: 94,
      tier: 16,
      collection: "Special",
      name: "Tehmoonwalker",
      link: "@tehMoonwalkeR",
      image: "tehmoonwalker",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Tehmoonwalker",
    },
    {
      id: 95,
      tier: 17,
      collection: "Special",
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      image: "parabolic-guy",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Parabolic Guy",
    },
    {
      id: 96,
      tier: 20,
      collection: "Special",
      name: "Altcoin Buzz",
      link: "@Altcoinbuzzio",
      image: "altcoin-buzz",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Altcoin Buzz",
    },
    {
      id: 97,
      tier: 21,
      collection: "Special",
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      image: "cryptowizard",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Cryptowizard",
    },
    {
      id: 98,
      tier: 22,
      collection: "Special",
      name: "Kucoin",
      link: "@kucoincom",
      image: "kucoin",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Kucoin",
    },
    {
      id: 99,
      tier: 23,
      collection: "Special",
      name: "QuickSwap",
      link: "@QuickswapDEX",
      image: "quickswap",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Quickswap",
    },
    {
      id: 100,
      tier: 24,
      collection: "Special",
      name: "Tech Giants",
      link: "@Crypto_giants",
      image: "techgiants",
      type: "racer",
      ability2: 10,
      rank: "low",
      amount: 0,
      alt: "nft racer Tech Giants",
    },
    //
    //BUNDLES ID 120,...,149
    //
    {
      id: 120,
      tier: 1,
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
      amount: 0,
    },
    {
      id: 121,
      tier: 2,
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
      amount: 0,
    },
    {
      id: 122,
      tier: 4,
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
      amount: 0,
    },
    {
      id: 123,
      position: 5,
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
      amount: 0,
    },
    {
      id: 124,
      tier: 6,
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
      amount: 0,
    },

    {
      id: 125,
      tier: 7,
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
      amount: 0,
    },
    {
      id: 126,
      tier: 10,
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
      amount: 0,
    },
    {
      id: 127,
      tier: 11,
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
      amount: 0,
    },
    {
      id: 128,
      tier: 12,
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
      amount: 0,
    },
    {
      id: 129,
      tier: 13,
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
      amount: 0,
    },
    {
      id: 130,
      position: 14,
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
      amount: 0,
    },
  ];

  title = "All";
  myCar: any;
  ed1Cars = 0;
  ed2Cars = 0;
  ed3Cars = 0;
  ed4Cars = 0;
  dataReady = false;
  actualCarIndex = 0;
  bestIndex = 0;
  availableCars = [];
  remainingCars = [];
  pageOpen = true;
  animationPaging = 5;
  myCarsObserver: Subscription;
  vrecoObserver: Subscription;
  myDriverOldObserver: Subscription;
  balanceOldObserver: Subscription;
  sortingDone = false;
  myDriverOld: any;
  slideStylePx = 0;
  editionStylePx = 0;
  editionLvlIndex = 0;
  luckyCar: any;
  myBalance: any;
  carSum: string;
  unlocked: number;
  gotRare = false;
  totalNfts = 0;
  typeObserver: Subscription;
  assetType: any;
  assetPage: number;
  assetStartPage: number;
  assetFilter: any;
  choosedAsset = [];
  racersActive = false;
  carsActive = false;
  tracksActive = false;
  teamsActive = false;
  specialActive = false;
  allActive = true;
  display = window.innerWidth;
  mobileFilter = false;
  assetsOnPage = 8;
  sliceStart: number;
  sliceMiddle: number;
  newProducts: any;
  assetId: any;
  page: number;
  maxPage: number;
  lastPage: number;
  isPaged: any;
  filter: any;
  myCarsvals = 0;
  carBonus: any;
  selectedId = 46;
  selectedType = "team";
  ownedItems: any;
  @Input() depositFlow = false;
  @Output() marketState = new EventEmitter<number>();
  @Output() data = new EventEmitter<Array<any>>();

  constructor(
    public router: Router,
    protected api: CarsService,
    private balanceService: BalanceService,
    private identityService: AuthService,
    private route: ActivatedRoute
  ) {
    this.getMyAssets();
  }
  ngOnChanges(): void {
    if (this.depositFlow === true) {
      this.filterType(this.products, "all", false, true);
    } else {
      this.filterType(this.products, "all", false, false);
    }
  }
  ngOnInit(): void {
    this.filterType(this.products, "all", false, false);
  }
  filterType(
    entry: Array<any>,
    type: string,
    bundles: boolean,
    deposit: boolean
  ) {
    this.page = 1;
    this.sliceStart = 0;
    this.sliceMiddle = this.assetsOnPage;
    let sortedProducts = entry;

    if (type === "all") {
      if (bundles === false) {
        deposit === false
          ? (sortedProducts = entry.filter((item) => item.type !== "bundle"))
          : (sortedProducts = entry.filter(
              (item) => item.type !== "bundle" && item.collection !== "Special"
            ));
      } else {
        deposit === false
          ? (sortedProducts = entry)
          : (sortedProducts = entry.filter(
              (item) => item.collection !== "Special"
            ));
      }
    } else {
      if (bundles === false) {
        deposit === false
          ? (sortedProducts = entry.filter(
              (item) => item.type === type && item.type !== "bundle"
            ))
          : (sortedProducts = entry.filter(
              (item) =>
                item.type === type &&
                item.type !== "bundle" &&
                item.collection !== "Special"
            ));
      } else {
        deposit === false
          ? (sortedProducts = entry.filter((item) => item.type === type))
          : (sortedProducts = entry.filter(
              (item) => item.type === type && item.collection != "Special"
            ));
      }
    }

    this.title = type;
    this.newProducts = sortedProducts;
    this.lastPage = Math.ceil(this.newProducts.length / this.assetsOnPage);
  }

  chooseAsset(id: number) {
    this.choosedAsset = this.newProducts.filter((item) => item.id === id);
    this.data.emit(this.choosedAsset);
    this.showMarketState(2);
  }
  showMarketState(id: number) {
    this.marketState.emit(id);
  }

  get balanceHasChanged(): boolean {
    return this.balanceService.balanceChanged;
  }

  notifyChangedBalance() {
    this.identityService.updateBalance();
    this.balanceService.balanceHasbeenChanged();
  }
  getMyAssets() {
    this.myCarsObserver = this.api.carsMineList().subscribe((data) => {
      const objsx: any = data;
      const myCars: any = objsx.cars;
      const myRacers: any = objsx.racers;

      for (let x = 0; x < myCars.length; x++) {
        for (let y = 0; y < this.products.length; y++) {
          if (
            myCars[x].car_id === this.products[y].tier &&
            this.products[y].type === "car"
          ) {
            this.products[y].amount++;
          }
        }
      }
      for (let x = 0; x < myRacers.length; x++) {
        for (let y = 0; y < this.products.length; y++) {
          if (
            myRacers[x].car_id === this.products[y].tier &&
            this.products[y].type === "racer"
          ) {
            this.products[y].amount++;
          }
        }
      }
    });
  }
  selectCar(data) {
    this.bestIndex = data.cars.length - 1;
    this.myCars = data.cars;
    this.myCar = this.myCars[this.bestIndex];
    this.dataReady = true;
  }

  selectMyCarSPecial(index) {
    this.myCar = this.myCars[index];
  }

  checkSum(val: number, by: number) {
    if (val >= by) {
      return 100;
    } else {
      return (val / by) * 100;
    }
  }

  getMyBalance() {
    const data = this.identityService.driverBalance;
    this.myBalance = data;
  }

  resetLucky() {
    this.luckyCar = null;
  }

  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  filterMobile() {
    if (this.mobileFilter === false) {
      this.mobileFilter = true;
    } else {
      this.mobileFilter = false;
    }
  }
  timeoutReset() {
    clearTimeout(this.timeoutPage);
  }
  prevPageCars() {
    if (this.page > 0) {
      this.animateArrow = false;
      this.animateArrow = true;
      this.timeoutReset();
      this.page--;

      this.animationPaging = 3;
      this.timeoutPage = setTimeout(() => {
        this.animationPaging = 2;
        this.sliceStart = this.assetsOnPage * (this.page - 1);
        this.sliceMiddle = this.assetsOnPage * this.page;
        this.timeoutPage = null;
        this.animateArrow = false;
      }, 300);
    }
  }
  nextPageCars() {
    if (this.page < this.newProducts.length / this.assetsOnPage) {
      this.animateArrowRight = false;
      this.animateArrowRight = true;
      this.timeoutReset();
      this.page++;
      this.animationPaging = 1;
      this.timeoutPage = setTimeout(() => {
        this.animationPaging = 0;
        this.sliceStart = this.assetsOnPage * (this.page - 1);
        this.sliceMiddle = this.assetsOnPage * this.page;
        this.timeoutPage = null;
        this.animateArrowRight = false;
      }, 300);
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}
