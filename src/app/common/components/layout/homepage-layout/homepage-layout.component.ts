import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";
declare let $: any;
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  withCredentials: true,
};
@Component({
  selector: "app-homepage-layout",
  templateUrl: "./homepage-layout.component.html",
  styleUrls: ["./homepage-layout.component.scss"],
})
export class HomepageLayoutComponent implements OnInit {
  currentRoute: string;
  menuActive = 1;
  isMenuActive = false;
  activeMenu = 0;
  constructor(private router: Router) {
    this.currentRoute = this.router.url.split("?")[0];
  }

  ngOnInit() {
    console.log(this.currentRoute);
  }

  onActivate(elem1: HTMLElement) {
    elem1.scrollIntoView({ behavior: "auto", block: "start" });
  }
  activateMenu() {
    if (this.activeMenu === 0) {
      this.isMenuActive = true;
      this.activeMenu = 1;
    } else {
      this.isMenuActive = false;
      this.activeMenu = 0;
    }
  }
  updateRoute(route: string) {
    this.currentRoute = route;
  }
}
