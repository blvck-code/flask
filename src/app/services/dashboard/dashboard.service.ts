import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env } from "../../../environments/environment";
import {AuthService} from "../auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _url: string = env.baseURL;

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getDash(): Observable<any>{
    return this._http.get(`${this._url}/dashboard`, this._authService.getHeaders())
  }
}
