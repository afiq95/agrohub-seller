import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadangListPage } from './ladang-list.page';

describe('LadangListPage', () => {
  let component: LadangListPage;
  let fixture: ComponentFixture<LadangListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadangListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadangListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
