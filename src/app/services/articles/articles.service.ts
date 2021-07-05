import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private _url: string = `${env.baseURL}/articles`;

  constructor(private _http: HttpClient) {}

  getArticles(page?: number): Observable<any> {
    let params = new HttpParams().set('size', 3).set('page', 1);
    if (page) {
      params = new HttpParams().set('size', 3).set('page', page);
    }

    return this._http.get(`${this._url}/list`, {
      params: params,
    });
  }

  getArticleById(id: string | null): Observable<any> {
    return this._http.get(`${this._url}/${id}`);
  }
}
