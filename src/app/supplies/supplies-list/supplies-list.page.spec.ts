import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesListPage } from './supplies-list.page';

describe('SuppliesListPage', () => {
  let component: SuppliesListPage;
  let fixture: ComponentFixture<SuppliesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
