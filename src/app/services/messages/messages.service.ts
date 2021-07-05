import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IMessages } from '../../models/messages';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private _url: string = `${env.baseURL}/messages`;

  constructor(private _http: HttpClient, private _authService: AuthService) {}

  getMessages(category: string): Observable<IMessages[]> {
    let params = new HttpParams().set('category', category);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this._authService.getToken()}`,
    });

    return this._http.get<IMessages[]>(`${this._url}`, {
      params: params,
      headers: headers,
    });
  }
}
