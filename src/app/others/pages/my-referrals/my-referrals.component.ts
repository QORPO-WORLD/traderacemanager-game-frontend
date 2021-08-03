import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Affiliates } from "../../../api/models/affiliates";
import { AffiliatesService } from "../../../api/services/affiliates.service";
import { AffiliateDetails } from "src/app/api/models";

@Component({
  selector: "app-my-referrals",
  templateUrl: "./my-referrals.component.html",
  styleUrls: ["./my-referrals.component.scss"],
})
export class MyReferralsComponent implements OnInit {
  constructor(protected affService: AffiliatesService) {}
  pageOpen = false;
  affObs: Subscription;
  affiliatesList: Array<Affiliates>;
  offObserver: Subscription;
  actualPage = 1;
  totalPages: number;
  affMe: AffiliateDetails;
  ngOnInit() {
    this.getReferralPlayers();
    this.getAffilate();
  }

  getReferralPlayers() {
    this.offObserver = this.affService
      .affiliatesList(this.actualPage)
      .subscribe((data) => {
        const newdata: any = data;
        this.totalPages = newdata.total_pages;
        this.affiliatesList = newdata.results;
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
    this.affService.affiliatesMe().subscribe((data) => {
      this.affMe = data;
    });
  }
}
