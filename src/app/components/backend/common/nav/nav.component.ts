import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public image : string = '../../../../assets/imgs/oluoch.jpg';

  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logOut();
    return this._router.navigate(['/backend/login'])
  }

}
