import { Component, OnInit, Input, OnDestroy } from '@angular/core';
declare const TradingView: any;
@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit, OnDestroy {
  @Input() type: string;
  requestObj: any;
  first = true;
  canAj = true;
  more: any;
  constructor() { }

  ngAfterViewInit() {
    this.fire();
  }

  fire() {
    if (this.type) {

      setTimeout(() => {

        // tslint:disable-next-line: no-unused-expression
        this.more = new TradingView.widget({
          container_id: 'technical-analysis',
          autosize: true,
          symbol: this.type,
          interval: '3',
          timezone: 'exchange',
          theme: 'Dark',
          style: '1',
          toolbar_bg: '#f1f3f6',
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: false,
          save_image: false,
          hideideas: true,
          studies: [
            'MASimple@tv-basicstudies'],
          show_popup_button: false,
          popup_width: '1000',
          popup_height: '650'
        });


      }, 1000);
    }
  }
  ngOnInit() {
    //this.serializeRequest();
  }

  ngOnDestroy() {
    this.more = null;
  }

  getIndicator() {

  }

}
