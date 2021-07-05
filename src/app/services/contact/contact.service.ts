import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from 'src/app/models/contact';
import { IMessages } from 'src/app/models/messages';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _url: string = env.baseURL;

  constructor(private _http: HttpClient) {}

  sendMessage(data: IMessages): Observable<any> {
    return this._http.post(`${this._url}/messages`, data);
  }
}
