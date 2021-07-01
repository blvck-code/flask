import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private _router: Router) { }

  userForm = this.fb.group({
    email: ['',[
      Validators.required,
      Validators.email
    ]],
    password: ['', [Validators.required]]
  });

  get getEmail(){
    return this.userForm.get('email');
  }

  get getPass(){
    return this.userForm.get('password')
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this._router.navigate(['/backend']);
    }
  }

  onSubmit(){
    this.authService.login(this.userForm.value).subscribe(
      res => {
        localStorage.setItem('token', res.auth_token);
        this._router.navigate(['/backend']);
        this.authService.getUser();
      },
      err => console.log(err)
    )
  }

}
