import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IUserProfile} from "../models/userProfile";
import {AuthService} from "../services/auth/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService implements Resolve<IUserProfile>{

  constructor(private _authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserProfile> | Promise<IUserProfile> | IUserProfile {
    return this._authService.getUser()
  }

}
