/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SessionsManComponent } from './sessions-man.component';

describe('SessionsManComponent', () => {
  let component: SessionsManComponent;
  let fixture: ComponentFixture<SessionsManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionsManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
