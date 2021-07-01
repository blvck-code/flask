import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import { Subscription} from "rxjs";
import {IUserProfile} from "../../../../models/userProfile";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

    public 'msg': any = null;
    private '_userSub': Subscription;
    public 'user': IUserProfile;

    userForm = this.fb.group({
    email: ['',
      [
        Validators.required,
        Validators.email
      ]
    ],
    name: ['', Validators.required,],
    message: ['', Validators.required]
  });

  get getEmail() {
    return this.userForm.get('email')
  }

  get getName() {
    return this.userForm.get('name')
  }

  get getMsg() {
    return this.userForm.get('message')
  }

  constructor(
    public fb: FormBuilder,
    private _authService: AuthService,
    ) {}

  ngOnInit(): void {
    this._userSub = this._authService.profileData().subscribe(
      res => {
        this.user = res;
      }
    )
  }

  onSubmit(){
    this.msg = 'Message was successfully received.';

    setTimeout(() => {
      this.msg = null;
    }, 3000);

    this.userForm.patchValue({
      email: [''],
      name: [''],
      message: ['']
      }
    )
  }

  ngOnDestroy(): void {
    if(this._userSub) {
      this._userSub.unsubscribe()
    }
  }
}
