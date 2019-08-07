import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePage } from './choice.page';

describe('ChoicePage', () => {
  let component: ChoicePage;
  let fixture: ComponentFixture<ChoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
