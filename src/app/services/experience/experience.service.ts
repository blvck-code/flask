import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env } from "../../../environments/environment";
import {IExperience} from "../../models/experience";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private _url = `${env.baseURL}/experience`;

  constructor(private http: HttpClient, private _authService: AuthService) { }

  getExperience():Observable<any> {
    console.log(this._url);
    return this.http.get<IExperience[]>(`${this._url}/list`, {headers : new HttpHeaders({
        'Content-Type':'application/json',
      })})
  }

  addExperience(data: IExperience):Observable<any> {
    return this.http.post(`${this._url}/create`, data, this._authService.getHeaders())
  }

  getExperiencebyId(id: any):Observable<any>{
    return this.http.get(`${this._url}/${id}/detail`)
  }

  updateExpe(expe_id: number, data: IExperience):Observable<any>{

    return this.http.put(`${this._url}/${expe_id}/update`, data, this._authService.getHeaders());
  }

  deleteExperince(id: number):Observable<any>{
    return this.http.delete(`${this._url}/${id}/delete`, this._authService.getHeaders())
  }

}
