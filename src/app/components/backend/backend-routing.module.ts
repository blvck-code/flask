import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MessagesComponent} from "./messages/messages.component";
import {PostsComponent} from "./posts/posts.component";
import {ProjectsComponent} from "./projects/projects.component";
import {CommentsComponent} from "./comments/comments.component";
import {ProfileComponent} from "./profile/profile.component";
import {SubscribersComponent} from "./subscribers/subscribers.component";
import {ExperienceComponent} from "./experience/experience/experience.component";
import {SettingsComponent} from "./settings/settings.component";
import {AuthGuard} from "../../services/auth/auth.guard";
import {ExperienceResolverService} from "../../resolvers/experience-resolver.service";
import {DetailExperienceComponent} from "./experience/detail-experience/detail-experience.component";
import {UserService} from "../../resolvers/user.service";

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'comments', component: CommentsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], resolve:{profile: UserService} },
  { path: 'subscribers', component: SubscribersComponent, canActivate: [AuthGuard] },
  {
    path:'experience',
    children: [
        { path: '', component: ExperienceComponent, canActivate: [AuthGuard], resolve:{experience: ExperienceResolverService} },
        { path: ':id', component: DetailExperienceComponent, canActivate: [AuthGuard], resolve:{experience: ExperienceResolverService} }
    ]
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule {}

