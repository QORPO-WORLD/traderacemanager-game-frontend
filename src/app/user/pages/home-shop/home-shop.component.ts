import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.scss'],
})
export class HomeShopComponent implements OnInit {

  products: Array<object> = [
    {
      id: 1,
      collection: 'Bronze Collection',
      name: 'Axle',
      prize: '1152 IOI',
      image: 'white-mn',
      type: 'racer',
    },
    {
      id: 2,
      collection: 'Bronze Collection',
      name: 'Flash',
      prize: '1152 IOI',
      image: 'red-korpo',
      type: 'racer',
    },
    {
      id: 3,
      collection: 'Bronze Collection',
      name: 'Octane',
      prize: '1152 IOI',
      image: 'blue-mn',
      type: 'racer',
    },
    {
      id: 4,
      collection: 'Bronze Collection',
      name: 'Punisher',
      prize: '1152 IOI',
      image: 'black-korpo',
      type: 'racer',
    },
    {
      id: 5,
      collection: 'Bronze Collection',
      name: 'Lady Rich',
      prize: '1152 IOI',
      image: 'lady-rich',
      type: 'racer',
    },
    {
      id: 6,
      collection: 'Bronze Collection',
      name: 'Rich Jr.',
      prize: '1152 IOI',
      image: 'bad-boy',
      type: 'racer',
    },
    {
      id: 7,
      collection: 'Bronze Collection',
      name: 'Mr. Rich',
      prize: '1152 IOI',
      image: 'mr-rich',
      type: 'racer',
    },
    {
      id: 8,
      collection: 'Bronze Collection',
      name: 'Mrs. Rich',
      prize: '1152 IOI',
      image: 'mrs-rich',
      type: 'racer',
    },
    //bronze
    {
      id: 9,
      collection: 'Bronze Collection',
      name: 'Bronze 1',
      prize: '600 IOI',
      image: 'car1',
      type: 'car',
    },
    {
      id: 10,
      collection: 'Bronze Collection',
      name: 'Bronze 2',
      prize: '600 IOI',
      image: 'car2',
      type: 'car',
    },
    {
      id: 11,
      collection: 'Bronze Collection',
      name: 'Bronze 3',
      prize: '600 IOI',
      image: 'car3',
      type: 'car',
    },
    {
      id: 12,
      collection: 'Bronze Collection',
      name: 'Bronze 4',
      prize: '600 IOI',
      image: 'car4',
      type: 'car',
    },
    {
      id: 13,
      collection: 'Bronze Collection',
      name: 'Bronze 5',
      prize: '600 IOI',
      image: 'car5',
      type: 'car',
    },
    {
      id: 14,
      collection: 'Bronze Collection',
      name: 'Bronze 6',
      prize: '600 IOI',
      image: 'car6',
      type: 'car',
    },
    {
      id: 15,
      collection: 'Bronze Collection Rare',
      name: 'Bronze 7',
      prize: '3 600 IOI',
      image: 'car25',
      type: 'car',
      rare: true,
    },
    //silver
    {
      id: 16,
      collection: 'Silver Collection',
      name: 'Silver 1',
      prize: '1000 IOI',
      image: 'car7',
      type: 'car',
    },
    {
      id: 17,
      collection: 'Silver Collection',
      name: 'Silver 2',
      prize: '1000 IOI',
      image: 'car8',
      type: 'car',
    },
    {
      id: 18,
      collection: 'Silver Collection',
      name: 'Silver 3',
      prize: '1000 IOI',
      image: 'car9',
      type: 'car',
    },
    {
      id: 19,
      collection: 'Silver Collection',
      name: 'Silver 4',
      prize: '1000 IOI',
      image: 'car10',
      type: 'car',
    },
    {
      id: 20,
      collection: 'Silver Collection',
      name: 'Silver 5',
      prize: '1000 IOI',
      image: 'car11',
      type: 'car',
    },
    {
      id: 21,
      collection: 'Silver Collection',
      name: 'Silver 6',
      prize: '1000 IOI',
      image: 'car12',
      type: 'car',
    },
    {
      id: 22,
      collection: 'Silver Collection Rare',
      name: 'Silver 7',
      prize: '6000 IOI',
      image: 'car26',
      type: 'car',
      rare: true,
    },
    //gold
    {
      id: 23,
      collection: 'Gold Collection',
      name: 'Gold 1',
      prize: '1 600 IOI',
      image: 'car13',
      type: 'car',
    },
    {
      id: 24,
      collection: 'Gold Collection',
      name: 'Gold 2',
      prize: '1 600 IOI',
      image: 'car14',
      type: 'car',
    },
    {
      id: 25,
      collection: 'Gold Collection',
      name: 'Gold 3',
      prize: '1 600 IOI',
      image: 'car15',
      type: 'car',
    },
    {
      id: 26,
      collection: 'Gold Collection',
      name: 'Gold 4',
      prize: '1 600 IOI',
      image: 'car16',
      type: 'car',
    },
    {
      id: 27,
      collection: 'Gold Collection',
      name: 'Gold 5',
      prize: '1 600 IOI',
      image: 'car17',
      type: 'car',
    },
    {
      id: 28,
      collection: 'Gold Collection',
      name: 'Gold 6',
      prize: '1 600 IOI',
      image: 'car18',
      type: 'car',
    },
    {
      id: 29,
      collection: 'Gold Collection Rare',
      name: 'Gold 7',
      prize: '9 600 IOI',
      image: 'car27',
      type: 'car',
      rare: true,
    },
    //platinum
    {
      id: 30,
      collection: 'Platinum Collection',
      name: 'Platinum 1',
      prize: '2 600 IOI',
      image: 'car19',
      type: 'car',
    },
    {
      id: 31,
      collection: 'Platinum Collection',
      name: 'Platinum 2',
      prize: '2 600 IOI',
      image: 'car20',
      type: 'car',
    },
    {
      id: 32,
      collection: 'Platinum Collection',
      name: 'Platinum 3',
      prize: '2 600 IOI',
      image: 'car21',
      type: 'car',
    },
    {
      id: 33,
      collection: 'Platinum Collection',
      name: 'Platinum 4',
      prize: '2 600 IOI',
      image: 'car22',
      type: 'car',
    },
    {
      id: 34,
      collection: 'Platinum Collection',
      name: 'Platinum 5',
      prize: '2 600 IOI',
      image: 'car23',
      type: 'car',
    },
    {
      id: 35,
      collection: 'Platinum Collection',
      name: 'Platinum 6',
      prize: '2 600 IOI',
      image: 'car24',
      type: 'car',
    },
    {
      id: 36,
      collection: 'Platinum Collection Rare',
      name: 'Platinum 7',
      prize: '15 600 IOI',
      image: 'car28',
      type: 'car',
      rare: true,
    },
    {
      id: 37,
      collection: 'Race tracks',
      name: 'Free track',
      prize: '1152 IOI',
      image: 'track',
      type: 'track',
    },
    {
      id: 38,
      collection: 'Race tracks',
      name: 'Desert',
      prize: '1152 IOI',
      image: 'track',
      type: 'track',
    },
    {
      id: 39,
      collection: 'Race tracks',
      name: 'Dark forest',
      prize: '1152 IOI',
      image: 'track',
      type: 'track',
    },
    {
      id: 40,
      collection: 'Race tracks',
      name: 'Sea bridge',
      prize: '1152 IOI',
      image: 'track',
      type: 'track',
    },
    {
      id: 41,
      collection: 'Race tracks',
      name: 'Night City',
      prize: '1152 IOI',
      image: 'track',
      type: 'track',
    },
    {
      id: 42,
      collection: 'Race tracks',
      name: 'Underground',
      prize: '1152 IOI',
      image: 'track',
      type: 'track',
    },
    {
      id: 43,
      collection: '',
      name: 'BTC',
      prize: '',
      image: 'btc-team',
      type: 'team',
    },
    {
      id: 44,
      collection: '',
      name: 'IOI',
      prize: '',
      image: 'ioi-team',
      type: 'team',
    },
    {
      id: 45,
      collection: '',
      name: 'ALT',
      prize: '',
      image: 'alt-team',
      type: 'team',
    },
  ];
  typeObserver: Subscription;
  assetType: any;
  racersActive = false;
  carsActive = false;
  tracksActive = false;
  teamsActive = false;
  allActive = true;
  display = window.innerWidth;
  mobileFilter = false;
  inRow;
  sliceStart = 0;
  sliceMiddle;
  newProducts = this.products;
  assetId;
  title = 'All products';
  currentPage = 1;
  maxPage;
  lastPage;

