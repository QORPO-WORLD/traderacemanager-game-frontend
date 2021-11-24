import { Component, OnInit, Input, OnDestroy } from '@angular/core';
declare const TradingView: any;
@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit, OnDestroy {
  @Input() type: string;
  @Input() chart = 'chart';
  requestObj: any;
  first = true;
  canAj = true;
  more: any;
  constructor() { }

  ngAfterViewInit() {
    this.fire();
  }

  fire() {


    // setTimeout(() => {
    //   if (this.type) {
    //     // tslint:disable-next-line: no-unused-expression
    //     this.more = new TradingView.widget({
    //       container_id: 'technical-analysis',
    //       autosize: true,
    //       symbol: this.type,
    //       interval: '3',
    //       timezone: 'exchange',
    //       theme: 'Dark',
    //       style: '1',
    //       toolbar_bg: '#f1f3f6',
    //       withdateranges: true,
    //       hide_side_toolbar: true,
    //       allow_symbol_change: true,
    //       save_image: false,
    //       hideideas: true,
    //       width: 300,
    //       height: 300,
    //       studies: [
    //         'MASimple@tv-basicstudies'],
    //       show_popup_button: false
    //     });
    //   }

    // }, 200);

  }
  ngOnInit() {
    //this.serializeRequest();
    console.log(this.chart);
  }

  ngOnDestroy() {
    this.more = null;
  }

  getIndicator() {

  }

}
