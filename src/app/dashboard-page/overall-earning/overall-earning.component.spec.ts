import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallEarningComponent } from './overall-earning.component';

describe('OverallEarningComponent', () => {
  let component: OverallEarningComponent;
  let fixture: ComponentFixture<OverallEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
