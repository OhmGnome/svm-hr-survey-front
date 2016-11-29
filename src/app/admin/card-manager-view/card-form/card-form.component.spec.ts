/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardFormComponent } from './card-form.component';

describe('CardFormComponent', () => {
  let component: CardFormComponent;
  let fixture: ComponentFixture<CardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
