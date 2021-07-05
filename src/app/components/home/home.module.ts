import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProjectsComponent } from './projects/projects.component';
import { NavComponent } from './common/nav/nav.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ShowcaseComponent } from './homepage/showcase/showcase.component';
import { AboutComponent } from './homepage/about/about.component';
import { ExperienceComponent } from './homepage/experience/experience.component';
import { MajorComponent } from './homepage/major/major.component';
import { AllComponent } from './homepage/all/all.component';
import { ContactComponent } from './common/contact/contact.component';
import { FooterComponent } from './common/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArcticlesListComponent } from './articles/arcticles-list/arcticles-list.component';
import { ArcticlesCategoryComponent } from './articles/arcticles-category/arcticles-category.component';
import { ArcticlesDetailComponent } from './articles/arcticles-detail/arcticles-detail.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
  ],
  exports: [FooterComponent, NavComponent],
  declarations: [
    HomeComponent,
    ProjectsComponent,
    NavComponent,
    HomepageComponent,
    ShowcaseComponent,
    AboutComponent,
    ExperienceComponent,
    MajorComponent,
    AllComponent,
    ContactComponent,
    FooterComponent,
    ArcticlesListComponent,
    ArcticlesCategoryComponent,
    ArcticlesDetailComponent,
    BreadcrumbComponent,
  ],
})
export class HomeModule {}
