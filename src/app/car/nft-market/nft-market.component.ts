import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../api/services';

@Component({
  selector: 'app-nft-market',
  templateUrl: './nft-market.component.html',
  styleUrls: ['./nft-market.component.scss'],
})
export class NftMarketComponent implements OnInit {

  carSum: string;
  marketState = 1;
  selectedId = 1;
  selectedType = 'racers';

  constructor(protected api: CarsService) { }

  ngOnInit() {
    this.getShowroomCars();
  }

  products: Array<object> = [
    {
      id: 1,
      collection: 'Bronze Collection',
      name: 'Axle',
      prize: '1152',
      image: 'white-mn',
      type: 'racer',
    },
    {
      id: 2,
      collection: 'Bronze Collection',
      name: 'Flash',
      prize: '1152',
      image: 'red-korpo',
      type: 'racer',
    },
    {
      id: 3,
      collection: 'Bronze Collection',
      name: 'Octane',
      prize: '1152',
      image: 'blue-mn',
      type: 'racer',
    },
    {
      id: 4,
      collection: 'Bronze Collection',
      name: 'Punisher',
      prize: '1152',
      image: 'black-korpo',
      type: 'racer',
    },
    {
      id: 5,
      collection: 'Bronze Collection',
      name: 'Lady Rich',
      prize: '1152',
      image: 'lady-rich',
      type: 'racer',
    },
    {
      id: 6,
      collection: 'Bronze Collection',
      name: 'Rich Jr.',
      prize: '1152',
      image: 'bad-boy',
      type: 'racer',
    },
    {
      id: 7,
      collection: 'Bronze Collection',
      name: 'Mr. Rich',
      prize: '1152',
      image: 'mr-rich',
      type: 'racer',
    },
    {
      id: 8,
      collection: 'Bronze Collection',
      name: 'Mrs. Rich',
      prize: '1152',
      image: 'mrs-rich',
      type: 'racer',
    },
    //bronze
    {
      id: 9,
      collection: 'Bronze Collection',
      name: 'Bronze 1',
      prize: '600',
      image: 'car1',
      type: 'car',
    },
    {
      id: 10,
      collection: 'Bronze Collection',
      name: 'Bronze 2',
      prize: '600',
      image: 'car2',
      type: 'car',
    },
    {
      id: 11,
      collection: 'Bronze Collection',
      name: 'Bronze 3',
      prize: '600',
      image: 'car3',
      type: 'car',
    },
    {
      id: 12,
      collection: 'Bronze Collection',
      name: 'Bronze 4',
      prize: '600',
      image: 'car4',
      type: 'car',
    },
    {
      id: 13,
      collection: 'Bronze Collection',
      name: 'Bronze 5',
      prize: '600',
      image: 'car5',
      type: 'car',
    },
    {
      id: 14,
      collection: 'Bronze Collection',
      name: 'Bronze 6',
      prize: '600',
      image: 'car6',
      type: 'car',
    },
    {
      id: 15,
      collection: 'Bronze Collection Rare',
      name: 'Bronze 7',
      prize: '3 600',
      image: 'car25',
      type: 'car',
      rare: true,
    },
    //silver
    {
      id: 16,
      collection: 'Silver Collection',
      name: 'Silver 1',
      prize: '1000',
      image: 'car7',
      type: 'car',
    },
    {
      id: 17,
      collection: 'Silver Collection',
      name: 'Silver 2',
      prize: '1000',
      image: 'car8',
      type: 'car',
    },
    {
      id: 18,
      collection: 'Silver Collection',
      name: 'Silver 3',
      prize: '1000',
      image: 'car9',
      type: 'car',
    },
    {
      id: 19,
      collection: 'Silver Collection',
      name: 'Silver 4',
      prize: '1000',
      image: 'car10',
      type: 'car',
    },
    {
      id: 20,
      collection: 'Silver Collection',
      name: 'Silver 5',
      prize: '1000',
      image: 'car11',
      type: 'car',
    },
    {
      id: 21,
      collection: 'Silver Collection',
      name: 'Silver 6',
      prize: '1000',
      image: 'car12',
      type: 'car',
    },
    {
      id: 22,
      collection: 'Silver Collection Rare',
      name: 'Silver 7',
      prize: '6000',
      image: 'car26',
      type: 'car',
      rare: true,
    },
    //gold
    {
      id: 23,
      collection: 'Gold Collection',
      name: 'Gold 1',
      prize: '1 600',
      image: 'car13',
      type: 'car',
    },
    {
      id: 24,
      collection: 'Gold Collection',
      name: 'Gold 2',
      prize: '1 600',
      image: 'car14',
      type: 'car',
    },
    {
      id: 25,
      collection: 'Gold Collection',
      name: 'Gold 3',
      prize: '1 600',
      image: 'car15',
      type: 'car',
    },
    {
      id: 26,
      collection: 'Gold Collection',
      name: 'Gold 4',
      prize: '1 600',
      image: 'car16',
      type: 'car',
    },
    {
      id: 27,
      collection: 'Gold Collection',
      name: 'Gold 5',
      prize: '1 600',
      image: 'car17',
      type: 'car',
    },
    {
      id: 28,
      collection: 'Gold Collection',
      name: 'Gold 6',
      prize: '1 600',
      image: 'car18',
      type: 'car',
    },
    {
      id: 29,
      collection: 'Gold Collection Rare',
      name: 'Gold 7',
      prize: '9 600',
      image: 'car27',
      type: 'car',
      rare: true,
    },
    //platinum
    {
      id: 30,
      collection: 'Platinum Collection',
      name: 'Platinum 1',
      prize: '2 600',
      image: 'car19',
      type: 'car',
    },
    {
      id: 31,
      collection: 'Platinum Collection',
      name: 'Platinum 2',
      prize: '2 600',
      image: 'car20',
      type: 'car',
    },
    {
      id: 32,
      collection: 'Platinum Collection',
      name: 'Platinum 3',
      prize: '2 600',
      image: 'car21',
      type: 'car',
    },
    {
      id: 33,
      collection: 'Platinum Collection',
      name: 'Platinum 4',
      prize: '2 600',
      image: 'car22',
      type: 'car',
    },
    {
      id: 34,
      collection: 'Platinum Collection',
      name: 'Platinum 5',
      prize: '2 600',
      image: 'car23',
      type: 'car',
    },
    {
      id: 35,
      collection: 'Platinum Collection',
      name: 'Platinum 6',
      prize: '2 600',
      image: 'car24',
      type: 'car',
    },
    {
      id: 36,
      collection: 'Platinum Collection Rare',
      name: 'Platinum 7',
      prize: '15 600',
      image: 'car28',
      type: 'car',
      rare: true,
    },
    {
      id: 37,
      collection: 'Race tracks',
      name: 'Racer',
      prize: '1152',
      image: 'track',
      type: 'track',
    },
    {
      id: 38,
      collection: 'Race tracks',
      name: 'Beach Race',
      prize: '1152',
      image: 'track',
      type: 'track',
    },
    {
      id: 39,
      collection: 'Race tracks',
      name: 'Forest Race',
      prize: '1152',
      image: 'track',
      type: 'track',
    },
    {
      id: 40,
      collection: 'Race tracks',
      name: 'Space Race',
      prize: '1152',
      image: 'track',
      type: 'track',
    },
  ];
  filter = 0; // 0 = all // 1 = racers // 2 = cars // 3 = tracks
  racersActive = false;
  carsActive = false;
  tracksActive = false;
  allActive = true;
  sliceStart = 0;
  sliceMiddle = 8;
  display = window.innerWidth;
  newProducts = this.products;

