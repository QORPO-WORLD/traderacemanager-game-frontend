import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../api/services/auth.service";

@Component({
  selector: "app-activation",
  templateUrl: "./activation.component.html",
  styleUrls: ["./activation.component.scss"],
})
export class ActivationComponent implements OnInit {
  activationId: string;
  activationHash: string;

  constructor(
    protected route: ActivatedRoute,
    private router: Router,
    protected api: AuthService
  ) {
    this.activationId = this.route.snapshot.paramMap.get("id");
    this.activationHash = this.route.snapshot.paramMap.get("hash");

    this.activateUser();
  }

  ngOnInit(): void {}

  activateUser() {
    this.api
      .authVerificationConfirmCreate({
        verificationHash: this.activationHash,
        uid: this.activationId,
      })
      .subscribe((data) => {
        this.router.navigate(["user/user-verify"]);
      });
  }
}
