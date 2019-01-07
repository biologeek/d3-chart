import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushYComponent } from './brush-y.component';

describe('BrushYComponent', () => {
  let component: BrushYComponent;
  let fixture: ComponentFixture<BrushYComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrushYComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