  constructor(private route: ActivatedRoute) { 
    this.width();
  }

  ngOnInit() {
    this.getAssetType();
  }

  getAssetType() {
    this.typeObserver = this.route.queryParams.subscribe((params) => {
      this.assetType = params['type'];

      if (!this.assetType) {
        this.filterAll();
      }

      if (this.assetType === 'racer') {
        this.filterRacers();
      }
      if (this.assetType === 'car') {
        this.filterCars();
      }
      if (this.assetType === 'track') {
        this.filterTracks();
      }
      if (this.assetType === 'team') {
        this.filterTeams();
      }
    });
  }

  scrollTop(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  width() {
    if (this.display > 750 && this.display < 1300) {
      this.inRow = 9;
      this.maxPage = 9;
      this.sliceMiddle = this.inRow;
      this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    } else {
      this.inRow = 8;
      this.maxPage = 8;
      this.sliceMiddle = this.inRow;
      this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
    }
  }

  filterMobile() {
    if (this.mobileFilter === false) {
      this.mobileFilter = true;
    } else {
      this.mobileFilter = false;
    }
  }
  prevPageCars() {
    if (this.sliceStart > 0) {
      this.sliceStart = this.sliceStart - this.inRow;
      this.sliceMiddle = this.sliceMiddle - this.inRow;
    }
  }
  nextPageCars() {
    if (this.sliceMiddle < this.newProducts.length) {
      this.sliceStart = this.sliceStart + this.inRow;
      this.sliceMiddle = this.sliceMiddle + this.inRow;
    }
  }

  productFilter(type: string) {
    if (type === 'racers') {
    }
  }

  filterRacers() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item['type'] === 'racer');
    this.sliceStart = 0;
    this.width();
    this.racersActive = true;
    this.tracksActive = false;
    this.carsActive = false;
    this.allActive = false;
    this.teamsActive = false;
    this.title = 'Racers';
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
  }

  filterCars() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item['type'] === 'car');
    this.sliceStart = 0;
    this.width();
    this.carsActive = true;
    this.tracksActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.allActive = false;
    this.title = 'Cars';
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
  }
  filterTracks() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item['type'] === 'track');
    this.sliceStart = 0;
    this.width();
    this.tracksActive = true;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = false;
    this.allActive = false;
    this.title = 'Tracks';
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
  }
  filterTeams() {
    this.newProducts = this.products;
    this.newProducts = this.products.filter((item) => item['type'] === 'team');
    this.sliceStart = 0;
    this.width();
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.teamsActive = true;
    this.allActive = false;
    this.title = 'Teams';
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
  }
  filterAll() {
    this.newProducts = this.products;
    this.sliceStart = 0;
    this.width();
    this.tracksActive = false;
    this.carsActive = false;
    this.racersActive = false;
    this.allActive = true;
    this.title = 'All products';
    this.lastPage = Math.ceil(this.newProducts.length / this.maxPage);
  }
  //NAVBAR//
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
  resetPageArrowLeft() {
    let page;
    page = document.querySelector('.pagebtn-l');
    page.classList.remove('clickPage');
    void page.offsetWidth;
    page.classList.add('clickPage');
    if (this.currentPage > 0) {
      this.currentPage = this.currentPage - 1;
    }
  }
  resetPageArrowRight() {
    let page;
    page = document.querySelector('.pagebtn-r');
    page.classList.remove('clickPage');
    void page.offsetWidth;
    page.classList.add('clickPage');
    if (this.currentPage <= this.newProducts.length / 8) {
      this.currentPage = this.currentPage + 1;
    }
  }

}
