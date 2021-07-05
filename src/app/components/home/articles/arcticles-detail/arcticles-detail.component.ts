import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';

import { ArticlesService } from 'src/app/services/articles/articles.service';

@Component({
  selector: 'app-arcticles-detail',
  templateUrl: './arcticles-detail.component.html',
  styleUrls: ['./arcticles-detail.component.css'],
})
export class ArcticlesDetailComponent implements OnInit {
  image: string = '../../../../assets/imgs/articles';
  article: any;

  constructor(
    private _route: ActivatedRoute,
    private _articleService: ArticlesService,
    private _router: Router
  ) {
    _route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('slug')) {
        this._articleService.getArticleById(params.get('slug')).subscribe(
          (res) => {
            this.article = res;
          },
          (err) => {
            this._router.navigate(['/pageNotFound']);
          }
        );
      } else {
        this._router.navigate(['/pageNotFound']);
      }
    });
  }

  ngOnInit(): void {
    console.log(this._route.paramMap);
  }
}
