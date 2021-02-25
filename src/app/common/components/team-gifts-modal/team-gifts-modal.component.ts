//import { TeamChatSendGift } from './../../../api/models/team-chat-send-gift';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarsService, TeamChatService } from 'src/app/api/services';

@Component({
  selector: 'app-team-gifts-modal',
  templateUrl: './team-gifts-modal.component.html',
  styleUrls: ['./team-gifts-modal.component.scss'],
})
export class TeamGiftsModalComponent implements OnInit, OnDestroy{

  stepIndex = 1;
  giftSelected = '';
  amount = 0;
  editionAvailableSlides: number;
  editionStylePx = 0;
  editionSlideIndex = 0;
  myCarsObserver: Subscription;
  giftObserver: Subscription;
  myCars: any;
  selectedCar: any;
  selectedCarIndex: number;
  gift: any = {
    receiving_user_nickname: null,
    car_id: null,
    trx_amount: null,
    ioi_amount: null
  };
  @Input() recipient: string;
  constructor(protected api: CarsService, private apichat: TeamChatService) { }

  ngOnInit() {
    this.getMyCars();
  }

  ngOnDestroy() {
    if (this.giftObserver) {
      this.giftObserver.unsubscribe();
    }
    if (this.myCarsObserver) {
      this.myCarsObserver.unsubscribe();
    }
  }

  getMyCars() {
    this.myCarsObserver = this.api.carsMineList().subscribe(data => {
      const objs: any = data;
      const haha = objs.sort((a, b) =>
        b.car_id - a.car_id
      );
      haha.reverse();
      this.myCars = haha;
      this.editionAvailableSlides = (this.myCars.length / 2) - 3;
    });
  }

  secondStep() {
    this.amount = 0;
    if (this.giftSelected === 'ioi') {
      this.stepIndex = 2;
    } else if (this.giftSelected === 'trx') {
      this.stepIndex = 3;
    } else if (this.giftSelected === 'car') {
      this.stepIndex = 4;
    }
  }

  nextEdition() {
    for (let x = 0; x < 3; x++) {
      if (this.editionSlideIndex < this.editionAvailableSlides) {
        this.editionSlideIndex++;
        this.editionStylePx += 217;
      }
    }
  }
  prevEdition() {
    for (let x = 0; x < 3; x++) {
      if (this.editionSlideIndex > 0) {
        this.editionSlideIndex--;
        this.editionStylePx -= 217;
      }
    }
  }

  selectCar(index) {
    this.selectedCarIndex = index;
    this.selectedCar = this.myCars[index];
  }

  reset() {
    setTimeout(() => {
      this.stepIndex = 1;
      this.giftSelected = '';
    }, 400);
  }

  sendGift() {
    /*
    const req: any = {};
    req.receiving_user_nickname = this.recipient;

    if (this.giftSelected === 'trx') {
      req.trx_amount = this.amount.toString();
    }
    if (this.giftSelected === 'ioi') {
      req.ioi_amount = this.amount.toString();
    }
    if (this.giftSelected === 'car') {
      req.car_id = this.myCars[this.selectedCarIndex].pk;
    }
    this.giftObserver = this.apichat.teamChatSendGiftPartialUpdate(
      req
    ).subscribe(data => {
      this.stepIndex = 5;
    });
*/
  }

}
