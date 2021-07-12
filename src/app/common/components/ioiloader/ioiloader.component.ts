import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ioiloader',
  templateUrl: './ioiloader.component.html',
  styleUrls: ['./ioiloader.component.scss'],
})
export class IoiloaderComponent implements OnInit {

  @Input() isInRace = false;

  constructor() { }

  ngOnInit() {}

}
