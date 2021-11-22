import { Component, OnInit, OnDestroy } from "@angular/core";
import { MfaService } from "src/app/api/services/mfa.service";
import { Subscription } from "rxjs";
import { DriversService } from "src/app/api/services";
import { Router } from "@angular/router";
import { NotifiqService } from "src/app/common/services/notifiq.service";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "src/app/user/services/auth.service";

@Component({
  selector: "app-gauthr",
  templateUrl: "./disgauthr.component.html",
  styleUrls: ["./disgauthr.component.scss"],
})
export class DisGauthrComponent implements OnInit, OnDestroy {
  isManager: boolean;
  curStep = 0;
  xObserver: Subscription;
  dObserver: Subscription;
  tObserver: Subscription;
  fObserver: Subscription;
  myKey: string;
  qrkey: any;
  testinp: string;
  pass: string;
  constructor(
    private mfsrvc: MfaService,
    private drvrsrvc: DriversService,
    private route: Router,
    private notify: NotifiqService,
    protected translate: TranslateService,
    private identityService: AuthService
  ) {}

  ngOnInit() {
    //this.getKey();
    //this.getQrKey();
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
    this.xObserver = this.mfsrvc.mfaSecretCreate().subscribe((data) => {
      const oldata: any = data;
      this.myKey = oldata.secret;
    });
  }
  getQrKey() {
    this.dObserver = this.mfsrvc.mfaQrSecretCreate().subscribe((data) => {
      this.createImageFromBlob(data);
    });
  }

  testKey() {
    this.tObserver = this.mfsrvc
      .mfaCancelCreate({ code: this.testinp })
      .subscribe((data) => {
        if (data) {
          if (data.result === true) {
            this.identityService.logout();
          } else {
            this.translate.get("nitro_notifiq").subscribe((res) => {
              this.notify.error("x", res.wrong_code);
            });
          }
        }
      });
  }

  cancelKey() {
    this.route.navigate(["/other/download"]);
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.qrkey = reader.result;
      },
      false
    );
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  recognizeManager() {
    const man = this.identityService.getDriverMe().mode;
    if (man === "owner") {
      this.isManager = true;
    } else {
      this.isManager = false;
    }
  }
}
