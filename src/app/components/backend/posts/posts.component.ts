import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  public loading: boolean = false;
  public addPost: boolean = false;

  public img: string = '.././../../assets/imgs/post2.jpg';

  constructor() { }

  ngOnInit(): void {
  }

  addPostMode(){
    this.addPost = !this.addPost
  }

}
