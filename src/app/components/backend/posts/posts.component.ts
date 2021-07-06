import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ArticlesService} from "../../../services/articles/articles.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  public loading: boolean = false;
  public addPost: boolean = false;
  public image: any = null;
  public imagePreview: any;
  public posting: boolean = false

  public img: string = '.././../../assets/imgs/post2.jpg';

  constructor(
    private fb: FormBuilder,
    private _articleService: ArticlesService
  ) { }

  articleForm = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  handleImg(e: any){
    this.image = e.target;
    console.log(e.target.files[0])
    console.log(e.target.files[0]['name'])
  }

  addPostMode(){
    this.addPost = !this.addPost
  }

  onFileSelect(e: any){
    let files = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);

    reader.onload = e => {
      this.imagePreview = e.target?.result
    };
  }

  addArticle(){
    this.posting = true;

    this._articleService.addArticle(this.articleForm.value, this.image['files']).subscribe(
      res => {
        this.posting = false
      }
    )

  }

}
