import { AuthService as Ninja } from "src/app/api/services/auth.service";
import { Router } from "@angular/router";
import { NotifyService } from "./../../../common/services/notify.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { environment } from "src/environments/environment.prod";
declare let ga: any;
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  withCredentials: true,
};

@Component({
  selector: "app-verify-user",
  templateUrl: "./verify-user.component.html",
  styleUrls: ["./verify-user.component.scss"],
})
export class VerifyUserComponent implements OnInit {
  myCode = "";
  loading = false;
  constructor(
    private _http: HttpClient,
    private notify: NotifyService,
    private router: Router,
    private auth: AuthService,
    private api: Ninja
  ) {}

  ngOnInit() {
    this.api.initSession().subscribe((data) => {
      console.log("init");
    });
  }

  tryActivation() {
    if (this.myCode.length > 5) {
      this.loading = true;
      this.api.meActivate({ code: this.myCode }).subscribe((data) => {
        this.resolveActivation(data);
      });
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    }
  }

  resolveActivation(data) {
    this.auth.login(null);
    ga("event", "dokoncena", {
      eventCategory: "registrace",
      eventAction: "dokoncena",
      value: "registrace dokoncena",
    });
  }

  resendActivation() {
    this.api.meResendActivate({ code: this.myCode }).subscribe((data) => {
      this.notify.error("New verification code sent to your email.");
    });
    this.myCode = "";
  }

  signout() {
    this.auth.logout();
  }
  scrollTop(elem1: HTMLElement) {
    let timeout1 = window.setTimeout(() => {
      elem1.scrollIntoView({ behavior: "smooth", block: "start" });
      clearTimeout(timeout1);
    }, 200);
  }
}
