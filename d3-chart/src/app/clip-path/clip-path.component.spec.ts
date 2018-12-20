import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipPathComponent } from './clip-path.component';

describe('ClipPathComponent', () => {
  let component: ClipPathComponent;
  let fixture: ComponentFixture<ClipPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
