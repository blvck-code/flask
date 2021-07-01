import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { ScrollingModule} from "@angular/cdk/scrolling";

const MaterialComponents = [
  MatProgressSpinnerModule,
  MatBadgeModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  ScrollingModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
