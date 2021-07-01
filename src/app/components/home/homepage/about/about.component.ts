import { Component, OnInit } from '@angular/core';
import {ISkills} from "../../../../models/Skills";
import {SkillsMock} from "../../../../models/skills-mock";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public img: string = '../../../../assets/imgs/oluoch.jpg';
  public skills: ISkills[] = SkillsMock;

  constructor() { }

  ngOnInit(): void {
  }

}
