import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeHomeEarningComponent } from './take-home-earning.component';

describe('TakeHomeEarningComponent', () => {
  let component: TakeHomeEarningComponent;
  let fixture: ComponentFixture<TakeHomeEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeHomeEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeHomeEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
