import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public img : string = '../../../../assets/imgs/proj1.jpg';
  active: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  handleProjects() {
    let projects = document.querySelectorAll('.project-item');
    let hideWrapper = document.querySelectorAll('.project-wrapper');
    let imgWrapper = document.querySelectorAll('.project-img');

    projects.forEach(project => {
      if(project.classList.contains('col-md-7')){
        project.classList.replace('col-md-7', 'col-md-3');
      }
    });

    imgWrapper.forEach(project => {
      if(project.classList.contains('col-sm-5')){
        project.classList.replace('col-sm-5', 'col-sm-12');
      }
    });

    hideWrapper.forEach(project => {
      project.classList.add('hide-info');
    });

  }

  activeProject(e:any){
    this.handleProjects();

    let imgClicked = e.target.classList.contains('img');
    let imageWrapper = e.target.parentNode.classList;
    let hideWrapper = e.target.parentNode.parentNode.classList;
    let projectWrapper = e.target.parentNode.parentNode.parentNode.classList;


    if(imageWrapper.contains('col-sm-12')){
      imageWrapper.replace('col-sm-12', 'col-sm-5');
    } else if(imageWrapper.contains('col-sm-5') && imgClicked){
      imageWrapper.replace('col-sm-5', 'col-sm-12')
    }

    if(projectWrapper.contains('col-md-3')){
      projectWrapper.replace('col-md-3', 'col-md-7');
      hideWrapper.remove('hide-info')
    } else if(projectWrapper.contains('col-md-7') && imgClicked){
      projectWrapper.replace('col-md-7', 'col-md-3');
      hideWrapper.add('hide-info')
    }

   console.log(projectWrapper.contains('col-md-7'));
   console.log(imgClicked);

  }

}
