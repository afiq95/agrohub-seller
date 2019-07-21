import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSupplyPage } from './new-supply.page';

describe('NewSupplyPage', () => {
  let component: NewSupplyPage;
  let fixture: ComponentFixture<NewSupplyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSupplyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSupplyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
