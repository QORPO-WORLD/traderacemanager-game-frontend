import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home-bundle-detail',
  templateUrl: './home-bundle-detail.component.html',
  styleUrls: ['./home-bundle-detail.component.scss'],
})
export class HomeBundleDetailComponent implements OnInit {

  bundles: Array<any> = [
    {
      id: 1,
      name: 'Tehmoonwalker',
      carId: 46,
      avatarName: 'tehmoonwalker'
    },
    {
      id: 2,
      name: 'Ash WSB',
      carId: 45,
      avatarName: 'ash-wsb'
    },
    {
      id: 3,
      name: 'DAOMaker',
      carId: 41,
      avatarName: 'dao-maker'
    },
    {
      id: 4,
      name: 'Cryptowizard',
      carId: 51,
      avatarName: 'cryptowizard'
    },
    {
      id: 5,
      name: 'Parabolic Guy',
      carId: 47,
      avatarName: 'parabolic-guy'
    },
    {
      id: 6,
      name: 'PAID Network',
      carId: 44,
      avatarName: 'paid'
    },
  ];

  bundleId = 1;
  typeObserver: Subscription;

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.getAssetType();
  }
  
  getAssetType() {
    this.typeObserver = this.route.queryParams.subscribe((params) => {
      this.bundleId = params["id"];
      console.log(this.bundleId);
    });
  }

}
