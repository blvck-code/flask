import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public loading: boolean = false;

  public img: string = '.././../../assets/imgs/post2.jpg';
  constructor() { }

  ngOnInit(): void {
  }

}
