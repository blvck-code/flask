import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public loading: boolean = false;

  public img: string = '.././../../assets/imgs/post2.jpg';

  constructor(private fb: FormBuilder) { }

  emailForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email,
    ]]
  })

  get getEmail() {
    return this.emailForm.get('email')
  }

  onSubmit(){
    console.log(this.emailForm.value)
    this.emailForm.setValue({
      email: ['']
    })
    this.emailForm.valid
  }

  ngOnInit(): void {
  }

}
