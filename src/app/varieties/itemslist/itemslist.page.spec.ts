import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemslistPage } from './itemslist.page';

describe('ItemslistPage', () => {
  let component: ItemslistPage;
  let fixture: ComponentFixture<ItemslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
