import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";
import {IExperience} from "../../../../models/experience";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  experiences:IExperience[] =[];

  constructor(
    private route: ActivatedRoute,
  ) { if(this.route.snapshot.data.experience){
    this.experiences = this.route.snapshot.data.experience?.data
  } }

  ngOnInit(): void {
  }

}
