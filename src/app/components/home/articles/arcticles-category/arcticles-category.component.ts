import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-arcticles-category',
  templateUrl: './arcticles-category.component.html',
  styleUrls: ['./arcticles-category.component.css'],
})
export class ArcticlesCategoryComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private _router: Router) {
    _route.paramMap.subscribe((params: Params) => {
      if (params.get('category')) {
        this.title = params.get('category');
      }
      if (params.get('colletion')) {
        this.colletion = params.get('colletion');
      }
    });
    console.log(_route.paramMap);
  }

  public title: any;
  public colletion: any;

  ngOnInit(): void {}
}
