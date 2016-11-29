/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SessionFormComponent } from './session-form.component';

describe('SessionFormComponent', () => {
  let component: SessionFormComponent;
  let fixture: ComponentFixture<SessionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
