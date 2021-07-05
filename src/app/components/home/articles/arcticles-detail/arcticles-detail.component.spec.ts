import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcticlesDetailComponent } from './arcticles-detail.component';

describe('ArcticlesDetailComponent', () => {
  let component: ArcticlesDetailComponent;
  let fixture: ComponentFixture<ArcticlesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcticlesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcticlesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
