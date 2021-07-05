import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUserProfile } from 'src/app/models/userProfile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ISkills } from '../../../../models/Skills';
import { SkillsMock } from '../../../../models/skills-mock';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy {
  public 'profile': IUserProfile;
  private 'subProfile': Subscription;

  public img: string = '../../../../assets/imgs/oluoch.jpg';
  public skills: ISkills[] = SkillsMock;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.subProfile = this._authService
      .profileData()
      .subscribe((res) => (this.profile = res));
  }

  ngOnDestroy(): void {
    if (this.subProfile) {
      this.subProfile.unsubscribe();
    }
  }
}
