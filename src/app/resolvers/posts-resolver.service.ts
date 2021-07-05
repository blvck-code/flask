import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ArticlesService } from '../services/articles/articles.service';

@Injectable({
  providedIn: 'root',
})
export class PostsResolverService implements Resolve<any> {
  constructor(private _articleService: ArticlesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._articleService.getArticles();
  }
}
