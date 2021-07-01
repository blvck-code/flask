import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public loading: boolean = false;

  public img: string = '.././../../assets/imgs/kababa.jpg';
  public img2: string = '.././../../assets/imgs/proj3.jpg';
  public img3: string = '.././../../assets/imgs/proj7.jpg';
  public img4: string = '.././../../assets/imgs/proj9.jpg';

  constructor(private _dashService: DashboardService, private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this._dashService.getDash().subscribe(
      res => console.log(res),
      err => {
        this._authService.guardPage(err)
      }
    )
  }

}
