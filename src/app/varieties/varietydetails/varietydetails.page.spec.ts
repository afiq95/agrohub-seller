import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietydetailsPage } from './varietydetails.page';

describe('VarietydetailsPage', () => {
  let component: VarietydetailsPage;
  let fixture: ComponentFixture<VarietydetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarietydetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietydetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
