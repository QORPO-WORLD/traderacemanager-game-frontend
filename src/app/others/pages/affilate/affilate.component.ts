import { AuthService } from 'src/app/user/services/auth.service';
import { NotifiqService } from './../../../common/services/notifiq.service';
import { NotifyService } from './../../../common/services/notify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DriversService } from '../../../api/services';
import { Subscription } from 'rxjs';
import { Affiliates } from '../../../api/models/affiliates';
import { AffiliatesService } from '../../../api/services/affiliates.service';
import { AffiliateDetails } from 'src/app/api/models';


@Component({
  selector: 'app-affilate',
  templateUrl: './affilate.component.html',
  styleUrls: ['./affilate.component.scss']
})
export class AffilateComponent implements OnInit, OnDestroy {
  myAfiilate = 'https://dev-play.traderacemanager.com/user/referral/';
  myAfiilateShort = '';
  affilateForm: FormGroup;
  formReady = false;
  pageOpen = false;
  affObs: Subscription;
  affilatesList: Array<Affiliates>;
  actualPage = 1;
  totalPages: number;
  offObserver: Subscription;
  Affilate: any;
  affMe: AffiliateDetails;
  rewardLevel = 0;
  rewardLevelMax = 0;
  isLevel = 1;
  constructor(protected api: DriversService, private formBuilder: FormBuilder, private notifyq: NotifiqService,
    private identityService: AuthService, protected affService: AffiliatesService, private notify: NotifyService) { }

  ngOnInit(): void {
    this.getAffilateLink();
    const that = this;
    this.getMyLevel();
    this.getReferralPlayers();
    this.getAffilate();
    const balance = JSON.parse(localStorage.getItem('user-balance'));
    console.log(this.Affilate.affiliate_level);
  }


  ngOnDestroy() {
    this.pageOpen = false;
    if (this.affObs) {
      this.affObs.unsubscribe();
    }
    if (this.offObserver) {
      this.offObserver.unsubscribe();
    }
  }

  copyInputMessage() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.myAfiilate;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.notify.error('Link copied to clipboard');
  }


  getAffilateLink() {
    const data = this.identityService.getStorageIdentity();

    this.myAfiilateShort = data.affiliate_slug;
    this.myAfiilate += data.affiliate_slug;
    this.fireAffilateForm();

  }

  fireAffilateForm() {

    this.affilateForm = this.formBuilder.group({
      affilateLink: [this.myAfiilate]
    });
    this.formReady = true;
  }

  getMyLevel() {
    this.Affilate = this.identityService.getStorageAff();
  }

  getReferralPlayers() {
    this.offObserver = this.affService.affiliatesList(this.actualPage).subscribe(data => {
      const newdata: any = data;
      this.totalPages = newdata.total_pages;
      this.affilatesList = newdata.results;
    });
  }

  nextPage() {
    this.actualPage++;
    this.getReferralPlayers();
  }
  prevPage() {
    this.actualPage--;
    this.getReferralPlayers();
  }


  getAffilate() {
    this.affService.affiliatesMe().subscribe(data => {
      this.affMe = data;
    });
  }



}
