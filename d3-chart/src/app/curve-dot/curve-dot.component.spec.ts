import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurveDotComponent } from './curve-dot.component';

describe('CurveDotComponent', () => {
  let component: CurveDotComponent;
  let fixture: ComponentFixture<CurveDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurveDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurveDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
