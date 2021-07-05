import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects/projects.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ExperienceResolverService } from '../../resolvers/experience-resolver.service';
import { ArcticlesCategoryComponent } from './articles/arcticles-category/arcticles-category.component';
import { ArcticlesListComponent } from './articles/arcticles-list/arcticles-list.component';
import { ArcticlesDetailComponent } from './articles/arcticles-detail/arcticles-detail.component';
import { PostsResolverService } from 'src/app/resolvers/posts-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomepageComponent,
    resolve: { experience: ExperienceResolverService },
  },
  { path: 'projects', component: ProjectsComponent },
  {
    path: 'articles',
    children: [
      {
        path: '',
        component: ArcticlesListComponent,
        resolve: { articles: PostsResolverService },
      },
      {
        path: ':slug',
        component: ArcticlesDetailComponent,
        resolve: { articles: PostsResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
