import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcticlesCategoryComponent } from './arcticles-category.component';

describe('ArcticlesCategoryComponent', () => {
  let component: ArcticlesCategoryComponent;
  let fixture: ComponentFixture<ArcticlesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcticlesCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcticlesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
