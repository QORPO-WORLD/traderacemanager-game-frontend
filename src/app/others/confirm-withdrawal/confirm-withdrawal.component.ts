import { NotifiqService } from './../../common/services/notifiq.service';
import { BlockchainService } from 'src/app/api/services';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-withdrawal',
  templateUrl: './confirm-withdrawal.component.html',
  styleUrls: ['./confirm-withdrawal.component.scss'],
})
export class ConfirmWithdrawalComponent implements OnInit, OnDestroy {
  myHash: string;
  confirmObserver: Subscription;
  constructor(private route: Router, protected actroute: ActivatedRoute,
              private blckn: BlockchainService, private nitro: NotifiqService, protected translate: TranslateService) {
    this.myHash = this.actroute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.confirmWithdrawal();
  }

  ngOnDestroy() {
    if (this.confirmObserver) {
      this.confirmObserver.unsubscribe();
    }
  }

  confirmWithdrawal() {
    this.confirmObserver = this.blckn.blockchainConfirmWithdrawalCreate(
      this.myHash).subscribe((data) => {
        this.translate.get('nitro_notifiq').subscribe((res) => {
          this.nitro.error(res.sucess, res.redirected);
        });
        this.route.navigate(['/race/start-race']);
      });
  }


}
