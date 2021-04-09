import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../user/services/auth.service';
import { BalanceService } from './../../common/services/balance.service';
import { NotifyService } from './../../common/services/notify.service';
import { CarsService } from '../../api/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-nft',
  templateUrl: './buy-nft.component.html',
  styleUrls: ['./buy-nft.component.scss'],
})
export class BuyNftComponent implements OnInit {

  racers: Array<object> = [
    {
      id: 1,
      collection: 'Bronze',
      name: 'Axle',
      prize: '1152',
      image: 'white-mn',
    },
    {
      id: 2,
      collection: 'Bronze',
      name: 'Flash',
      prize: '1152',
      image: 'red-korpo',
    },
    {
      id: 3,
      collection: 'Bronze',
      name: 'Octane',
      prize: '1152',
      image: 'blue-mn',
    },
    {
      id: 4,
      collection: 'Bronze',
      name: 'Punisher',
      prize: '1152',
      image: 'black-korpo',
    },
    {
      id: 5,
      collection: 'Bronze',
      name: 'Lady Rich',
      prize: '1152',
      image: 'lady-rich',
    },
    {
      id: 6,
      collection: 'Bronze',
      name: 'Rich Jr.',
      prize: '1152',
      image: 'bad-boy',
    },
    {
      id: 7,
      collection: 'Bronze',
      name: 'Mr. Rich',
      prize: '1152',
      image: 'mr-rich',
    },
    {
      id: 8,
      collection: 'Bronze',
      name: 'Mrs. Rich',
      prize: '1152',
      image: 'mrs-rich',
    },
  ];
  cars: Array<object> = [
    //bronze
    {
      id: 9,
      collection: 'Bronze Collection',
      name: 'Bronze 1',
      prize: '600',
      image: 'car1',
      extras: { stake: '0.1', roi: '6' }
    },
    {
      id: 10,
      collection: 'Bronze Collection',
      name: 'Bronze 2',
      prize: '600',
      image: 'car2',
      extras: { stake: '0.1', roi: '6' }
    },
    {
      id: 11,
      collection: 'Bronze Collection',
      name: 'Bronze 3',
      prize: '600',
      image: 'car3',
      extras: { stake: '0.1', roi: '6' }
    },
    {
      id: 12,
      collection: 'Bronze Collection',
      name: 'Bronze 4',
      prize: '600',
      image: 'car4',
      extras: { stake: '0.1', roi: '6' }
    },
    {
      id: 13,
      collection: 'Bronze Collection',
      name: 'Bronze 5',
      prize: '600',
      image: 'car5',
      extras: { stake: '0.1', roi: '6' }
    },
    {
      id: 14,
      collection: 'Bronze Collection',
      name: 'Bronze 6',
      prize: '600',
      image: 'car6',
      extras: { stake: '0.1', roi: '6' }
    },
    {
      id: 15,
      collection: 'Bronze Collection Rare',
      name: 'Bronze 7',
      prize: '3600',
      image: 'car25',
      rare: true,
      extras: { stake: '0.6', roi: '6' }
    },
    //silver
    {
      id: 16,
      collection: 'Silver Collection',
      name: 'Silver 1',
      prize: '1000',
      image: 'car7',
      extras: { stake: '0.33', roi: '12' }
    },
    {
      id: 17,
      collection: 'Silver Collection',
      name: 'Silver 2',
      prize: '1000',
      image: 'car8',
      extras: { stake: '0.33', roi: '12' }
    },
    {
      id: 18,
      collection: 'Silver Collection',
      name: 'Silver 3',
      prize: '1000',
      image: 'car9',
      extras: { stake: '0.33', roi: '12' }
    },
    {
      id: 19,
      collection: 'Silver Collection',
      name: 'Silver 4',
      prize: '1000',
      image: 'car10',
      extras: { stake: '0.33', roi: '12' }
    },
    {
      id: 20,
      collection: 'Silver Collection',
      name: 'Silver 5',
      prize: '1000',
      image: 'car11',
      extras: { stake: '0.33', roi: '12' }
    },
    {
      id: 21,
      collection: 'Silver Collection',
      name: 'Silver 6',
      prize: '1000',
      image: 'car12',
      extras: { stake: '0.33', roi: '12' }
    },
    {
      id: 22,
      collection: 'Silver Collection Rare',
      name: 'Silver 7',
      prize: '6000',
      image: 'car26',
      rare: true,
      extras: { stake: '1.98', roi: '12' }
    },
    //gold
    {
      id: 23,
      collection: 'Gold Collection',
      name: 'Gold 1',
      prize: '1600',
      image: 'car13',
      extras: { stake: '0.79', roi: '18' }
    },
    {
      id: 24,
      collection: 'Gold Collection',
      name: 'Gold 2',
      prize: '1600',
      image: 'car14',
      extras: { stake: '0.79', roi: '18' }
    },
    {
      id: 25,
      collection: 'Gold Collection',
      name: 'Gold 3',
      prize: '1600',
      image: 'car15',
      extras: { stake: '0.79', roi: '18' }
    },
    {
      id: 26,
      collection: 'Gold Collection',
      name: 'Gold 4',
      prize: '1600',
      image: 'car16',
      extras: { stake: '0.79', roi: '18' }
    },
    {
      id: 27,
      collection: 'Gold Collection',
      name: 'Gold 5',
      prize: '1600',
      image: 'car17',
      extras: { stake: '0.79', roi: '18' }
    },
    {
      id: 28,
      collection: 'Gold Collection',
      name: 'Gold 6',
      prize: '1600',
      image: 'car18',
      extras: { stake: '0.79', roi: '18' }
    },
    {
      id: 29,
      collection: 'Gold Collection Rare',
      name: 'Gold 7',
      prize: '9600',
      image: 'car27',
      rare: true,
      extras: { stake: '4.74', roi: '18' }
    },
    //platinum
    {
      id: 30,
      collection: 'Platinum Collection',
      name: 'Platinum 1',
      prize: '2600',
      image: 'car19',
      extras: { stake: '1.71', roi: '24' }
    },
    {
      id: 31,
      collection: 'Platinum Collection',
      name: 'Platinum 2',
      prize: '2600',
      image: 'car20',
      extras: { stake: '1.71', roi: '24' }
    },
    {
      id: 32,
      collection: 'Platinum Collection',
      name: 'Platinum 3',
      prize: '2600',
      image: 'car21',
      extras: { stake: '1.71', roi: '24' }
    },
    {
      id: 33,
      collection: 'Platinum Collection',
      name: 'Platinum 4',
      prize: '2600',
      image: 'car22',
      extras: { stake: '1.71', roi: '24' }
    },
    {
      id: 34,
      collection: 'Platinum Collection',
      name: 'Platinum 5',
      prize: '2600',
      image: 'car23',
      extras: { stake: '1.71', roi: '24' }
    },
    {
      id: 35,
      collection: 'Platinum Collection',
      name: 'Platinum 6',
      prize: '2600',
      image: 'car24',
      extras: { stake: '1.71', roi: '24' }
    },
    {
      id: 36,
      collection: 'Platinum Collection Rare',
      name: 'Platinum 7',
      prize: '15600',
      image: 'car28',
      rare: true,
      extras: { stake: '10.25', roi: '24' }
    },
  ];
  tracks: Array<object> = [
    {
      id: 37,
      collection: 'Race tracks',
      name: 'Racer',
      prize: '1152',
      image: 'track',
      extras: { stake: '0.1', roi: '6' }
    },
    {
      id: 38,
      collection: 'Race tracks',
      name: 'Beach Race',
      prize: '1152',
      image: 'track',
      extras: { stake: '0.1', roi: '6' }
    },
    {
      id: 39,
      collection: 'Race tracks',
      name: 'Forest Race',
      prize: '1152',
      image: 'track',
      extras: { stake: '0.1', roi: '6' }
    },
    {
      id: 40,
      collection: 'Race tracks',
      name: 'Space Race',
      prize: '1152',
      image: 'track',
      extras: { stake: '0.1', roi: '6' }
    },
  ];

