import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowAddFormComponent } from './row-add-form.component';

describe('RowAddFormComponent', () => {
  let component: RowAddFormComponent;
  let fixture: ComponentFixture<RowAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
