import { AuthService } from 'src/app/user/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MfaService } from 'src/app/api/services/mfa.service';
import { Subscription } from 'rxjs';
import { DriversService } from 'src/app/api/services';
import { Router } from '@angular/router';
import { NotifiqService } from 'src/app/common/services/notifiq.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-gauthr',
  templateUrl: './gauthr.component.html',
  styleUrls: ['./gauthr.component.scss'],
})
export class GauthrComponent implements OnInit, OnDestroy {
  curStep = 0;
  xObserver: Subscription;
  dObserver: Subscription;
  tObserver: Subscription;
  fObserver: Subscription;
  myKey: string;
  qrkey: any;
  testinp: string;
  pass: string;
  imgurl: any;
  constructor(private mfsrvc: MfaService, private drvrsrvc: DriversService,
    private route: Router, private notify: NotifiqService, protected translate: TranslateService,
    private identityService: AuthService) { }

  ngOnInit() {
    this.getKey();
    //this.getQrKey();
    this.firstLoginCancel();
  }

  ngOnDestroy() {

    if (this.xObserver) {
      this.xObserver.unsubscribe();
    }
    if (this.dObserver) {
      this.dObserver.unsubscribe();
    }
    if (this.tObserver) {
      this.tObserver.unsubscribe();
    }
    if (this.fObserver) {
      this.fObserver.unsubscribe();
    }
  }

  getKey() {
    this.xObserver = this.mfsrvc.mfaSecretCreate().subscribe(data => {
      const oldata: any = data;
      this.myKey = oldata.secret;
      this.imgurl = 'https://api.traderacemanager.com' + oldata.qr_url.toString();
    });
  }

  copyInputMessage() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.myKey;
    document.body.appendChild(selBox);
    selBox.select();
    selBox.focus();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  getQrKey() {

    this.dObserver = this.mfsrvc.mfaQrSecretCreate().subscribe(data => {

      this.createImageFromBlob(data);
    });
  }

  testKey() {
    this.tObserver = this.mfsrvc.mfaTestCreate({ code: this.testinp }).subscribe(data => {
      if (data) {
        if (data.result === true) {
          console.log('yeah');
          this.route.navigate(['/race/start-race']);
        } else {
          this.translate.get('nitro_notifiq').subscribe((res) => {
            this.notify.error('x', res.wrong_code);
          });
        }
      }
    });
  }

  cancelKey() {
    this.xObserver = this.mfsrvc.mfaSecretCreate().subscribe(data => {
      this.route.navigate(['/race/start-race']);
    });
  }

  createImageFromBlob(image: any) {

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      this.qrkey = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  firstLoginCancel() {
    const data = this.identityService.getStorageIdentity();
    if (data.is_first_login === true) {
      this.drvrsrvc.driversFirstLoginPartialUpdate().subscribe(datax => {
        console.log('');
      });
    }
  }

}