  filterRacers() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item['type'] === 'racer');
    this.sliceStart = 0;
    this.sliceMiddle = 8;
    this.racersActive = true;
    this.tracksActive = false;
    this.carsActive = false;
    this.allActive = false;
  }

  filterCars() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item['type'] === 'car');
    this.sliceStart = 0;
    this.sliceMiddle = 8;
    this.carsActive = true;
    this.tracksActive = false;
    this.racersActive = false;
    this.allActive = false;
  }
  filterTracks() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item['type'] === 'track');
    this.sliceStart = 0;
    this.sliceMiddle = 8;
    this.tracksActive = true;
    this.carsActive = false;
    this.racersActive = false;
    this.allActive = false;
  }
  filterAll() {
    this.newProducts = this.products;
    this.sliceStart = 0;
    this.sliceMiddle = 8;
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.allActive = true;
  }

  //NAVBAR
  menuActive = 1;
  isMenuActive = false;
  activeMenu = 0;

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
    element = document.querySelector('.hamburger');
    element.classList.remove('hamburgerclick');
    void element.offsetWidth;
    element.classList.add('hamburgerclick');
  }

  getShowroomCars() {
    this.api.carsShowroomList().subscribe(data => {
      const objs: any = data;
      this.carSum = objs.remaining_cars.toString();
    });
  }

  showAsset(id: number, type: string){
    this.selectedId = id;
    this.selectedType = type;
    this.marketState = 2;
  }

  resetPageArrowLeft() {
    let page;
    page = document.querySelector('.page-left');
    page.classList.remove('pageclick');
    void page.offsetWidth;
    page.classList.add('pageclick');
  }
  resetPageArrowRight() {
    let page;
    page = document.querySelector('.page-right');
    page.classList.remove('pageclick');
    void page.offsetWidth;
    page.classList.add('pageclick');
  }

  prevPageCars() {
    if (this.sliceStart > 0) {
      this.sliceStart = this.sliceStart - 8;
      this.sliceMiddle = this.sliceMiddle - 8;
    }
  }
  nextPageCars() {
    if (this.sliceMiddle < this.products.length) {
      this.sliceStart = this.sliceStart + 8;
      this.sliceMiddle = this.sliceMiddle + 8;
    }
  }

  showAssetBuy(state: number){
    this.marketState = state;
  }

}
