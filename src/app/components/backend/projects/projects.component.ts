import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public loading: boolean = false;
  image: any = null;
  addMode : boolean = true;
  'thumb': any;
  'bgImage': any;

  public img: string = '.././../../assets/imgs/kababa.jpg';

  constructor() { }

  ngOnInit(): void {
  }

  setAddMode() {
    this.addMode = !this.addMode;
  }

  getThumb(e: any){
    let files = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);

    reader.onload = e => {
      this.thumb = e.target?.result
    };
  }

  getBgImage(e: any){
    let files = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);

    reader.onload = e => {
      this.bgImage = e.target?.result
    };
  }

}
