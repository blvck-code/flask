import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ArticlesService } from 'src/app/services/articles/articles.service';

@Component({
  selector: 'app-arcticles-list',
  templateUrl: './arcticles-list.component.html',
  styleUrls: ['./arcticles-list.component.css'],
})
export class ArcticlesListComponent implements OnInit {
  image: string = '../../../../assets/imgs/articles';
  finished: boolean = false;
  loading: boolean = false;
  articles: any = [];
  public title: string = 'All Post';
  notEmptyPost: boolean = true;
  notScrolly: boolean = true;
  page: number = 1;

  constructor(
    private _articleService: ArticlesService,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    if (this.route.snapshot.data.articles) {
      this.articles = this.route.snapshot.data.articles?.data;
    }
  }

  ngOnInit(): void {}

  truncate(title:string){
    return title.split(" ").splice(0,10).join(" ")
  }

  onScroll() {
    if (this.notEmptyPost && this.notScrolly) {
      this.page += 1;
      this.loading = true;
      this.notScrolly = false;

      this._articleService.getArticles(this.page).subscribe(
        (res) => {
          this.articles = this.articles.concat(res?.data);
          this.loading = false;
          this.notEmptyPost = true;
          this.notScrolly = true;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  navigateArticleDetail(article: any) {
    this._router.navigate(['/articles', article.id], {
      queryParams: {
        article: article.title,
      },
    });
  }
}
