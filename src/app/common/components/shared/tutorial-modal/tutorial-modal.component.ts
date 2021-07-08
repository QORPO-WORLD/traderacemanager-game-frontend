import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TickerPricesService } from "../../../../api/services/ticker-prices.service";

@Component({
  selector: 'app-tutorial-modal',
  templateUrl: './tutorial-modal.component.html',
  styleUrls: ['./tutorial-modal.component.scss'],
})
export class TutorialModalComponent implements OnInit {

  tutorialStep = 1;
  @Output() closeModal = new EventEmitter<boolean>();
  currentIoiPrice: number;
  oldIoiPrice: number;
  ioiIncresing = true;

  constructor(protected ticker: TickerPricesService) { }

  ngOnInit() {
    this.getIoiPrice();
  }
  
  closeOnboarding(goToMarket: boolean) {
    this.closeModal.emit(goToMarket);
  }

  getIoiPrice() {
    this.ticker.tickerIoiPriceRead().subscribe((data) => {
      if (!this.oldIoiPrice || !this.currentIoiPrice) {
        this.oldIoiPrice = data;
        this.currentIoiPrice = data;
      }
      this.currentIoiPrice = data;
      if (this.oldIoiPrice !== this.currentIoiPrice) {
        this.ioiIncresing =
          this.oldIoiPrice > this.currentIoiPrice ? false : true;
        this.oldIoiPrice = this.currentIoiPrice;
      }
    });
  }

}
