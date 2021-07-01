import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ExperienceService} from "../../../../services/experience/experience.service";
import {IExperience} from "../../../../models/experience";
import {ExperienceResolverService} from "../../../../resolvers/experience-resolver.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _expeService: ExperienceService,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {
    if(_route.snapshot.data.experience){
      this.experiences = _route.snapshot.data.experience?.data
    }
  }

  experiences : IExperience[] =  [];

  expeForm = this.fb.group({

    company: ['', [Validators.required]],
    job: ['', [Validators.required]],
    start: ['', Validators.required,],
    end: ['', Validators.required],
    desc: ['',
      Validators.required
    ]

  });

  get getCompany() {
    return this.expeForm.get('company')
  }

  get getJob(){
      return this.expeForm.get('job')
  }

  get getStart(){
    return this.expeForm.get('start')
  }

  get getEnd() {
        return this.expeForm.get('end')
  }

  get getDesc() {
    return this.expeForm.get('desc');
  }

  ngOnInit(): void {}

  onSubmit(){
    this._expeService.addExperience(this.expeForm.value).subscribe(
      res => {
        this.experiences = [res.data, ...this.experiences];
        this.expeForm.patchValue({
          company: [''],
          job: [''],
          start: [''],
          end: [''],
          desc: ['']
        })
      },
      err => this._authService.guardPage(err)
    )}

  updateExpe(experience:IExperience) {
    this._router.navigate(['/backend/experience',experience.id], {
      queryParams:{
        company: experience.company
      }
    })
  }


}
