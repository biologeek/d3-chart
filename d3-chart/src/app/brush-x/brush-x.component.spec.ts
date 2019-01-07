import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushXComponent } from './brush-x.component';

describe('BrushXComponent', () => {
  let component: BrushXComponent;
  let fixture: ComponentFixture<BrushXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrushXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrushXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
