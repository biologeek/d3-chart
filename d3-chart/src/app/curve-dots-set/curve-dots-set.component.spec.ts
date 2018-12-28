import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurveDotsSetComponent } from './curve-dots-set.component';

describe('CurveDotsSetComponent', () => {
  let component: CurveDotsSetComponent;
  let fixture: ComponentFixture<CurveDotsSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurveDotsSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurveDotsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
