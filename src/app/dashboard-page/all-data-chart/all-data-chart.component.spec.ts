import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDataChartComponent } from './all-data-chart.component';

describe('AllDataChartComponent', () => {
  let component: AllDataChartComponent;
  let fixture: ComponentFixture<AllDataChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDataChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
