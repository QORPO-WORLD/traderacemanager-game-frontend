import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.scss']
})
export class BridgeComponent implements OnInit {

  constructor(private authService: AuthService , private router: Router) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/race/start-race']);
     }, 200);
  }

}
