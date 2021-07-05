import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  categories = [
    {
      title: 'all posts',
      route: 'all-posts',
      colletion: 200,
    },
    {
      title: '30 days of python',
      route: '30-days-of-python',
      colletion: 20,
    },
    {
      title: 'coding interview problemss',
      route: 'coding-interview-problems',
      colletion: 4,
    },
    {
      title: 'flask',
      route: 'flask',
      colletion: 5,
    },
    {
      title: 'GUI development',
      route: 'gui-development',
      colletion: 6,
    },
    {
      title: 'angular JWT',
      route: 'angular-jwt',
      colletion: 1,
    },
    {
      title: 'learn python programming',
      route: 'learn-python-programming',
      colletion: 45,
    },
    {
      title: 'angular error handler',
      route: 'angular-error-handler',
      colletion: 4,
    },
  ];

  @Input() public pageTitle: string = '';
  @Input() public 'colletion': number | null;

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  navigateCategory(category: any) {
    this._router.navigate(['/articles/', category.route], {
      queryParams: {
        category: category.title,
        colletion: category.colletion,
      },
    });
  }
}
