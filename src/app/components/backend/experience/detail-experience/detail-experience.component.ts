import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IExperience } from '../../../../models/experience';
import { ExperienceService } from '../../../../services/experience/experience.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-detail-experience',
  templateUrl: './detail-experience.component.html',
  styleUrls: ['./detail-experience.component.css'],
})
export class DetailExperienceComponent implements OnInit {
  'experience': IExperience;
  editMode: boolean = false;
  id: any = null;
  showDelete: boolean = false;
  msg: string = '';
  msgStatus: any;

  constructor(
    private _expeService: ExperienceService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) {
    _route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this._expeService.getExperiencebyId(params.get('id')).subscribe(
          (res) => {
            this.experience = res.data;
            this.id = res.data.id;
            this.updateForm.patchValue({
              company: res.data.company,
              position: res.data.position,
              start: res.data.start,
              end: res.data.end,
              desc: res.data.desc,
            });
          },
          (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 404) {
                this._router.navigate(['/backend/page-not-found']);
              }
            }
          }
        );
      } else {
        _router.navigate(['/backend/experience']);
      }
    });
  }

  get getCompany() {
    return this.updateForm.get('company');
  }

  get getPosition() {
    return this.updateForm.get('position');
  }

  get getStart() {
    return this.updateForm.get('start');
  }

  get getEnd() {
    return this.updateForm.get('end');
  }

  get getDesc() {
    return this.updateForm.get('desc');
  }

  updateForm = this._fb.group({
    company: ['', Validators.required],
    position: ['', Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required],
    desc: ['', Validators.required],
  });

  ngOnInit(): void {}

  changeEditMode() {
    this.editMode = !this.editMode;
  }

  openDeleteModal() {
    this.showDelete = true;
  }

  closeDeleteModal() {
    this.showDelete = false;
  }

  deleteExperience(id: any) {
    this._expeService.deleteExperince(id).subscribe(
      (res) => {
        this._router.navigate(['/backend/experience']);
        this.onDelete();
      },
      (err) => {
        this.onDeleteError();
      }
    );
  }

  updateExpe() {
    this._expeService.updateExpe(this.id, this.updateForm.value).subscribe(
      (res) => {
        this.experience = res.data;
        this.onUpdate();
        this.editMode = false;
      },
      (err) => {
        this.onUpdateError();
      }
    );
  }

  onUpdate() {
    this.msg = 'Experience updated successfully.';
    this.msgStatus = 200;

    setTimeout(() => {
      this.msg = '';
      this.msgStatus = null;
    }, 3000);
  }

  onUpdateError() {
    this.msg = 'We had trouble updating your experience. Please try again.';
    this.msgStatus = 400;

    setTimeout(() => {
      this.msg = '';
      this.msgStatus = null;
    }, 3000);
  }

  onDelete() {
    this.msg = 'Experience deleted successfully.';
    this.msgStatus = 200;

    setTimeout(() => {
      this.msg = '';
      this.msgStatus = null;
    }, 3000);
  }

  onDeleteError() {
    this.msg = 'We had trouble deleting your experience. Please try again.';
    this.msgStatus = 400;

    setTimeout(() => {
      this.msg = '';
      this.msgStatus = null;
    }, 3000);
  }
}
