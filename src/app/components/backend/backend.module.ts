import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BackendRoutingModule } from "./backend-routing.module";
import { BackendComponent } from "./backend.component";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './common/nav/nav.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import {MaterialModule} from "../../material/material.module";
import { BaseComponent } from './common/base/base.component';
import { PostsComponent } from './posts/posts.component';
import { ProjectsComponent } from './projects/projects.component';
import { MessagesComponent } from './messages/messages.component';
import { CommentsComponent } from './comments/comments.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { ExperienceComponent } from './experience/experience/experience.component';
import { SettingsComponent } from './settings/settings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {AuthGuard} from "../../services/auth/auth.guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptorService} from "../../services/auth/token-interceptor.service";
import { DetailExperienceComponent } from './experience/detail-experience/detail-experience.component';

@NgModule({
  imports: [
    BackendRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations:
    [
      BackendComponent,
      LoginComponent,
      DashboardComponent,
      NavComponent,
      SidebarComponent,
      BaseComponent,
      PostsComponent,
      ProjectsComponent,
      MessagesComponent,
      CommentsComponent,
      ProfileComponent,
      SubscribersComponent,
      ExperienceComponent,
      SettingsComponent,
      DetailExperienceComponent
    ],
  providers: [
    AuthService,
    AuthGuard,
  ]
})
export class BackendModule {}
