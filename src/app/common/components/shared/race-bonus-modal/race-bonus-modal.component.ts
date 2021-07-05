import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-race-bonus-modal',
  templateUrl: './race-bonus-modal.component.html',
  styleUrls: ['./race-bonus-modal.component.scss'],
})
export class RaceBonusModalComponent implements OnInit {
  showBonusModal = false;
  stepIndex = 1;
  modalPages = 2;

  constructor() { }

  ngOnInit() {}
  
  switchModal() {
    this.showBonusModal = !this.showBonusModal;
  }

  openModal(isPremium: boolean, hasNft: boolean){
    if(isPremium === true && hasNft === true){
      this.showBonusModal = false;
    }
    else{
      this.showBonusModal = true;
      if(isPremium === false && hasNft === false){
        this.showBonusModal = true;
        this.modalPages = 2;
      }
      else if(isPremium === false){
        this.stepIndex = 1;
        this.modalPages = 1;
      }
      else{
        this.stepIndex = 2;
        this.modalPages = 1;
      }
    }
  
  }

  modalNext(){
    this.stepIndex = this.stepIndex + 1;
  }
}
