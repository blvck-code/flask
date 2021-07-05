import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { IUserProfile } from '../../../../models/userProfile';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnDestroy {
  public msg: string = '';
  public msgStatus: any;
  private '_userSub': Subscription;
  public 'user': IUserProfile;

  userForm = this.fb.group({
    sender_email: ['', [Validators.required, Validators.email]],
    sender_name: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  get getEmail() {
    return this.userForm.get('sender_email');
  }

  get getName() {
    return this.userForm.get('sender_name');
  }

  get getSubject() {
    return this.userForm.get('subject');
  }

  get getMsg() {
    return this.userForm.get('message');
  }

  constructor(
    public fb: FormBuilder,
    private _authService: AuthService,
    private _contactService: ContactService
  ) {}

  ngOnInit(): void {
    this._userSub = this._authService.profileData().subscribe((res) => {
      this.user = res;
    });
  }

  onSubmit() {
    this.msg = 'Message was successfully received.';
    this._contactService.sendMessage(this.userForm.value).subscribe(
      (res) => {
        this.onSuccess();
        this.userForm.reset();
      },
      (err) => {
        this.onError(err);
        console.log(err);
      }
    );
  }

  onSuccess() {
    this.msg = 'Thank you for your message. I will be in contact with you.';
    this.msgStatus = 200;

    setTimeout(() => {
      this.msg = '';
    }, 5000);
  }

  onError(err: string) {
    this.msg = err;
    this.msgStatus = 400;

    setTimeout(() => {
      this.msg = '';
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this._userSub) {
      this._userSub.unsubscribe();
    }
  }
}
