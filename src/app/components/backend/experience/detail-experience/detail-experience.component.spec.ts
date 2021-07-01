import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExperienceComponent } from './detail-experience.component';

describe('DetailExperienceComponent', () => {
  let component: DetailExperienceComponent;
  let fixture: ComponentFixture<DetailExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
