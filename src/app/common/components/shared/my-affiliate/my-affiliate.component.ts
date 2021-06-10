import { Component, OnInit } from "@angular/core";
import { AffiliatesService } from "../../../../api/services/affiliates.service";
import { Affiliates } from "../../../../api/models/affiliates";
import { Subscription } from "rxjs";

@Component({
  selector: "app-my-affiliate",
  templateUrl: "./my-affiliate.component.html",
  styleUrls: ["./my-affiliate.component.scss"],
})
export class MyAffiliateComponent implements OnInit {
  subpageAff = true;
  affilatesList: Array<Affiliates>;
  actualPage = 1;
  totalPages: number;
  offObserver: Subscription;

  constructor(protected api: AffiliatesService) {}

  ngOnInit() {
    this.getReferralPlayers();
  }

  ngOnDestroy() {
    if (this.offObserver) {
      this.offObserver.unsubscribe();
    }
  }

  getReferralPlayers() {
    this.offObserver = this.api
      .affiliatesList(this.actualPage)
      .subscribe((data) => {
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

  resolveLevel(item) {
    if (item === 1) {
      return "level1";
    } else if (item === 2) {
      return "level2";
    } else if (item === 3) {
      return "level3";
    } else if (item === 4) {
      return "level4";
    }
  }
}
