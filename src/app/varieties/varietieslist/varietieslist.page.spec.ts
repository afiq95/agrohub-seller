import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietieslistPage } from './varietieslist.page';

describe('VarietieslistPage', () => {
  let component: VarietieslistPage;
  let fixture: ComponentFixture<VarietieslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarietieslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietieslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
