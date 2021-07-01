import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {BlogComponent} from "./blog/blog.component";
import {ProjectsComponent} from "./projects/projects.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {DetailComponent} from "./blog/detail/detail.component";
import {ExperienceResolverService} from "../../resolvers/experience-resolver.service";

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: HomepageComponent, resolve:{experience: ExperienceResolverService}},
  { path: 'blog', component: BlogComponent},
  { path: 'blog/:id', component: DetailComponent },
  { path: 'projects', component: ProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

