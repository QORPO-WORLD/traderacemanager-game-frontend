import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules-info-modal',
  templateUrl: './rules-info-modal.component.html',
  styleUrls: ['./rules-info-modal.component.scss'],
})
export class RulesInfoModalComponent implements OnInit {

  showRuleModal = true;
  stepIndex = 2;

  constructor() { }

  ngOnInit() { }
  
  switchModal() {
    this.showRuleModal = !this.showRuleModal;
  }

}
