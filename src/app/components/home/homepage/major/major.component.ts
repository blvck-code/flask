import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css']
})
export class MajorComponent implements OnInit {
  public img: string = '../../../../assets/imgs/proj9.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}
