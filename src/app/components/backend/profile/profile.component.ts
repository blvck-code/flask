import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUserProfile} from "../../../models/userProfile";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public active: string = 'profile';
  public img: string = '../../../../assets/imgs/oluoch.jpg';
  public date: string = 'text';
  public 'userProfile': IUserProfile;
  private 'profileSub': Subscription;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _fb: FormBuilder,
    ) {
    if(this._route.snapshot.data.profile){
      this.userProfile = this._route.snapshot.data.profile.data;
      this.profileForm.patchValue({
        firstName: this.userProfile.first_name,
        lastName: this.userProfile.last_name,
        email: this.userProfile.email,
        phone: this.userProfile.phone,
        country: this.userProfile.country,
        dateOfBirth: this.userProfile.date_of_birth,
        bio: this.userProfile.bio,
        websiteURL: this.userProfile.website_url,
        instagram: this.userProfile.instagram,
        twitter: this.userProfile.twitter,
        linkedIn: this.userProfile.linkedin,
        facebook: this.userProfile.facebook,
      })
    }else {
      console.log(this._route.snapshot.data.profile)
    }
  }

  profileForm = this._fb.group({
    firstName:['', [Validators.required]],
    lastName:['', [Validators.required]],
    email:['',
      [
      Validators.required,
        Validators.email
      ]
    ],
    phone:['', [Validators.required]],
    country:['', [Validators.required]],
    dateOfBirth:['', [Validators.required]],
    websiteURL:['', [Validators.required]],
    bio:['', [Validators.required]],
    facebook:['', [Validators.required]],
    linkedIn:['', [Validators.required]],
    instagram:['', [Validators.required]],
    twitter:['Twitter', [Validators.required]],
  });


  ngOnInit(): void {}

  setActive(item: string){
    this.active = item;
  }

  updateForm(){
    this._authService.updateProfile(this.profileForm.value).subscribe(
      res => {
        this.userProfile = res.data;
      },
      err => console.log(err)
    );
  }

  ngOnDestroy():void {
    if(this.profileSub){
      this.profileSub.unsubscribe()
    }
  }
}
