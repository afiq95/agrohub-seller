import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesDetailPage } from './supplies-detail.page';

describe('SuppliesDetailPage', () => {
  let component: SuppliesDetailPage;
  let fixture: ComponentFixture<SuppliesDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
