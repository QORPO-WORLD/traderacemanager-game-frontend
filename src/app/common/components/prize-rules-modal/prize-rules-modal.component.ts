import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prize-rules-modal',
  templateUrl: './prize-rules-modal.component.html',
  styleUrls: ['./prize-rules-modal.component.scss'],
})
export class PrizeRulesModalComponent implements OnInit {
  @Input() type: string;
  constructor() { }

  ngOnInit() {}

}
