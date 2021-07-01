import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {IUserProfile} from "../../models/userProfile";
import {environment as env } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url: string = env.baseURL;
  public 'userProfile': IUserProfile;

  constructor(private http: HttpClient, private _router: Router) { }

  getToken() {
    return localStorage.getItem('token');
  }

  profileData():Observable<IUserProfile>{
     return this.http.get<IUserProfile>(`${this._url}/profile`)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logOut(){
    return localStorage.removeItem('token')
  }

  guardPage(err: any){
    if(err instanceof HttpErrorResponse){
      if(err.status === 401 || err.status === 422 || err.status === 403){
        this.logOut();
        this._router.navigate(['/backend/login'])
      }
    }
  }

  authPages(){
    this.getUser().subscribe(
      res => {
        return true
      },
      err => this.guardPage(err)
    )
  }

  getHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return {headers}
  }


  login(data: any):Observable<any> {
    return this.http.post(`${this._url}/login`, data)
  }

  getUser():Observable<any>{
   return this.http.get(`${this._url}/user`, this.getHeaders())
  }

  updateProfile(data: IUserProfile):Observable<any>{
    return this.http.put(`${this._url}/profile/update`, data, this.getHeaders())
  }
}
