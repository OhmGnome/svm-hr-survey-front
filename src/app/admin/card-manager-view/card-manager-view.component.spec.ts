/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardManagerViewComponent } from './card-manager-view.component';

describe('CardManagerViewComponent', () => {
  let component: CardManagerViewComponent;
  let fixture: ComponentFixture<CardManagerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardManagerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardManagerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
