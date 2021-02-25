import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss'],
})
export class LangSwitcherComponent implements OnInit {
  availableLangs = ['en', 'de', 'es', 'ru', 'ci', 'ko'];
  langSelected: string;
  constructor(private trservice: TranslateService) {
    this.trservice.addLangs(['en', 'de', 'es', 'ru', 'ci', 'ko']);
    if (this.trservice.currentLang === undefined) {
      this.trservice.setDefaultLang('en');
      this.langSelected = 'en';
      this.trservice.use(this.langSelected);
    } else {
      this.langSelected = this.trservice.currentLang;
      this.trservice.use(this.langSelected);
    }
  }

  ngOnInit() {



  }

  switchLanguage(event) {
    this.trservice.use(event.target.value);

  }

}
