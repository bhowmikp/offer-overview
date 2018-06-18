import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEarningComponent } from './total-earning.component';

describe('TotalEarningComponent', () => {
  let component: TotalEarningComponent;
  let fixture: ComponentFixture<TotalEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