  displayArray = [];
  @Input() assetType = 'racer';
  @Input() assetId = 1;
  amount = 1;

  constructor(protected api: CarsService, private balanceService: BalanceService, private identityService: AuthService,
    private notify: NotifyService, private router: Router) { }

  ngOnInit() {
    this.resolveBuyAsset();
  }

  resolveBuyAsset(){
    if (this.assetType === 'racer') {
      this.displayArray = this.racers;
    }
    if (this.assetType === 'car') {
      this.displayArray = this.cars;
    }
    if (this.assetType === 'track') {
      this.displayArray = this.tracks;
    }
    this.displayArray = this.displayArray.filter(
      (asset) => asset.id === this.assetId
    );
  }

  plusAmount(){
    this.amount++;
  }

  minusAmount(){
    if (this.amount > 0) {
      this.amount--;
    }
  }

  buyCarFromGarage(index: string) {
    this.api.carsBuyList(index).
      subscribe(datax => {
        const data: any = datax;
        setTimeout(() => {
          console.log(index);
          this.notifyChangedBalance();
          this.router.navigate(['/car/garage/my-cars']);
          this.notify.error('You have bought a new car!');
        }, 1000);
      });
  }

  notifyChangedBalance() {
    this.identityService.updateBalance();
    this.balanceService.balanceHasbeenChanged();
  }

}
