import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { Observable as __Observable } from "rxjs";
import { CarsService } from "./cars.service";

@Injectable({
  providedIn: "root",
})
export class NftsService {
  //LIST OF ALL PRODUCTS IN OUR COMPANY
  products = [
    //
    //TRM CARS ID 1,..,39
    //
    //Common
    {
      id: 1,
      tier: 60,
      price: 0,
      name: "TESLA",
      image: "car60",
      type: "car",
      rank: "low",
      ability2: 72,
      count: 0,
      alt: "nft car Tesla",
    },
    {
      id: 30,
      tier: 71,
      collection: "Special edition",
      name: "R8",
      price: 0,
      image: "car71",
      gif: "car71-animation",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      count: 0,
      alt: "nft car R8",
    },
    {
      id: 31,
      tier: 72,
      collection: "Special edition",
      name: "GAZ-13 Caika",
      price: 0,
      image: "car72",
      gif: "car72-animation",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      count: 0,
      alt: "nft car GAZ-13 Caika",
    },
    {
      id: 32,
      tier: 73,
      collection: "Special edition",
      name: "Formation",
      price: 0,
      image: "car73",
      gif: "car73-animation",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      count: 0,
      alt: "nft car Formation",
    },
    {
      id: 2,
      tier: 1,
      collection: "Common",
      name: "RHINO",
      price: 0,
      image: "car1",
      gif: "car1-animation",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      count: 0,
      alt: "nft car rhino",
    },
    {
      id: 3,
      tier: 2,
      collection: "Common",
      name: "PANTHER",
      price: 0,
      image: "car2",
      gif: "car2-animation",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      count: 0,
      alt: "nft car panther",
    },
    {
      id: 4,
      tier: 3,
      collection: "Common",
      name: "ONYX",
      price: 0,
      image: "car3",
      gif: "car3-animation",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      count: 0,
      alt: "nft car onyx",
    },
    {
      id: 5,
      tier: 4,
      collection: "Common",
      name: "ZANDER",
      price: 0,
      image: "car4",
      gif: "car4-animation",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      count: 0,
      alt: "nft car zander",
    },
    {
      id: 6,
      tier: 5,
      collection: "Common",
      name: "CYBORG",
      price: 0,
      image: "car5",
      type: "car",
      gif: "car5-animation",
      ability1: 28.8,
      ability2: 144,
      count: 0,
      alt: "nft car cyborg",
    },
    {
      id: 7,
      tier: 6,
      collection: "Common",
      name: "VULCANIC",
      price: 0,
      image: "car6",
      gif: "car6-animation",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      count: 0,
      alt: "nft car vulcanic",
    },
    {
      id: 8,
      tier: 25,
      collection: "Common rare",
      name: "LUNA",
      price: 0,
      image: "car25",
      gif: "car25-animation",
      type: "car",
      rare: true,
      ability1: 43.2,
      ability2: 216,

      count: 0,
      alt: "nft car luna",
    },
    //super
    {
      id: 9,
      tier: 7,
      collection: "Super",
      name: "DORIAN",
      price: 0,
      image: "car7",
      gif: "car7-animation",
      type: "car",
      ability1: 57.6,
      ability2: 288,
      count: 0,
      alt: "nft car dorian",
    },
    {
      id: 10,
      tier: 8,
      collection: "Super",
      name: "PANTHER",
      price: 0,
      image: "car8",
      gif: "car8-animation",
      type: "car",
      ability1: 57.6,
      ability2: 288,
      count: 0,
      alt: "nft car panther",
    },
    {
      id: 11,
      tier: 9,
      collection: "Super",
      name: "ONYX",
      price: 0,
      image: "car9",
      gif: "car9-animation",
      type: "car",
      ability1: 57.6,
      ability2: 288,
      count: 0,
      alt: "nft car onyx",
    },
    {
      id: 12,
      tier: 10,
      collection: "Super",
      name: "ZANDER",
      price: 0,
      image: "car10",
      gif: "car10-animation",
      type: "car",
      ability1: 57.6,
      ability2: 288,
      count: 0,
      alt: "nft car zander",
    },
    {
      id: 13,
      tier: 11,
      collection: "Super",
      name: "PYTHON",
      price: 0,
      image: "car11",
      gif: "car11-animation",
      type: "car",
      ability1: 57.6,
      ability2: 288,
      count: 0,
      alt: "nft car python",
    },
    {
      id: 14,
      tier: 12,
      collection: "Super",
      name: "VULCANIC",
      price: 0,
      image: "car12",
      gif: "car12-animation",
      type: "car",
      ability1: 57.6,
      ability2: 288,
      count: 0,
      alt: "nft car vulcanic",
    },
    {
      id: 15,
      tier: 26,
      collection: "Super rare",
      name: "SILVER KNIGHT",
      price: 0,
      image: "car26",
      gif: "car26-animation",
      type: "car",
      rare: true,
      ability1: 86.4,
      ability2: 432,
      count: 0,
      alt: "nft car silver knight",
    },
    //epic
    {
      id: 16,
      tier: 13,
      collection: "Epic",
      name: "CYBORG",
      price: 0,
      image: "car13",
      gif: "car13-animation",
      type: "car",
      ability1: 115.2,
      ability2: 576,
      count: 0,
      alt: "nft car cyborg",
    },
    {
      id: 17,
      tier: 14,
      collection: "Epic",
      name: "RHINO",
      price: 0,
      image: "car14",
      gif: "car14-animation",
      type: "car",
      ability1: 115.2,
      ability2: 576,
      count: 0,
      alt: "nft car rhino",
    },
    {
      id: 18,
      tier: 15,
      collection: "Epic",
      name: "HYPER",
      price: 0,
      image: "car15",
      gif: "car15-animation",
      type: "car",
      ability1: 115.2,
      ability2: 576,
      count: 0,
      alt: "nft car hyper",
    },
    {
      id: 19,
      tier: 16,
      collection: "Epic",
      name: "BULL",
      price: 0,
      image: "car16",
      gif: "car16-animation",
      type: "car",
      ability1: 115.2,
      ability2: 576,
      count: 0,
      alt: "nft car bull",
    },
    {
      id: 20,
      tier: 17,
      collection: "Epic",
      name: "PYTHON",
      price: 0,
      image: "car17",
      gif: "car17-animation",
      type: "car",
      ability1: 115.2,
      ability2: 576,
      count: 0,
      alt: "nft car python",
    },
    {
      id: 21,
      tier: 18,
      collection: "Epic",
      name: "HITMAN",
      price: 0,
      image: "car18",
      gif: "car18-animation",
      type: "car",
      ability1: 115.2,
      ability2: 576,
      count: 0,
      alt: "nft car hitman",
    },
    {
      id: 22,
      tier: 27,
      collection: "Epic rare",
      name: "MIDAS",
      price: 0,
      image: "car27",
      gif: "car27-animation",
      type: "car",
      rare: true,
      ability1: 172.8,
      ability2: 864,
      count: 0,
      alt: "nft car midas",
    },
    //Legendary
    {
      id: 23,
      tier: 19,
      collection: "Legendary",
      name: "HYPER",
      price: 0,
      image: "car19",
      gif: "car19-animation",
      type: "car",
      ability1: 230.4,
      ability2: 1152,
      count: 0,
      alt: "nft car hyper",
    },
    {
      id: 24,
      tier: 20,
      collection: "Legendary",
      name: "DORIAN",
      price: 0,
      image: "car20",
      gif: "car20-animation",
      type: "car",
      ability1: 230.4,
      ability2: 1152,
      count: 0,
      alt: "nft car dorian",
    },
    {
      id: 25,
      tier: 21,
      collection: "Legendary",
      name: "VULCANIC",
      price: 0,
      image: "car21",
      gif: "car21-animation",
      type: "car",
      ability1: 230.4,
      ability2: 1152,
      count: 0,
      alt: "nft car vulcanic",
    },
    {
      id: 26,
      tier: 22,
      collection: "Legendary",
      name: "BULL",
      price: 0,
      image: "car22",
      gif: "car22-animation",
      type: "car",
      ability1: 230.4,
      ability2: 1152,
      count: 0,
      alt: "nft car bull",
    },
    {
      id: 27,
      tier: 23,
      collection: "Legendary",
      name: "KNOCKOUT",
      price: 0,
      image: "car23",
      gif: "car23-animation",
      type: "car",
      ability1: 230.4,
      ability2: 1152,
      count: 0,
      alt: "nft car knockout",
    },
    {
      id: 28,
      tier: 24,
      collection: "Legendary",
      name: "LARA",
      price: 0,
      image: "car24",
      gif: "car24-animation",
      type: "car",
      ability1: 230.4,
      ability2: 1152,
      count: 0,
      alt: "nft car lara",
    },
    {
      id: 29,
      tier: 28,
      collection: "Legendary rare",
      name: "BLUE STORM",
      price: 0,
      image: "car28",
      gif: "car28-animation",
      type: "car",
      rare: true,
      ability1: 374.4,
      ability2: 1872,
      count: 0,
      alt: "nft car blue storm",
    },
    //
    //BUNDLE CARS ID 40,...,69
    //
    {
      id: 40,
      tier: 41,
      collection: "Special",
      name: "DAOMaker",
      price: 0,
      link: "@TheDaoMaker",
      image: "car41",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car DAOMaker",
    },
    {
      id: 41,
      tier: 42,
      collection: "Special",
      name: "Shreyansh Polygon",
      price: 0,
      link: "@shreyansh_27",
      image: "car42",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car Cryptowizard",
    },
    {
      id: 42,
      tier: 44,
      collection: "Special",
      name: "Kyle Chasse",
      price: 0,
      link: "@kyle_chasse",
      image: "car44",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car Kyle Chasse",
    },
    {
      id: 43,
      tier: 45,
      collection: "Special",
      name: "Ash WSB",
      price: 0,
      link: "@ashWSBreal",
      image: "car45",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car Ash WSB",
    },
    {
      id: 44,
      tier: 46,
      collection: "Special",
      name: "Tehmoonwalker",
      price: 0,
      link: "@tehMoonwalkeR",
      image: "car46",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car Tehmoonwalker",
    },
    {
      id: 45,
      tier: 47,
      collection: "Special",
      name: "Parabolic Guy",
      price: 0,
      link: "@GoingParabolic",
      image: "car47",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car Parabolic Guy",
    },
    {
      id: 46,
      tier: 50,
      collection: "Special",
      name: "Altcoin Buzz",
      price: 0,
      link: "@Altcoinbuzzio",
      image: "car50",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car Altcoin Buzz",
    },
    {
      id: 47,
      tier: 51,
      collection: "Special",
      name: "Cryptowizard",
      price: 0,
      link: "@CryptoWizardd",
      image: "car51",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car Cryptowizard",
    },
    {
      id: 48,
      tier: 52,
      collection: "Special",
      name: "Kucoin",
      price: 0,
      link: "@kucoincom",
      image: "car52",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car Kucoin",
    },
    {
      id: 49,
      tier: 53,
      collection: "Special",
      name: "QuickSwap",
      price: 0,
      link: "@QuickswapDEX",
      image: "car53",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car QuickSwap",
    },
    {
      id: 50,
      tier: 54,
      collection: "Special",
      name: "Tech Giants",
      price: 0,
      link: "@Crypto_giants",
      image: "car54",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car Tech Giants",
    },
    {
      id: 51,
      tier: 55,
      collection: "Special",
      name: "Venly",
      price: 0,
      link: "@Venly_io",
      image: "car55",
      type: "car",
      ability1: 28.8,
      ability2: 144,
      rank: "low",
      count: 0,
      alt: "nft car Venly",
    },
    //
    //TRM RACERS ID 70,...,89
    //
    {
      id: 70,
      tier: 1,
      collection: "Super",
      name: "Axle",
      price: 0,
      image: "white-trm",
      gif: "white-trm-animation",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Axle",
    },

    {
      id: 71,
      tier: 2,
      collection: "Super",
      name: "Flash",
      price: 0,
      image: "red-trm",
      gif: "red-trm-animation",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Flash",
    },
    {
      id: 72,
      tier: 3,
      collection: "Super",
      name: "Octane",
      price: 0,
      image: "blue-trm",
      gif: "blue-trm-animation",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Octane",
    },
    {
      id: 73,
      tier: 4,
      collection: "Super",
      name: "Punisher",
      price: 0,
      image: "black-trm",
      gif: "black-trm-animation",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Punisher",
    },
    {
      id: 74,
      tier: 5,
      collection: "Epic",
      name: "Lady Rich",
      price: 0,
      image: "lady-rich",
      gif: "lady-rich-animation",
      type: "racer",
      ability2: 15,
      rank: "normal",
      count: 0,
      alt: "nft racer Lady Rich",
    },
    {
      id: 75,
      tier: 6,
      collection: "Epic",
      name: "Rich Jr.",
      price: 0,
      image: "bad-boy",
      gif: "bad-boy-animation",
      type: "racer",
      ability2: 15,
      rank: "normal",
      count: 0,
      alt: "nft racer Rich Junior",
    },
    {
      id: 76,
      tier: 7,
      collection: "Epic",
      name: "Mrs. Rich",
      price: 0,
      image: "mrs-rich",
      gif: "mrs-rich-animation",
      type: "racer",
      ability2: 15,
      rank: "normal",
      count: 0,
      alt: "nft racer Mrs. Rich",
    },
    {
      id: 77,
      tier: 8,
      collection: "Legendary",
      name: "Mr. Rich",
      price: 0,
      image: "mr-rich",
      gif: "mr-rich-animation",
      type: "racer",
      ability2: 20,
      ability3: 18,
      rank: "height",
      count: 0,
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
      price: 0,
      link: "@TheDaoMaker",
      image: "dao-maker",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer DAOMaker",
    },
    {
      id: 91,
      tier: 12,
      collection: "Special",
      name: "Shreyansh Polygon",
      price: 0,
      link: "@shreyansh_27",
      image: "polygon",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Polygon",
    },
    {
      id: 92,
      tier: 14,
      collection: "Special",
      name: "Kyle Chasse",
      price: 0,
      link: "@kyle_chasse",
      image: "paid",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Kyle Chasse",
    },
    {
      id: 93,
      tier: 15,
      collection: "Special",
      name: "Ash WSB",
      price: 0,
      link: "@ashWSBreal",
      image: "ash-wsb",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Ash WSB",
    },
    {
      id: 94,
      tier: 16,
      collection: "Special",
      name: "Tehmoonwalker",
      price: 0,
      link: "@tehMoonwalkeR",
      image: "tehmoonwalker",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Tehmoonwalker",
    },
    {
      id: 95,
      tier: 17,
      collection: "Special",
      name: "Parabolic Guy",
      price: 0,
      link: "@GoingParabolic",
      image: "parabolic-guy",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Parabolic Guy",
    },
    {
      id: 96,
      tier: 20,
      collection: "Special",
      name: "Altcoin Buzz",
      price: 0,
      link: "@Altcoinbuzzio",
      image: "altcoin-buzz",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Altcoin Buzz",
    },
    {
      id: 97,
      tier: 21,
      collection: "Special",
      name: "Cryptowizard",
      price: 0,
      link: "@CryptoWizardd",
      image: "cryptowizard",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Cryptowizard",
    },
    {
      id: 98,
      tier: 22,
      collection: "Special",
      name: "Kucoin",
      price: 0,
      link: "@kucoincom",
      image: "kucoin",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Kucoin",
    },
    {
      id: 99,
      tier: 23,
      collection: "Special",
      name: "QuickSwap",
      price: 0,
      link: "@QuickswapDEX",
      image: "quickswap",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Quickswap",
    },
    {
      id: 100,
      tier: 24,
      collection: "Special",
      name: "Tech Giants",
      price: 0,
      link: "@Crypto_giants",
      image: "techgiants",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Tech Giants",
    },
    {
      id: 101,
      tier: 25,
      collection: "Special",
      name: "Venly",
      price: 0,
      link: "@Venly_io",
      image: "venly",
      type: "racer",
      ability2: 10,
      rank: "low",
      count: 0,
      alt: "nft racer Venly",
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
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-dao",
      racer: "dao-maker",
      car: "car41",
      count: 0,
    },
    {
      id: 121,
      tier: 2,
      type: "bundle",
      name: "Shreyansh Polygon",
      link: "@shreyansh_27",
      nft: 10,
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-polygon",
      racer: "polygon",
      car: "car42",
      count: 0,
    },
    {
      id: 122,
      tier: 4,
      type: "bundle",
      name: "Kyle Chasse",
      link: "@kyle_chasse",
      nft: 10,
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-kyle",
      racer: "paid",
      car: "car44",
      count: 0,
    },
    {
      id: 123,
      tier: 5,
      type: "bundle",
      name: "Ash WSB",
      link: "@ashWSBreal",
      nft: 10,
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-ash",
      racer: "ash-wsb",
      car: "car45",
      count: 0,
    },
    {
      id: 124,
      tier: 6,
      type: "bundle",
      name: "Tehmoonwalker",
      link: "@tehMoonwalkeR",
      nft: 10,
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-tehmoon",
      racer: "tehmoonwalker",
      car: "car46",
      count: 0,
    },

    {
      id: 125,
      tier: 7,
      type: "bundle",
      name: "Parabolic Guy",
      link: "@GoingParabolic",
      nft: 10,
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-parabolic",
      racer: "parabolic-guy",
      car: "car47",
      count: 0,
    },
    {
      id: 126,
      tier: 10,
      type: "bundle",
      name: "Altcoin Buzz",
      link: "@Altcoinbuzzio",
      nft: 10,
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-altcoin",
      racer: "altcoin-buzz",
      car: "car50",
      count: 0,
    },
    {
      id: 127,
      tier: 11,
      type: "bundle",
      name: "Cryptowizard",
      link: "@CryptoWizardd",
      nft: 10,
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-wizard",
      racer: "cryptowizard",
      car: "car51",
      count: 0,
    },
    {
      id: 128,
      tier: 12,
      type: "bundle",
      name: "Kucoin",
      link: "@kucoincom",
      nft: 10,
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-kucoin",
      racer: "kucoin",
      car: "car52",
      count: 0,
    },
    {
      id: 129,
      tier: 13,
      type: "bundle",
      name: "QuickSwap",
      link: "@QuickswapDEX",
      nft: 10,
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-quickswap",
      racer: "quickswap",
      car: "car53",
      count: 0,
    },
    {
      id: 130,
      tier: 14,
      type: "bundle",
      name: "Tech Giants",
      link: "@Crypto_giants",
      nft: 10,
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-techgiants",
      racer: "techgiants",
      car: "car54",
      count: 0,
    },
    {
      id: 131,
      tier: 15,
      type: "bundle",
      name: "Venly",
      link: "@Venly_io",
      nft: 10,
      ability1: 28.8,
      ability2: 144,
      price: 0,
      pieces: 100,
      image: "bundle-venly",
      racer: "venly",
      car: "car55",
      count: 0,
    },
  ];
  //SORTED PRODUCTS FOR MARKETPLACE
  sortedProducts = [];
  //SORTED PRODUCTS FOR MY-NFTS
  sortedMyProducts = [];
  pageNum = 0;
  myAssets = [];
  myItems: any;
  assetsSubscribe: Subscription;
  constructor(private api: CarsService) {}
  sortAssetsById() {}
  getAssets() {
    this.assetsSubscribe = this.api.carsShowroomList().subscribe((data) => {
      const objs: any = data;
      const cars: any = objs.cars;
      const racers: any = objs.racers;
      const packages: any = objs.packages;

      for (let x = 0; x < this.products.length; x++) {
        for (let y = 0; y < cars.length; y++) {
          if (
            +cars[y].car_model === this.products[x].tier &&
            this.products[x].type === "car"
          ) {
            this.products[x].price = cars[y].car_price;
          }
        }
        for (let y = 0; y < racers.length; y++) {
          if (
            +racers[y].racer_model === this.products[x].tier &&
            this.products[x].type === "racer"
          ) {
            this.products[x].price = racers[y].racer_price;
          }
        }
        for (let y = 0; y < packages.length; y++) {
          if (
            +packages[y].package_model === this.products[x].tier &&
            this.products[x].type === "bundle"
          ) {
            this.products[x].price = packages[y].package_price;
          }
        }
      }
    });

    return this.products;
  }

  filterJustOwnedAssets(entry: Array<any>) {
    let sortedProducts = entry;
    sortedProducts = entry.filter((item) => item.count > 0);
    return sortedProducts;
  }

  filterType(entry: Array<any>, type: string, bundles: boolean) {
    let sortedProducts = entry;
    if (bundles === false) {
      sortedProducts = entry.filter(
        (item) => item.type === type && item.collection !== "Special"
      );
    } else {
      sortedProducts = entry.filter((item) => item.type === type);
    }
    return sortedProducts;
  }
}
