import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcticlesListComponent } from './arcticles-list.component';

describe('ArcticlesListComponent', () => {
  let component: ArcticlesListComponent;
  let fixture: ComponentFixture<ArcticlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcticlesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
