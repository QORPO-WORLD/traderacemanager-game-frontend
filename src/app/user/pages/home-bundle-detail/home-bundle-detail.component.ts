import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home-bundle-detail",
  templateUrl: "./home-bundle-detail.component.html",
  styleUrls: ["./home-bundle-detail.component.scss"],
})
export class HomeBundleDetailComponent implements OnInit {
  bundleBack: string;
  backTo: string;
  bundles: Array<object> = [
    {
      id: 1,
      name: "DAOMaker",
      carId: 41,
      avatarName: "dao-maker",
      image: "bundle-dao",
    },
    {
      id: 2,
      name: "Shreyansh",
      carId: 42,
      avatarName: "polygon",
      image: "bundle-polygon",
    },
    {
      id: 3,
      name: "Kyle Chasse",
      carId: 44,
      avatarName: "paid",
      image: "bundle-kyle",
    },
    {
      id: 4,
      name: "Ash WSB",
      carId: 45,
      avatarName: "ash-wsb",
      image: "bundle-ash",
    },
    {
      id: 5,
      name: "Tehmoonwalker",
      carId: 46,
      avatarName: "tehmoonwalker",
      image: "bundle-tehmoon",
    },
    {
      id: 6,
      name: "Parabolic Guy",
      carId: 47,
      avatarName: "parabolic-guy",
      image: "bundle-parabolic",
    },

    {
      id: 7,
      name: "Altcoin Buzz",
      carId: 50,
      avatarName: "altcoin-buzz",
      image: "bundle-altcoin",
    },
    {
      id: 8,
      name: "Cryptowizard",
      carId: 51,
      avatarName: "cryptowizard",
      image: "bundle-wizard",
    },
  ];

  bundleId = 1;
  typeObserver: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getAssetType();
  }

  getAssetType() {
    this.typeObserver = this.route.queryParams.subscribe((params) => {
      this.bundleId = +params["id"];
      this.bundleBack = params["back"];
      this.backTo = this.bundleBack;

      this.bundles = this.bundles.filter(
        (item) => item["id"] === this.bundleId
      );
    });
  }
}
